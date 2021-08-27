from rest_framework import serializers

from .models import User, Scout


class ScoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scout
        fields = ['patrol', 'team', 'rank', 'function']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    scout = ScoutSerializer()

    class Meta:
        model = User
        fields = ['url', 'nickname', 'email', 'is_staff', 'scout']
