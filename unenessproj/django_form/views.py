from django.contrib.auth import (
    authenticate, login, logout, update_session_auth_hash,
)
from django.contrib.auth.forms import (
    UserCreationForm, AuthenticationForm,
    PasswordChangeForm, PasswordResetForm, SetPasswordForm
)
from django.contrib.auth.models import User 
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import redirect
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.shortcuts import render
from rest_framework import status  
from rest_framework.response import Response  
from rest_framework.views import APIView  
from rest_framework.renderers import TemplateHTMLRenderer  


class IndexView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'index.html'
    
    def get(self, request):
        render(request=request, template_name='index.html', status=status.HTTP_200_OK)

class SignUpView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'signup.html'

    def get(self, request):
        form = UserCreationForm()
        return Response({'form': form})

    def post(self, request):
        form = UserCreationForm(request.data)
        print(form)
        if form.is_valid():
            client = form.save()
            login(request, client)
            return redirect('client:password_change')
        return Response({'form': form}, status=status.HTTP_400_BAD_REQUEST)


class LogInView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'login.html'

    def get(self, request):
        form = AuthenticationForm()
        return Response({'form': form})

    def post(self, request):
        form = AuthenticationForm(request, data=request.data)
        if form.is_valid():
            client = form.get_user()
            login(request, client)
            return redirect('client:password_change')
        return Response({'form': form}, status=status.HTTP_400_BAD_REQUEST)


class LogOutView(APIView):
    """
    Simple view to log out and redirect to login.
    """
    def post(self, request):
        logout(request)
        return redirect('client:login')


class PasswordChangeView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'password_change_form.html'

    def get(self, request):
        form = PasswordChangeForm(request.client)
        return Response({'form': form})

    def post(self, request):
        form = PasswordChangeForm(request.client, request.data)
        if form.is_valid():
            client = form.save()
            update_session_auth_hash(request, client)
            return redirect('client:password_change_done')
        return Response({'form': form},
                        status=status.HTTP_400_BAD_REQUEST)


class PasswordChangeDoneView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'password_change_done.html'

    def get(self, request):
        Response(template_name='password_change_done.html', status=status.HTTP_200_OK)


class PasswordResetView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'password_reset_form.html'

    def get(self, request):
        form = PasswordResetForm()
        return Response({'form': form})

    def post(self, request):
        form = PasswordResetForm(request.data)
        if form.is_valid():
            form.save(
                request=request,
                use_https=request.is_secure(),
                email_template_name='password_reset_email.html',
            )
            return redirect('client:password_reset_done')
        return Response({'form': form},
                        status=status.HTTP_400_BAD_REQUEST)


class PasswordResetDoneView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'password_reset_done.html'

    def get(self, request):
        return Response(template_name='password_reset_done.html', status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'password_reset_confirm.html'

    def _get_user(self, uidb64):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            return User.objects.get(pk=uid)
        except Exception:
            return None

    def get(self, request, uidb64, token):
        client = self._get_user(uidb64)
        if client and default_token_generator.check_token(client, token):
            form = SetPasswordForm(client)
            return Response({'form': form, 'validlink': True})
        return Response({'validlink': False},
                        status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, uidb64, token):
        client = self._get_user(uidb64)
        form = SetPasswordForm(client, request.data) if client else None
        if form and form.is_valid():
            form.save()
            return redirect('client:password_reset_complete')
        context = {'form': form or SetPasswordForm(None), 'validlink': False}
        return Response(context,
                        status=status.HTTP_400_BAD_REQUEST)


class PasswordResetCompleteView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'password_reset_complete.html'

    def get(self, request):
        return Response()
