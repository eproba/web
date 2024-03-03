from apps.users.models import User
from rest_framework import serializers

from .models import Exam, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "task", "description", "status", "approver", "approval_date"]

    def update(self, instance, validated_data):
        task = validated_data
        Task.objects.filter(id=instance.id).update(
            task=task["task"] if "task" in task else instance.task,
            description=(
                task["description"] if "description" in task else instance.description
            ),
            approver=task["approver"] if "approver" in task else instance.approver,
            status=task["status"] if "status" in task else instance.status,
            approval_date=(
                task["approval_date"]
                if "approval_date" in task
                else instance.approval_date
            ),
        )
        return Task.objects.get(id=instance.id)


class ExamSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, required=False)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False, source="scout.user"
    )

    class Meta:
        model = Exam
        fields = [
            "id",
            "name",
            "user",
            "updated_at",
            "supervisor",
            "deleted",
            "is_archived",
            "tasks",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.deleted:
            data["tasks"] = []
            data["supervisor"] = None
            data["name"] = "Deleted"
            data["user"] = None
            data["is_archived"] = False
        return data

    def create(self, validated_data):
        tasks = validated_data.pop("tasks") if "tasks" in validated_data else []
        exam = Exam.objects.create(**validated_data)
        for task in tasks:
            Task.objects.create(exam=exam, **task)
        return exam

    def update(self, instance, validated_data):
        tasks_data = validated_data.pop("tasks", [])
        instance.name = validated_data.get("name", instance.name)
        instance.scout.user = validated_data.get("user", instance.scout.user)
        if validated_data.get("supervisor"):
            instance.supervisor.user = validated_data.get("supervisor", None)
        instance.deleted = validated_data.get("deleted", instance.deleted)
        instance.is_archived = validated_data.get("is_archived", instance.is_archived)
        instance.save()

        # Remove duplicates from tasks_data
        tasks_data = list({task["task"]: task for task in tasks_data}.values())

        existing_task_names = set(instance.tasks.values_list("task", flat=True))
        incoming_task_names = {
            task.get("task") for task in tasks_data if task.get("task")
        }

        # Delete tasks that are not in tasks_data
        Task.objects.filter(
            task__in=existing_task_names - incoming_task_names, exam=instance
        ).delete()

        for task_data in tasks_data:
            task_name = task_data.get("task", None)
            if not task_name:
                continue
            if task_name in existing_task_names:
                # Update only name and description, clear other fields
                Task.objects.filter(task=task_name, exam=instance).update(
                    description=task_data.get("description", ""),
                )
            else:
                Task.objects.create(
                    exam=instance,
                    task=task_name,
                    description=task_data.get("description", ""),
                    status=0,
                    approver=None,
                    approval_date=None,
                )

        return instance
