from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer, Serializer, CharField

class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)
    new_password = CharField(write_only=True, required=False)
    old_password = CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'new_password', 'old_password']

    def create(self, validated_data) -> User | None:
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    #TODO: validation on the frontend or backend??
    #TODO: add additional functionality to update other fields?? Partial argument for instance initializer of serializer
    def update(self, instance: User, validated_data) -> User | None:
        # Issue: could this be caused because is_valid() is not running properly
        new_password = validated_data.pop("new_password", None)
        old_password = validated_data.pop("old_password", None)
        # new_password = validated_data["new_password"]
        # old_password = validated_data["old_password"]
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


class ChangePasswordSerializer(Serializer):   
    old_password = CharField(required=True)
    new_password = CharField(required=True)

    def validate_old_password(self, value) -> str:
        user = self.context['request'].user
        if not user.check_password(value):
            raise ValidationError("Old password is incorrect.")
        return value

    def validate_new_password(self, value) -> str:
        # Add custom password validation here
        return value
