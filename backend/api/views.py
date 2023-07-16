from django.contrib.auth import get_user_model
from django.db import IntegrityError

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
    SongLikeListSerializer,
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
    """
    Creates an user model instance

    Returns:
        - 201 Created: Serialized representation of the object
        - 400 Bad request: When ValidationError is raised

    Raises:
        - ValidationError: when it fails to validate the given data
    """

    queryset = user_model.objects.all()
    serializer_class = UserCreateSerializer


class UserRetrieveView(RetrieveAPIView):
    """
    Retrieves data from an authenticated user

    Returns:
        - 200 OK: Serialized representation of the object
        - 401 Unauthorized: failed to provide authentication credentials
        - 404 Not Found: If it fails to retrieve the object
    """

    permission_classes = [IsAuthenticated]
    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    lookup_field = "key"


class CustomAuthToken(ObtainAuthToken):
    """
    Used to return additional information besides token value

    Returns:
        - 200 Ok: With serialized token value and user information
        - 400 Bad request: if it raises ValidationError

    Raises:
        - ValidationError: if it fails to validate the given user authentication data
    """

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


class SongListCreateView(ListCreateAPIView):
    """
    Function used for both Create and List Song model instances

    Accepts:
        [GET, POST] methods

    Returns:
        - 200 Ok: When listing objects
        - 201 Created: With serialized representation of the object
        - 400 Bad request: When raised ValidationError
        - 401 Unauthorized: failed to provide authentication credentials

    Raises:
        ValidationError: When invalidad date was provided on post method
    """

    permission_classes = [IsAuthenticated]
    queryset = None
    serializer_class = None

    def get_serializer_class(self):
        """
        Gets serializer class based on request method
        """
        if self.request.method == "POST":
            return SongCreateSerializer
        return SongListSerializer

    def get_queryset(self):
        """
        Returns list of data depending on the query_param

        Returns:
            - Data filtered by title (if provided)
            - Data uploaded by request.user (if provided)
            - All model instances in the database
        """
        if "title" in self.request.query_params:
            return SongFile.objects.filter(
                title__icontains=self.request.query_params["title"]
            )
        if "user_uploaded" in self.request.query_params:
            return SongFile.objects.filter(user=self.request.user)
        return SongFile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SongLikeListCreateView(ListCreateAPIView):
    """
    Function that both Creates and Lists song like model instances

    Accepts:
        [GET, POST] methods

    Returns:
        - 200 Ok: For listing objects
        - 201 Created: When creating objects
        - 400 Bad request:
            - When raised ValidationError
        - 401 Unauthorized: failed to provide authentication credentials

    Raises:
        ValidationError: when creating with wrong data
        IntegrityError: when trying to like 2 times same song
    """

    permission_classes = [IsAuthenticated]
    queryset = None
    serializer_class = None

    def get_queryset(self):
        """
        Returns a queryset based on request.method
        """
        if self.request.method == "POST":
            return SongLike.objects.all()
        # we return only user liked queryset
        return SongLike.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return SongLikeSerializer
        return SongLikeListSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SongLikeDestroyView(DestroyAPIView):
    """
    Function that performs the deletion of a song like model instance

    Returns:
        - 204 No content: if perfomed the deletion
        - 401 Unauthorized: failed to provide authentication credentials
        - 404 Not found: if it was unsuccessful to delete it
            - Like is not yours
            - Wrong song id given
    """

    permission_classes = [IsAuthenticated]
    queryset = None
    serializer_class = SongLikeSerializer
    lookup_field = "song"

    def get_queryset(self):
        return SongLike.objects.filter(user=self.request.user)
