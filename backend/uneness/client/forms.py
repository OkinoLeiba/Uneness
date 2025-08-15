from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import Client

# May or may not need: design decision on what should manage login, logout, signup forms
class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = Client
        fields = '__all__'


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = Client
        fields = '__all__'