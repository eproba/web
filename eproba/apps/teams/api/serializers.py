from apps.teams.models import District, Patrol, Team, TeamRequest
from apps.users.api.serializers import UserSerializer
from rest_framework import serializers


class PatrolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patrol
        fields = ["id", "name", "team"]


class TeamListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ["id", "name", "short_name", "district", "is_verified", "organization"]


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ["id", "name"]


class TeamSerializer(serializers.ModelSerializer):
    district = DistrictSerializer()
    patrols = PatrolSerializer(many=True)

    class Meta:
        model = Team
        fields = [
            "id",
            "name",
            "short_name",
            "district",
            "is_verified",
            "patrols",
            "organization",
        ]


class TeamRequestSerializer(serializers.ModelSerializer):
    team = TeamSerializer()
    created_by = UserSerializer()

    class Meta:
        model = TeamRequest
        fields = "__all__"
