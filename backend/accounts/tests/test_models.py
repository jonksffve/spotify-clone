from .setup import AccountsTest
from django.db import IntegrityError


# Create your tests here.
class TestingModels(AccountsTest):
    def test_custom_user(self):
        # can create
        self.user_model.objects.create_user(
            first_name="Third",
            last_name="User",
            email="third_user@email.com",
            password="1234567",
            username="thirduser",
        )
        self.assertEqual(self.user_model.objects.count(), 3)

        # assert can not create scenearios
        # empty object
        with self.assertRaises(TypeError):
            self.user_model.objects.create_user()

        # taken username
        with self.assertRaises(IntegrityError):
            self.user_model.objects.create_user(
                first_name="Fourth",
                last_name="User",
                email="fourth_user@email.com",
                password="1234567",
                username="firstuser",
            )

        # taken email
        with self.assertRaises(IntegrityError):
            self.user_model.objects.create_user(
                first_name="Fourth",
                last_name="User",
                email="first_user@email.com",
                password="1234567",
                username="fourthuser",
            )
