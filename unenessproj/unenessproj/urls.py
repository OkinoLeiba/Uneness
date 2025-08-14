"""
URL configuration for unenessproj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.http import HttpResponse

def hello(request):
    return HttpResponse(f'<h1>Hello, Django!</h1>')



urlpatterns = [
    path('', hello),
    path('admin/', admin.site.urls),
    path('api/v1/user/', include('user.urls', namespace='user')),
    path('api/v1/django/', include('django_form.urls', namespace='django_form')),
    path('api/v1/client/', include('client.urls', namespace='client')),
    path('api/v1/exercise/', include('exercise.urls', namespace='exercise')),
    
    path('api/v1/djangotest/', include('django.contrib.auth.urls')),
    
    # Different approach, may not build out or explore, may require full architecture build-out
    path('login/', TemplateView.as_view(template_name="index.html")),
    path('signup/', TemplateView.as_view(template_name="index.html")),
]
