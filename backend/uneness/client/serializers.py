from rest_framework.serializers import ModelSerializer, CharField, BooleanField, EmailField  # pyright: ignore[reportMissingImports]
from django.core.exceptions import ValidationError
from .models import Client


class ClientSerializer(ModelSerializer):
    """
    Custom serializer with extra_kwargs parameter without extra fields or 
    overriding other fields in the model.
    """
    class Meta:
        model = Client
        fields = "__all__"
        
        # fields = ['username', 'email', 'password', 'groups', 'user_permissions', 'is_active', 'is_staff', 'is_superuser']
        extra_kwargs = {
            'groups': {'required': False},
            'user_permissions': {'required': False},
        }

    
    """
    Create and return a user with the given email and password.
    """
    def create(self, validated_data) -> Client | None:
        # new_client = Client.objects.create_user(**validated_data)
        # new_client.save()
        new_client = Client.objects.create(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password'])
        
        return new_client

    """
    Updated user password and other profile data.
    """
    def update(self, instance: Client, validated_data: dict) -> Client | None:
        new_password = validated_data.pop("new_password", None)
        old_password = validated_data.pop("old_password", None)
        for att, val in validated_data.items():
            setattr(instance, att, val)
        if new_password:
            if not old_password:
                raise ValidationError(
                    {
                        "old_password": "old password is required to update current password"
                    }
                )
            if not instance.check_password(old_password):
                raise ValidationError({"old_password": "Old password is incorrect"})
            instance.set_password(new_password)
        instance.save()
        return instance