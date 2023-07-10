from accounts.models import CustomUser
from accounts.serializers import UserSerializer
from rest_framework.generics import CreateAPIView


class UserCreationView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
