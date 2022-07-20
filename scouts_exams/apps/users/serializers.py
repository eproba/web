from rest_framework import serializers

from .models import Scout, User


class ScoutSerializer(serializers.ModelSerializer):
    team = serializers.IntegerField(source="patrol.team.id")
    patrol_name = serializers.CharField(source="patrol.name")
    team_name = serializers.CharField(source="patrol.team.name")

    class Meta:
        model = Scout
        fields = ["patrol", "patrol_name", "team", "team_name", "rank", "function"]


class UserSerializer(serializers.HyperlinkedModelSerializer):
    scout = ScoutSerializer()

    class Meta:
        model = User
        fields = [
            "url",
            "id",
            "nickname",
            "first_name",
            "last_name",
            "email",
            "is_staff",
            "scout",
        ]
