from django.urls import path
from .views import SignUpView, LoginView, LogoutView, PasswordChangeView, ChangePasswordView, StatusView



app_name = 'user'
urlpatterns = [
    path('', StatusView.as_view(), name='staus'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('change-password/', ChangePasswordView.as_view(), name='password_change'),
]
