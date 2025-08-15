from django.urls import path
from .views import (SignUpView, LoginView, 
                    LogoutView, PasswordChangeView, 
                    ChangePasswordView, StatusView, InfoView)



app_name = 'user'
urlpatterns = [
    path('', StatusView.as_view(), name='staus'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('password/change/', PasswordChangeView.as_view(), name='password_change'),
    path('info/', InfoView.as_view(), name='info')
]
