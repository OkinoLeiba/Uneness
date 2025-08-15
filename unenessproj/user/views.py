from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from .serializers import UserSerializer, ChangePasswordSerializer
from datetime import datetime, timedelta
from unenessproj.settings import STATIC_URL
import os


"""
Provides initial status to frontend when axios creates api instance.
The instance will make further requests.
"""
class StatusView(APIView):
    permission_classes = [permissions.AllowAny]
    
    """Server status response.
    
    Params:
        Request: provides access to tools to make api calls
    Returns:
        Response: _description_
    """
    def get(self, request) -> Response:
        return Response({'message': 'Django Server is Running'}, status=status.HTTP_200_OK)
   
    
"""
User view to register new user and attach authentication to user email or unique identifier.
"""
class SignUpView(APIView):
    permission_classes = [permissions.AllowAny]

    """Create a new user and provide token for authentication.
    Params:
        request: http request for resources 
    Returns:
        response: json of data and request status
    """
    def post(self, request) -> Response:
        data = request.data.copy()
        data["is_active"] = True
        data["is_staff"] = False
        data["is_superuser"] = False
        # TODO: consider writing logic to manage if user already exist or to manage exception
        serializer = UserSerializer(data=data)     
                         
        try:
            if serializer.is_valid():
                user = serializer.save()
                token, created = Token.objects.get_or_create(user=user)

                life_time = datetime.now() + timedelta(hours=int(str(os.environ.get('EXPIRATION_DELTA')).strip()))
                format_life_time = life_time.strftime(format='%a, %d %b %Y %H:%M:%S GMT')
                response = Response({'user': {'email': serializer.validated_data['email']}}, status=status.HTTP_201_CREATED)  # type: ignore validate_data will have state after is_valid is called 
                response.set_cookie(key='token', value=token.key, expires=format_life_time, secure=True, httponly=True, samesite='')
                return response
        except Exception as e:
            print('Save Error', e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

"""
Log in user and provide token for authentication.       
"""
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    """Login user and provide token for authentication.
    Params:
        request: http request for resources 
    Returns:
        response: json of data and request status
    """
    def post(self, request) -> Response:
        data = request.data.copy()
        
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        try:
            if user:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                life_time = datetime.now() + timedelta(hours=int(str(os.environ.get('EXPIRATION_DELTA')).strip()))
                format_life_time = life_time.strftime(format='%a, %d %b %Y %H:%M:%S GMT')
                response = Response({'user': {'email': data['email']}}, status=status.HTTP_201_CREATED)  # type: ignore validate_data will have state after is_valid is called 
                response.set_cookie(key='token', value=token.key, expires=format_life_time, secure=True, httponly=True, samesite='')
                return response
        except Exception as e:
            print('Save Error', e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    

"""
Log out user and delete token associated with specific user.     
"""
class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request) -> Response:
        request.user.auth_token.delete()
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    
# Needs Work: issue is serializer and validate data not of type dict or refencence to
class PasswordChangeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request) -> Response:
        data = request.data.copy()
        # print(request)
        serializer = UserSerializer(User.objects.get(auth_token=request.auth), data=data)
        
        print(serializer.data)
        ##DEBUG##
        if not serializer.is_valid():
            print(serializer.errors)
        if serializer.is_valid():
            print(serializer.errors)
            instance = serializer.update(instance=request.user, validated_data=data)
            token, _ = Token.objects.get_or_create(user=instance)
            return Response({'message': 'Password successfully changed', 'token':token.key}, status=status.HTTP_201_CREATED)
        return Response({'error':'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
    
"""
Update both the user's password and token.     
"""    
class ChangePasswordView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request) -> Response:
        data = request.data.copy()
        serializer = ChangePasswordSerializer(data=data, context={'request': request})

       
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])  # type: ignore validate_data will have state after is_valid is called 
            user.save()

            # Optionally refresh token
            Token.objects.filter(user=user).delete()
            token = Token.objects.create(user=user)

            return Response({'message': 'Password successfully changed', 'token': token.key}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
Provide data associated with specific user.     
"""
class InfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request) -> Response:
        return Response({'user': UserSerializer(User.objects.get(email=request.data.get('email'))).data}, status=status.HTTP_200_OK)