from django.contrib.auth import get_user_model

from accounts.serializers import (
    UserCreateSerializer,
    UserListSerializer,
    TokenSerializer,
)


from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

user_model = get_user_model()


class UserCreationView(CreateAPIView):
    queryset = user_model.objects.all()
    serializer_class = UserCreateSerializer


class UserRetrieveView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    lookup_field = "key"


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserListSerializer(user, context={"request": request})
        return Response(
            {
                "token": token.key,
                "user": user_serializer.data,
            }
        )
