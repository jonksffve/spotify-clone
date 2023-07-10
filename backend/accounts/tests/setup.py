from django.test import TransactionTestCase
from django.contrib.auth import get_user_model


class AccountsTest(TransactionTestCase):
    def setUp(self):
        self.user_model = get_user_model
        self.user_model.objects.create(
            first_name="First",
            last_name="User",
            email="first_user@email.com",
            password="1234567",
            username="firstuser",
        )
        self.user_model.objects.create(
            first_name="Second",
            last_name="User",
            email="second_user@email.com",
            password="1234567",
            username="seconduser",
        )

        return super().setUp()
