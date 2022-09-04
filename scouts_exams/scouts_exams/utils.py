from apps.exam.models import Exam, Task
from apps.exam.permissions import IsAllowedToManageExamOrReadOnlyForOwner
from apps.exam.serializers import ExamSerializer, TaskSerializer
from apps.users.models import Scout, User
from apps.users.serializers import PublicUserSerializer, UserSerializer
from rest_framework import generics, permissions, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
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
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskSerializer

    def retrieve(self, request, *args, **kwargs):
        task = get_object_or_404(self.get_queryset(), id=kwargs["pk"])
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def get_queryset(self):
        if self.request.user.scout.function >= 5:
            return Task.objects.filter(exam__id=self.kwargs["exam_id"]).filter(
                id=self.kwargs["pk"]
            )
        if self.request.user.scout.patrol and self.request.user.scout.function >= 2:
            return Task.objects.filter(
                exam__id=self.kwargs["exam_id"],
                exam__scout__patrol__team__id=self.request.user.scout.patrol.team.id,
            ).filter(id=self.kwargs["pk"])

        return Task.objects.filter(
            exam__id=self.kwargs["exam_id"], exam__scout__user__id=self.request.user.id
        ).filter(id=self.kwargs["pk"])


class ExamList(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer


class UserExamList(viewsets.ModelViewSet):
    serializer_class = ExamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Exam.objects.filter(scout__user__id=user.id)


class ExamViewSet(ModelViewSet):
    permission_classes = [IsAllowedToManageExamOrReadOnlyForOwner, IsAuthenticated]
    serializer_class = ExamSerializer

    def get_queryset(self):
        user = self.request.user
        if self.request.query_params.get("user") is not None:
            return Exam.objects.filter(
                scout__user__id=user.id, is_template=False, is_archived=False
            )
        if self.request.query_params.get("templates") is not None:
            return Exam.objects.filter(
                scout__patrol__team__id=user.scout.patrol.team.id,
                is_template=True,
                is_archived=False,
            )
        if user.scout.function >= 5:
            return Exam.objects.filter(is_template=False)
        if user.scout.patrol and user.scout.function >= 2:
            return Exam.objects.filter(
                scout__patrol__team__id=user.scout.patrol.team.id,
                is_template=False,
                is_archived=False,
            )
        return Exam.objects.filter(
            scout__user__id=user.id, is_template=False, is_archived=False
        )

    def perform_create(self, serializer):
        print(serializer.validated_data)
        print(serializer.validated_data.get("scout"))
        if serializer.validated_data.get("scout") is None:
            serializer.save(scout=self.request.user.scout)
            return
        if (
            serializer.validated_data.get("scout")["user"].user != self.request.user
            and self.request.user.scout.function < 2
        ):
            raise PermissionDenied("You can't create exam for other scout")
        if serializer.validated_data.get("supervisor") is None:
            serializer.save(
                scout=serializer.validated_data.get("scout")["user"], supervisor=None
            )
            return
        serializer.save(
            scout=serializer.validated_data.get("scout")["user"],
            supervisor=serializer.validated_data.get("supervisor")["user"],
        )


class UserExamDetails(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

    def get_queryset(self):
        user = self.request.user
        return Exam.objects.filter(scout__user__id=user.id)


class UserInfo(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        return Response(self.get_serializer(request.user).data)
