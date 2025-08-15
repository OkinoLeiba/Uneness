from django.urls import path
from .views import RequestAPIExercise


app_name = 'exercise'
urlpatterns = [
    path('', RequestAPIExercise.as_view(), name='requestapiexercise')
]




