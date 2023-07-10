from accounts.models import CustomUser
from accounts.serializers import UserCreateSerializer
from rest_framework.generics import CreateAPIView


class UserCreationView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserCreateSerializer
