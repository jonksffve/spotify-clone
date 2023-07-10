from rest_framework.serializers import ModelSerializer
from .models import CustomUser


class UserCreateSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["first_name", "last_name", "email", "avatar", "password", "username"]
