from datetime import datetime

from apps.exam.models import Exam, Task
from apps.exam.permissions import (
    IsAllowedToManageExamOrReadOnlyForOwner,
    IsAllowedToManageTaskOrReadOnlyForOwner,
    IsTaskOwner,
)
from apps.exam.serializers import ExamSerializer, TaskSerializer
from apps.users.models import Scout, User
from apps.users.serializers import PublicUserSerializer, UserSerializer
from django.db.models import Q
from django.urls import reverse
from django.utils import timezone
from fcm_django.models import FCMDevice
from firebase_admin.messaging import (
    Message,
    Notification,
    WebpushConfig,
    WebpushFCMOptions,
    WebpushNotification,
)
from rest_framework import generics, permissions, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet


class UserList(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PublicUserSerializer

    def get_queryset(self):
        if self.request.query_params.get("team") is not None:
            return User.objects.filter(
                scout__patrol__team_id=self.request.query_params.get("team")
            )
        return User.objects.filter(
            scout__patrol__team_id=self.request.user.scout.patrol.team.id
        )


class UserDetails(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = PublicUserSerializer


class TasksToBeChecked(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ExamSerializer

    def get_queryset(self):
        return Exam.objects.filter(
            tasks__approver=self.request.user.scout, tasks__status=1
        ).distinct()


class TaskDetails(ModelViewSet):
    permission_classes = [
        IsAllowedToManageTaskOrReadOnlyForOwner,
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskSerializer
    lookup_field = "id"

    def retrieve(self, request, *args, **kwargs):
        task = get_object_or_404(self.get_queryset(), id=kwargs["id"])
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def get_queryset(self):
        if self.request.user.scout.function >= 5:
            return Task.objects.filter(exam__id=self.kwargs["exam_id"]).filter(
                id=self.kwargs["id"]
            )
        if self.request.user.scout.patrol and self.request.user.scout.function >= 2:
            return Task.objects.filter(
                Q(id=self.kwargs["id"])
                & Q(exam__id=self.kwargs["exam_id"])
                & Q(
                    exam__scout__patrol__team__id=self.request.user.scout.patrol.team.id,
                    exam__is_template=False,
                    exam__is_archived=False,
                )
                | Q(
                    exam__supervisor__user_id=self.request.user.id,
                    exam__is_template=False,
                    exam__is_archived=False,
                )
            )

        return Task.objects.filter(
            exam__id=self.kwargs["exam_id"], exam__scout__user__id=self.request.user.id
        ).filter(id=self.kwargs["id"])


class SubmitTask(APIView):
    permission_classes = [permissions.IsAuthenticated, IsTaskOwner]

    def post(self, request, *args, **kwargs):
        if request.data.get("approver") is None:
            return Response({"approver": "This field is required."}, status=422)
        task = get_object_or_404(Task, id=kwargs["id"], exam__id=kwargs["exam_id"])
        if task.status == 2:
            return Response({"message": "Task already approved"})
        task.status = 1
        task.approver = Scout.objects.get(user_id=request.data["approver"])
        task.approval_date = timezone.now()
        task.save()
        FCMDevice.objects.filter(user=task.approver.user).send_message(
            Message(
                notification=Notification(
                    title="Nowe zadanie do sprawdzenia",
                    body=f"Pojawił się nowy punkt do sprawdzenia dla {task.exam.scout}.",
                ),
                webpush=WebpushConfig(
                    fcm_options=WebpushFCMOptions(
                        link="https://"
                        + request.get_host()
                        + reverse("exam:check_tasks")
                    ),
                ),
            )
        )
        return Response({"message": "Task submitted"})


class UnsubmitTask(APIView):
    permission_classes = [permissions.IsAuthenticated, IsTaskOwner]

    def post(self, request, *args, **kwargs):
        task = get_object_or_404(Task, id=kwargs["id"], exam__id=kwargs["exam_id"])
        if task.status != 1:
            return Response({"message": "Task is not submitted"})
        task.status = 0
        task.approver = None
        task.approval_date = None
        task.save()
        return Response({"message": "Task unsubmitted"})


class ExamViewSet(ModelViewSet):
    permission_classes = [IsAllowedToManageExamOrReadOnlyForOwner, IsAuthenticated]
    serializer_class = ExamSerializer

    def get_queryset(self):
        last_sync = self.request.query_params.get("last_sync")
        if last_sync is not None:
            exams = Exam.objects.filter(
                updated_at__gt=datetime.fromtimestamp(int(last_sync))
            )
        else:
            exams = Exam.objects.all()
        user = self.request.user
        if self.request.query_params.get("user") is not None:
            return exams.filter(
                scout__user__id=user.id, is_template=False, is_archived=False
            )
        if self.request.query_params.get("templates") is not None:
            return exams.filter(
                scout__patrol__team__id=user.scout.patrol.team.id,
                is_template=True,
                is_archived=False,
            )
        if self.request.query_params.get("archived") is not None:
            return exams.filter(
                scout__patrol__team__id=user.scout.patrol.team.id,
                is_template=False,
                is_archived=True,
            )
        if user.scout.function >= 5:
            return exams.filter(is_template=False, is_archived=False)
        if user.scout.patrol and user.scout.function >= 2:
            return exams.filter(
                Q(
                    scout__patrol__team__id=user.scout.patrol.team.id,
                    is_template=False,
                    is_archived=False,
                )
                | Q(supervisor__user_id=user.id, is_template=False, is_archived=False)
            )
        return exams.filter(
            scout__user__id=user.id, is_template=False, is_archived=False
        )

    def perform_destroy(self, instance):
        instance.deleted = True
        instance.save()

    def perform_create(self, serializer):
        print(serializer.validated_data)
        print(serializer.validated_data.get("scout"))
        if (
            serializer.validated_data.get("scout") is None
            and serializer.validated_data.get("supervisor") is not None
        ):
            serializer.save(
                scout=self.request.user.scout,
                supervisor=serializer.validated_data.get("supervisor")["user"],
            )
            return
        if serializer.validated_data.get("scout") is None:
            serializer.save(scout=self.request.user.scout)
            return
        if (
            serializer.validated_data.get("scout")["user"] != self.request.user
            and self.request.user.scout.function < 2
        ):
            raise PermissionDenied("You can't create exam for other scout")
        if serializer.validated_data.get("supervisor") is None:
            serializer.save(
                scout=serializer.validated_data.get("scout")["user"].scout,
                supervisor=None,
            )
            return
        serializer.save(
            scout=serializer.validated_data.get("scout")["user"].scout,
            supervisor=serializer.validated_data.get("supervisor")["user"],
        )


class UserInfo(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        return Response(self.get_serializer(request.user).data)
