from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.authtoken.models import Token

from django.contrib.auth import get_user_model

user_model = get_user_model()


class UserCreateSerializer(ModelSerializer):
    class Meta:
        model = user_model
        fields = ["first_name", "last_name", "email", "avatar", "password", "username"]

    def create(self, validated_data):
        password = validated_data["password"]
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user


class UserListSerializer(ModelSerializer):
    name = SerializerMethodField()

    class Meta:
        model = user_model
        fields = ["email", "avatar", "username", "name"]

    def get_name(self, obj):
        return obj.get_full_name()


class TokenSerializer(ModelSerializer):
    token = SerializerMethodField()
    user = UserListSerializer()

    class Meta:
        model = Token
        fields = ["token", "user"]

    def get_token(self, obj):
        return obj.key
