from rest_framework.test import APIClient
from rest_framework.test import APITransactionTestCase
from django.contrib.auth import get_user_model


class EndpointTestingSetup(APITransactionTestCase):
    def setUp(self):
        self.endpoint_account = "/api/account/"
        self.user_model = get_user_model()
        self.client = APIClient()

        return super().setUp()
