from .setup import EndpointTestingSetup
from rest_framework import status


class TestAllAvailableEndpoints(EndpointTestingSetup):
    def test_account_endpoint(self):
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
        self.assertEqual(self.user_model.objects.count(), 1)
        self.assertEqual(self.user_model.objects.get().get_full_name(), "Testing User")
        self.assertEqual(self.user_model.objects.get().get_short_name(), "Testing")
        self.assertEqual(self.user_model.objects.get().username, "testing")
        self.assertEqual(self.user_model.objects.get().email, "testing_user@site.com")

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
                "email": "testing_user@site.com",
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
                "username": "testing",
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

    def test_auth_token_endpoint(self):
        self.user_model.objects.create_user(
            first_name="First",
            last_name="User",
            email="first_user@site.com",
            username="firstuser",
            password="1234567",
        )
        self.assertEqual(self.user_model.objects.count(), 1)

        # Make sure we can authenticate users
        response = self.client.post(
            self.endpoint_account_auth,
            {"username": "firstuser", "password": "1234567"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get("user")["first_name"], "First")
        self.assertEqual(response.data.get("user")["email"], "first_user@site.com")

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
