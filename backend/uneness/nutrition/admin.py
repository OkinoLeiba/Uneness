from django.contrib import admin
from .models import (
    Food, FullNutrient, AltMeasure, Photo, Metadata, Tags
)

admin.site.register(Food)
admin.site.register(FullNutrient)
admin.site.register(AltMeasure) 
admin.site.register(Photo)
admin.site.register(Metadata)
admin.site.register(Tags)