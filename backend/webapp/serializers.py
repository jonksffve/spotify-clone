from rest_framework.serializers import ModelSerializer
from .models import SongFile


class SongCreateSerializer(ModelSerializer):
    class Meta:
        model = SongFile
        fields = ["title", "song_author", "song_file", "cover_image"]
