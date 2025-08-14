from django.contrib.auth.models import User  # type: ignore module will load
from .models import Client


class EmailAuthBackend:
    """Authenticate using an email address."""
    """Utlized Custom User Model: Client."""
    def authenticate(self, request, username=None, password=None) -> Client | None:
        try:
            user = Client.objects.get(email=username)
            if isinstance(password, str) and user.check_password(password):
                return user
        except Client.DoesNotExist:
            return None
        else:
            return None

    def get_user(self, id: int) -> Client | None:
        try:
            return Client.objects.get(pk=id)
        except User.DoesNotExist:
            return None
