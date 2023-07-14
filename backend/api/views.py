from django.contrib.auth import get_user_model

from accounts.serializers import (
    UserCreateSerializer,
    UserListSerializer,
    TokenSerializer,
)
from webapp.models import SongFile, SongLike
from webapp.serializers import (
    SongCreateSerializer,
    SongListSerializer,
    SongLikeSerializer,
)


from rest_framework.generics import (
    CreateAPIView,
    RetrieveAPIView,
    ListCreateAPIView,
    DestroyAPIView,
)
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

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


class SongCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = None
    serializer_class = None

    def get_serializer_class(self):
        if self.request.method == "POST":
            return SongCreateSerializer
        return SongListSerializer

    def get_queryset(self):
        if "title" in self.request.query_params:
            return SongFile.objects.filter(
                title__icontains=self.request.query_params["title"]
            )
        if "user_only" in self.request.query_params:
            return SongFile.objects.filter(user=self.request.user)
        return SongFile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SongLikeCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = SongLike.objects.all()
    serializer_class = SongLikeSerializer

    # 1 like per user to the same song

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data={"song": request.data["song"], "user": request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class SongLikeDestroyView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = None
    serializer_class = SongLikeSerializer
    lookup_field = "song"

    # destroy IF its yours
    # destroy if it exists

    def get_queryset(self):
        return SongLike.objects.filter(user=self.request.user)
