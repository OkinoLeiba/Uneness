from django.contrib import admin  # type: ignore module will load
from .models import (
    Client, ClientData, Metric, Recipe, MealPlan, Feedback
)

admin.site.register(Client)
admin.site.register(ClientData)
admin.site.register(Metric)


admin.site.register(Recipe)
admin.site.register(MealPlan)
admin.site.register(Feedback)
