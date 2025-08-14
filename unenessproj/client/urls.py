from django.urls import path  # type: ignore module will load
from .views import (
    SignUpView, LogInView, LogOutView,
)


app_name = 'client'
urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/',  LogInView.as_view(),  name='login'),
    path('logout/', LogOutView.as_view(), name='logout'),
]
