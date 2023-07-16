from rest_framework.test import APIClient
from rest_framework.test import APITransactionTestCase
from django.contrib.auth import get_user_model
from webapp.models import SongFile, SongLike


class EndpointTestingSetup(APITransactionTestCase):
    """
    Basic setup to test the API endpoints
    """

    def setUp(self):
        # ENDPOINT SETUP
        self.endpoint_account = "/api/account/"
        self.endpoint_account_auth = "/api/account/token-auth/"
        self.endpoint_song = "/api/song/"
        self.endpoint_song_like = "/api/song/like/"

        # CustomUser model
        self.user_model = get_user_model()

        # Client
        self.client = APIClient()

        # Couple of users
        self.user_one = self.user_model.objects.create_user(
            username="userone",
            first_name="First",
            last_name="User Object",
            email="first_user_object@site.com",
            password="1234567",
        )

        self.user_two = self.user_model.objects.create_user(
            username="usertwo",
            first_name="Second",
            last_name="User Object",
            email="second_user_object@site.com",
            password="1234567",
        )

        # Authenticate user
        self.authenticated_user_one = self.client.post(
            self.endpoint_account_auth, {"username": "userone", "password": "1234567"}
        ).data

        self.authenticated_user_two = self.client.post(
            self.endpoint_account_auth, {"username": "usertwo", "password": "1234567"}
        ).data

        # Create a song
        with open("media/test.mp3", "rb") as file:
            self.client.post(
                self.endpoint_song,
                {
                    "title": "De Caracas a Madrid",
                    "song_file": file,
                    "song_author": "Blink 182",
                },
                format="multipart",
                headers={
                    "authorization": f"Token {self.authenticated_user_one['token']}",
                },
            )
            self.song_object = SongFile.objects.get(title="De Caracas a Madrid")

        # User 2 likes the song
        self.song_liked_user_two = SongLike.objects.create(
            song=self.song_object, user=self.user_two
        )

        return super().setUp()
