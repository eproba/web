from rest_framework import serializers

from .models import Exam, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "task", "description", "status", "approver", "approval_date"]


class ExamSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Exam
        fields = ["id", "name", "scout", "supervisor", "is_archived", "tasks"]
