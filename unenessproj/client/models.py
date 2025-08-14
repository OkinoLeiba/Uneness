from django.db import models   
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, Permission, Group  
from .managers import CustomUserManager
from django.utils import timezone  

#TODO: review and research default, null, blank values and default argument
class Client(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True, default='')
    email = models.EmailField(primary_key=True, max_length=200, unique=True, default='')
    password = models.CharField(max_length=128, default='password123')
    first_name = models.CharField(max_length=240, default='')
    last_name = models.CharField(max_length=240, default='')
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    groups = models.ManyToManyField(Group, related_name='client_set')
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='client_user_permissions'
    )
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    objects = CustomUserManager()
    
    def __str__(self) -> str:
        return f'User profile for client {self.email}'



# from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
# from django.utils.translation import gettext_lazy as _

# from .managers import CustomUserManager

# class CustomClient(AbstractBaseUser, PermissionsMixin):
#.    username = models.CharField()
#     email = models.EmailField(_('email address'), unique=True)
#     is_staff = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
#     date_joined = models.DateTimeField(default=timezone.now)

#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = []

#     objects = CustomUserManager()

class ClientData(models.Model):
    client = models.OneToOneField(Client,
                                on_delete=models.CASCADE,
                                null=True,
                                blank=True
                                )
    week_goals_body = models.TextField(null=True, blank=True)
    week_goals_mind = models.TextField(null=True, blank=True)
    week_goals_soul = models.TextField(null=True, blank=True)
    dietary_preferences = models.TextField(null=True, blank=True)
    injuries = models.TextField(null=True, blank=True)
    calorie_goal = models.IntegerField(default=0)
    gender = models.CharField(max_length=10, default='')
    age = models.IntegerField(default=0)
    body_type = models.CharField(max_length=50, default='')
    weight = models.FloatField(default=0.0)
    height = models.FloatField(default=0.0)
    body_fat_pct = models.FloatField(default=0.0)
    bmi = models.FloatField(default=0.0)
    muscle_mass = models.FloatField(db_default=0.0)
    intermittent_fasting = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'User data for client {self.client}'

class Metric(models.Model):
    client = models.ForeignKey(Client,
                             on_delete=models.CASCADE,
                             null=True,
                             blank=True,)
    date = models.DateField(default=timezone.now)
    calorie_intake = models.IntegerField(default=0)
    calorie_count = models.IntegerField(default=0)
    location = models.CharField(max_length=100, default='')
    heart_rate = models.IntegerField(default=0)
    blood_pressures = models.CharField(max_length=50, default='')
    sleep = models.FloatField(default=0.0)
    stress_level = models.IntegerField(default=0)
    mood = models.CharField(max_length=50, default='')
    weekly_goal_status = models.CharField(max_length=50, default='')
    intermittent_fasting_count = models.IntegerField(default=0)
    intermittent_fasting_time = models.FloatField(default=0.0)

    def __str__(self) -> str:
        # expected data for the most recent date
        return f'Metrics associated with client {self.client}'


class Recipe(models.Model):
    client = models.ForeignKey(Client,
                             on_delete=models.CASCADE,
                             null=True,
                             blank=True)
    title = models.CharField(max_length=100, default='')
    ingredients = models.TextField(default='')
    instructions = models.TextField(default='')
    calories = models.IntegerField(default=0)
    image_url = models.URLField(default='')
    api_id = models.CharField(max_length=100, default='')

    def __str__(self) -> str:
        return f'List of recipes associated with client\n\
            {[print(title) for title in self.title]}'

class MealPlan(models.Model):
    client = models.ForeignKey(Client,
                             on_delete=models.CASCADE,
                             null=True,
                             blank=True)
    title = models.CharField(max_length=100, default='')
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(default=timezone.now)
    recipes = models.ManyToManyField(Recipe)
    shopping_list = models.TextField(default='')

    def __str__(self) -> str:
        return f'List of mealplans associated with client\n\
                {[print(title) for title in self.title]}'

class Feedback(models.Model):
    client = models.ForeignKey(Client,
                             on_delete=models.CASCADE,
                             null=True,
                             blank=True)
    recipe = models.ForeignKey(Recipe,
                               on_delete=models.CASCADE,
                               null=True,
                               blank=True)
    meal_plan = models.ForeignKey(MealPlan,
                                  on_delete=models.CASCADE,
                                  null=True,
                                  blank=True)
    comment = models.TextField(default='')
    rating = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f'Most recent comment associated with client {self.comment}'
