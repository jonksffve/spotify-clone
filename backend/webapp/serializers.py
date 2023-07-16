from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import SongFile, SongLike


class SongCreateSerializer(ModelSerializer):
    """
    Serializer used to create Song model instances

    User: is required in model definition, we're getting user from request.user (authentication is a MUST!)
    """

    class Meta:
        model = SongFile
        fields = ["title", "song_author", "song_file", "cover_image"]


class SongListSerializer(ModelSerializer):
    is_liked = SerializerMethodField()

    class Meta:
        model = SongFile
        fields = ["id", "title", "song_author", "song_file", "cover_image", "is_liked"]

    def get_is_liked(self, obj):
        logged_user = self.context["request"].user
        return obj.likes.filter(user=logged_user).exists()


class SongLikeSerializer(ModelSerializer):
    class Meta:
        model = SongLike
        fields = ["song"]


class SongLikeListSerializer(ModelSerializer):
    song = SongListSerializer()

    class Meta:
        model = SongLike
        fields = ["id", "user", "song"]
