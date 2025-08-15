from django.urls import path  # type: ignore module will load
from .views import (
    SignUpView, LogInView, LogOutView,
    PasswordChangeView, PasswordChangeDoneView,
    PasswordResetView, PasswordResetDoneView,
    PasswordResetConfirmView, PasswordResetCompleteView,
    IndexView
)


app_name = 'django_form'
urlpatterns = [
    path('', IndexView.as_view(), name='index'), 
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/',  LogInView.as_view(),  name='login'),
    path('logout/', LogOutView.as_view(), name='logout'),

    path(
        'password_change/',
        PasswordChangeView.as_view(),
        name='password_change'),
    path('password_change/done/',
         PasswordChangeDoneView.as_view(),
         name='password_change_done'),
# 
    path('password_reset/',
         PasswordResetView.as_view(),
         name='password_reset'),
    path('password_reset/done/',
         PasswordResetDoneView.as_view(),
         name='password_reset_done'),
# 
    path('reset/<uidb64>/<token>/',
         PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),
    path('reset/done/',
         PasswordResetCompleteView.as_view(),
         name='password_reset_complete'),
]
