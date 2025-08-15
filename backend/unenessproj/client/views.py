from django.shortcuts import render 
from rest_framework.views import APIView 
from .models import Client
from .serializers import ClientSerializer
from rest_framework.response import Response 
from rest_framework import status as status 
from rest_framework.authtoken.models import Token 
from rest_framework.authentication import TokenAuthentication 
from django.contrib.auth import authenticate, login, logout 
from rest_framework.permissions import AllowAny, IsAuthenticated 
from django.core.exceptions import ValidationError 

# refer: https://www.django-rest-framework.org/api-guide/serializers/#saving-instances


class SignUpView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request) -> Response:
        data = request.data.copy()
        data["is_active"] = True
        data["is_staff"] = False
        data["is_superuser"] = False
        
        new_client = ClientSerializer(data=data)
    
        ###DEBUG###
        print("Input:", request.data)
        if not new_client.is_valid():
            print("Errors:", new_client.errors)
        else:
            print("Validated:", new_client.validated_data)
    
        if new_client.is_valid():

            # Client.objects.create_user(**data)
            client = new_client.save()
            # print("client", client)
            
            # client = Client.objects.create(
                # username=data["username"],
                # email=data["email"],
                # password=data["password"])
            # print(client)

            # client.save()
            token = Token.objects.create(user=client)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)




class AdminSignUpView(APIView):
    permission_classes = [AllowAny]
     
    def post(self, request) -> Response:
        data = request.data.copy()
        data["username"] = data["email"]
        admin = Client(**data)

        try:
            admin.full_clean()
            admin = Client.objects.create_superuser(
                username=data["username"],
                email=data["email"],
                password=data["password"]
            )
            token = Token.objects.create(user=admin)

            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)


class LogInView(APIView):
    permission_classes = [AllowAny]

    def post(self, request) -> Response:
        data = request.data.copy()

        # client = ClientSerializer(data=request.data)
        # print(client.is_valid(raise_exception=True))
        # print(client)
        # data = ClientSerializer(request.client).data
        # print(data["email"])
        # print(data["password"])

        # print(data)
        # print(request)
        # print(data.get("email"))
        # print(data.get("password"))

        # return an empty object if not auth
        # auth_user_rest = rest_auth(
        #                         request=request,
        #                         username=data.get("email"),
        #                         password=data.get("password"))
        auth_client = authenticate(
                                    request=request,
                                    username=data["email"],
                                    password=data["password"])

        # print(self.check_permissions(request=request))
        # print(auth_client)
        # print(auth_client)
        if auth_client:
            login(request=request, user=auth_client)
            print("2", auth_client)
            token, created = Token.objects.get_or_create(user=auth_client)
            print("token", token)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
        return Response({"message": "No client matching those credential."}, status=status.HTTP_404_NOT_FOUND)



    # def login(self, request) -> Response:
    #     data = request.data.copy()
    #     if request.method == "POST":

    #         auth_client = authenticate(
    #                                 username=data.get("clientname"),
    #                                 password=data.get("password"))

    #         if auth_client:
    #             login(request=request, user=auth_client)
    #             return Response({"message": "Successful Login."}, status=status.HTTP_201_CREATED)
    #     return Response({"message": "No client matching those credential."}, status=status.HTTP_404_NOT_FOUND)        



class LogOutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request) -> Response:
        # request.user.auth_token.delete()
        logout(request)
        return Response({"message": "Client logged out."}, status=status.HTTP_200_OK)



class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return ClientSerializer(request=Client(request.user)).data


    def put(self, request):
        try:
            data = request.data.copy()
            client = ClientSerializer(request.user, data=data, partial=True)
            if client.is_valid():
                client.save()
                return Response(client.data)
            else:
                return Response(client.errors)
        except ValidationError as ve:
            return Response(ve.message)

    # def get(self, request) -> Response:
    #     return Response(
    #         {
    #             "username": request.user.email,
    #             "email": request.user.email,
    #             "password": request.user.password,
    #             "token": request.user.auth_token.key,
    #         },
    #         status=status.HTTP_200_OK
    #     )
