from django.test import TestCase  # type: ignore module will load
from django.urls import reverse, resolve
from django.contrib.auth.models import User
from .models import Client



class UsersManagersTests(TestCase):
    def test_create_user(self):
        # Used for custom models
        # User = get_user_model()
        client = Client.objects.create_user(username='bob', email='normal@client.com', password='foo')
        self.assertEqual(client.email, 'normal@client.com')
        self.assertTrue(client.is_active)
        self.assertFalse(client.is_staff)
        self.assertFalse(client.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(client.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            Client.object.create_user()  # type: ignore test exception
        with self.assertRaises(TypeError):
            Client.object.create_user(email='')  # type: ignore test exception
        with self.assertRaises(ValueError):
            Client.object.create_user(email='', password='foo')   # type: ignore test exception

    def test_create_superuser(self):
        # Used for custom model
        # User = get_user_model()
        admin_user = Client.objects.create_superuser(username='bob',email='super@user.com', password='foo')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            Client.objects.create_superuser(
                username='super', email='super@user.com', password='foo', is_superuser=False)

### Test URLS ###

class Test_URLS(TestCase):
    def test_urls(self) -> None:
        slugs = ['signup', 'login', 'logout']
        names = ['SignUpView', 'LoginView', 'LogoutView'] 
        for i in range(len(names)):   
            url = reverse(names[i])
            resolved_url = resolve(url)

            with self.subTest():
                self.assertEqual(resolved_url.route, f'api/vi/{slugs[i]}')
            # self.assertTrue(resolved_url.func.view_cases, '')
            
            



































