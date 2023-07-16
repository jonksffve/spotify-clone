from .setup import EndpointTestingSetup
from rest_framework import status
from webapp.models import SongFile, SongLike
from django.db import IntegrityError


class TestAllAvailableEndpoints(EndpointTestingSetup):
    def test_account_creation_endpoint(self):
        # make sure we can create objects
        response = self.client.post(
            self.endpoint_account,
            {
                "username": "testing",
                "first_name": "Testing",
                "last_name": "User",
                "email": "testing_user@site.com",
                "password": "1234567",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(self.user_model.objects.count(), 3)
        user = self.user_model.objects.get(username=response.data["username"])
        self.assertEqual(
            user.get_full_name(),
            "Testing User",
        )
        self.assertEqual(user.get_short_name(), "Testing")
        self.assertEqual(user.username, "testing")
        self.assertEqual(
            user.email,
            "testing_user@site.com",
        )

        # make sure we can't create objects with:
        # empty data
        response = self.client.post(
            self.endpoint_account,
            {},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 5)

        # no first_name
        response = self.client.post(
            self.endpoint_account,
            {
                "username": "testing1",
                "last_name": "User",
                "email": "testing_user1@site.com",
                "password": "1234567",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data.get("first_name"))

        # no last_name
        response = self.client.post(
            self.endpoint_account,
            {
                "username": "testing1",
                "first_name": "Testing",
                "email": "testing_user1@site.com",
                "password": "1234567",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data.get("last_name"))

        # no email
        response = self.client.post(
            self.endpoint_account,
            {
                "username": "testing1",
                "first_name": "Testing",
                "last_name": "User",
                "password": "1234567",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data.get("email"))

        # no password
        response = self.client.post(
            self.endpoint_account,
            {
                "username": "testing1",
                "first_name": "Testing",
                "last_name": "User",
                "email": "testing_user1@site.com",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data.get("password"))

        # no username
        response = self.client.post(
            self.endpoint_account,
            {
                "first_name": "Testing1",
                "last_name": "User",
                "email": "testing_user1@site.com",
                "password": "1234567",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data.get("username"))

        # same email
        response = self.client.post(
            self.endpoint_account,
            {
                "username": "testing1",
                "first_name": "Testing",
                "last_name": "User",
                "email": "first_user_object@site.com",
                "password": "1234567",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data.get("email"))

        # same username
        response = self.client.post(
            self.endpoint_account,
            {
                "username": "userone",
                "first_name": "Testing",
                "last_name": "User",
                "email": "testing_user1@site.com",
                "password": "1234567",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data.get("username"))

    def test_account_auth_token_endpoint(self):
        self.user_model.objects.create_user(
            first_name="First",
            last_name="User",
            email="first_user@site.com",
            username="firstuser",
            password="1234567",
        )
        self.assertEqual(self.user_model.objects.count(), 3)

        # Make sure we can authenticate users
        response = self.client.post(
            self.endpoint_account_auth,
            {"username": "firstuser", "password": "1234567"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user"]["name"], "First User")
        self.assertEqual(response.data["user"]["email"], "first_user@site.com")

        # Make sure we can't if failing to provide data
        response = self.client.post(
            self.endpoint_account_auth,
            {},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 2)
        self.assertTrue(response.data.get("username"))
        self.assertTrue(response.data.get("password"))

        # no username
        response = self.client.post(
            self.endpoint_account_auth,
            {"password": "1234567"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data.get("username"))
        self.assertIsNone(response.data.get("password"))

        # no password
        response = self.client.post(
            self.endpoint_account_auth,
            {"username": "testing"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertIsNone(response.data.get("username"))
        self.assertTrue(response.data.get("password"))

        # If user not found?
        response = self.client.post(
            self.endpoint_account_auth,
            {"username": "dontexist", "password": "12346jpña"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_account_retrieve_endpoint(self):
        # everything okay
        response = self.client.get(
            f"{self.endpoint_account}{self.authenticated_user_one['token']}/",
            headers={"authorization": f"Token {self.authenticated_user_one['token']}"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["token"], self.authenticated_user_one["token"])
        self.assertEqual(response.data["user"]["name"], self.user_one.get_full_name())
        self.assertEqual(
            response.data["user"]["username"],
            self.authenticated_user_one["user"]["username"],
        )

        # unauthorized
        response = self.client.get(
            f"{self.endpoint_account}{self.authenticated_user_one['token']}/",
            headers={},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data["detail"])

        # not found (random or unexisting token)
        response = self.client.get(
            f"{self.endpoint_account}128371293701298312078/",
            headers={"authorization": f"Token {self.authenticated_user_one['token']}"},
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data["detail"])

    def test_song_list_creation_endpoint(self):
        # testing create view [POST]
        # 201 created
        with open("media/test.mp3", "rb") as file:
            response = self.client.post(
                self.endpoint_song,
                {
                    "title": "Always",
                    "song_file": file,
                    "song_author": "Blink 182",
                },
                format="multipart",
                headers={
                    "authorization": f"Token {self.authenticated_user_one['token']}",
                },
            )
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(response.data["title"], "Always")
            self.assertEqual(SongFile.objects.count(), 2)

        # 400 when bad data passed
        # no data
        response = self.client.post(
            self.endpoint_song,
            {},
            format="multipart",
            headers={
                "authorization": f"Token {self.authenticated_user_one['token']}",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 3)
        self.assertTrue(response.data["title"])
        self.assertTrue(response.data["song_author"])
        self.assertTrue(response.data["song_file"])

        # no title
        with open("media/test.mp3", "rb") as file:
            response = self.client.post(
                self.endpoint_song,
                {
                    "song_file": file,
                    "song_author": "Blink 182",
                },
                format="multipart",
                headers={
                    "authorization": f"Token {self.authenticated_user_one['token']}",
                },
            )
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(len(response.data), 1)
            self.assertTrue(response.data["title"])

        # no song_author
        with open("media/test.mp3", "rb") as file:
            response = self.client.post(
                self.endpoint_song,
                {
                    "title": "Always",
                    "song_file": file,
                },
                format="multipart",
                headers={
                    "authorization": f"Token {self.authenticated_user_one['token']}",
                },
            )
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(len(response.data), 1)
            self.assertTrue(response.data["song_author"])

        # no song_file
        response = self.client.post(
            self.endpoint_song,
            {
                "title": "Always",
                "song_author": "Blink 182",
            },
            format="multipart",
            headers={
                "authorization": f"Token {self.authenticated_user_one['token']}",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data["song_file"])

        # testing list view [GET]
        response = self.client.get(
            self.endpoint_song,
            headers={"authorization": f"Token {self.authenticated_user_one['token']}"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # unauthorized for GET
        response = self.client.get(
            self.endpoint_song,
            headers={},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # unauthorized for POST
        response = self.client.post(
            self.endpoint_song,
            headers={},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_song_like_list_creation_endpoint(self):
        # Testing creation [POST]
        # 201 all okay
        response = self.client.post(
            self.endpoint_song_like,
            {
                "song": self.song_object.id,
            },
            format="json",
            headers={
                "authorization": f"Token {self.authenticated_user_one['token']}",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SongLike.objects.count(), 2)
        self.assertEqual(response.data["song"], self.song_object.id)

        # 400 validation errors
        # no data
        response = self.client.post(
            self.endpoint_song_like,
            {},
            format="json",
            headers={
                "authorization": f"Token {self.authenticated_user_one['token']}",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data["song"])

        # twice liked
        with self.assertRaises(IntegrityError):
            self.client.post(
                self.endpoint_song_like,
                {
                    "song": self.song_object.id,
                },
                format="json",
                headers={
                    "authorization": f"Token {self.authenticated_user_one['token']}",
                },
            )

        # no user
        # unauthorized
        response = self.client.post(
            self.endpoint_song_like,
            {
                "song": self.song_object.id,
            },
            format="json",
            headers={},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(len(response.data), 1)

        # Testing list [GET]
        # 200 all okay
        response = self.client.get(
            self.endpoint_song_like,
            format="json",
            headers={
                "authorization": f"Token {self.authenticated_user_one['token']}",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_song_like_destroy_endpoint(self):
        pass
        # 401 unauthorized
        response = self.client.delete(
            f"{self.endpoint_song_like}{self.song_object.id}/",
            format="json",
            headers={},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(len(response.data), 1)

        # 404 not found random id
        response = self.client.delete(
            f"{self.endpoint_song_like}123124145161/",
            format="json",
            headers={"authorization": f"Token {self.authenticated_user_one['token']}"},
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # 404 not found (was not the user that liked the post)
        response = self.client.delete(
            f"{self.endpoint_song_like}{self.song_liked_user_two.id}/",
            format="json",
            headers={"authorization": f"Token {self.authenticated_user_one['token']}"},
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # 204 no content - all good with deletion
        self.assertEqual(SongLike.objects.count(), 1)
        response = self.client.delete(
            f"{self.endpoint_song_like}{self.song_liked_user_two.id}/",
            format="json",
            headers={"authorization": f"Token {self.authenticated_user_two['token']}"},
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(SongLike.objects.count(), 0)
