from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
)
from rest_framework.authtoken.models import Token

from django.contrib.auth import get_user_model

user_model = get_user_model()


class UserCreateSerializer(ModelSerializer):
    """
    Serializer used to create new CustomUser instances
    """

    class Meta:
        model = user_model
        fields = ["first_name", "last_name", "email", "avatar", "password", "username"]

    def create(self, validated_data):
        """
        Create a custom user object and properly hash the password
        """
        password = validated_data["password"]
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user


class UserListSerializer(ModelSerializer):
    """
    Serializer used when returning LIST of objects
    """

    name = SerializerMethodField()

    class Meta:
        model = user_model
        fields = ["email", "avatar", "username", "name"]

    def get_name(self, obj):
        """
        Returns object's full_name
        """
        return obj.get_full_name()


class TokenSerializer(ModelSerializer):
    """
    Serializer used for creating token authentication response
    """

    token = SerializerMethodField()
    user = UserListSerializer()

    class Meta:
        model = Token
        fields = ["token", "user"]

    def get_token(self, obj):
        return obj.key
