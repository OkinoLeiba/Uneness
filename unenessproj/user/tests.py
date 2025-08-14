from django.urls import resolve, reverse
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient

class Test_URLS(TestCase):
    def test_urls(self) -> None:
        slugs = ['signup', 'login', 'logout']
        names = ['SignUpView', 'LoginView', 'LogoutView']
        
        for u in range(len(names)):
            url = reverse(names[u])
            print(url)
            resolve_url = resolve(url)
            print(resolve_url)
            with self.subTest():
                self.assertEqual(resolve_url.route, f'api/v1/{slugs[u]}')
            self.assertTrue(resolve_url.view_name is names[u])
            self.assertEqual(resolve_url.namespace, 'user')


### SignUp Tests ###

"""
This test will send a post request to the 'signup' endpoint with a request body of
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "secure123"
}
to simulate a user sending a post request to signup.

This endpoint must return the following Response

{"username": "alice","token":"<token_generated>"} with a status code of 201 
in order to pass this test

"""

# Option to make HTTP request 
# import requests
# 
# response = requests.post(
    # "http://localhost:8000/api/v1/user/signup/",
    # json = {"username": "alice",
            # "email": "alice@example.com",
            # "password": "secure123"}
# )

class Test_Sign_UP(TestCase):
    def setUp(self):   
        self.user = APIClient()
        # self.user = User()
        
    def test_user_can_signup_with_valid_data(self) -> None:
        request = reverse('signup')
        data = {"username": "alice",
                    "email": "alice@example.com",
                    "password": "secure123"}
        # API Client Option
        response = self.user.post(path=request,
                                  data=data,
                                  format='json',
                                  content_type='application/json')
        
        # User Model Object and Inherited Methods Options
        # response = self.user.post(request=request,
                    # data=data,
                    # content_type='application/json')
        print(response)
        # self.assertEqual(response, 201)
        # self.assertTrue(User.objects.filter(username='alice').exists())
