from django.db import models


### Nutrition Exercise Model ###


class ExercisePhoto(models.Model):
    highres = models.URLField()
    thumb = models.URLField()
    is_user_uploaded = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.thumb}\n{self.highres}'

class Exercise(models.Model):
    tag_id = models.IntegerField()
    user_input = models.CharField(max_length=255)
    duration_min = models.FloatField()
    met = models.FloatField()
    nf_calories = models.FloatField()
    photo = models.OneToOneField(ExercisePhoto, on_delete=models.CASCADE, related_name='exercise')
    compendium_code = models.IntegerField()
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    benefits = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name


### Natural Language Food Search ###

class Food(models.Model):
    food = models.CharField()
    food_name = models.CharField(max_length=100)
    brand_name = models.CharField(max_length=100, null=True, blank=True)
    serving_qty = models.FloatField()
    serving_unit = models.CharField(max_length=50)
    serving_weight_grams = models.FloatField()
    nf_calories = models.FloatField()
    nf_total_fat = models.FloatField()
    nf_saturated_fat = models.FloatField()
    nf_cholesterol = models.FloatField()
    nf_sodium = models.FloatField()
    nf_total_carbohydrate = models.FloatField()
    nf_dietary_fiber = models.FloatField()
    nf_sugars = models.FloatField()
    nf_protein = models.FloatField()
    nf_potassium = models.FloatField()
    nf_p = models.FloatField()
    consumed_at = models.DateTimeField()
    source = models.IntegerField()
    ndb_no = models.IntegerField(null=True, blank=True)
    meal_type = models.IntegerField()
    nix_brand_name = models.CharField(max_length=100, null=True, blank=True)
    nix_brand_id = models.CharField(max_length=100, null=True, blank=True)
    nix_item_name = models.CharField(max_length=100, null=True, blank=True)
    nix_item_id = models.CharField(max_length=100, null=True, blank=True)
    upc = models.CharField(max_length=100, null=True, blank=True)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    sub_recipe = models.CharField(max_length=100, null=True, blank=True)
    class_code = models.CharField(max_length=100, null=True, blank=True)
    brick_code = models.CharField(max_length=100, null=True, blank=True)
    tag_id = models.IntegerField(null=True, blank=True)

    def __str__(self) -> str:
        return self.food_name
    
class FullNutrient(models.Model):
    food = models.ForeignKey(Food, related_name='full_nutrients', on_delete=models.CASCADE)
    attr_id = models.IntegerField()
    value = models.FloatField()

    
class AltMeasure(models.Model):
    food = models.ForeignKey(Food, related_name='alt_measures', on_delete=models.CASCADE)
    serving_weight = models.FloatField()
    measure = models.CharField(max_length=50)
    seq = models.IntegerField(null=True, blank=True)
    qty = models.FloatField()

    
class Photo(models.Model):
    food = models.OneToOneField(Food, related_name='photo', on_delete=models.CASCADE)
    thumb = models.URLField()
    highres = models.URLField()
    is_user_uploaded = models.BooleanField()

class Metadata(models.Model):
    food = models.OneToOneField(Food, related_name='metadata', on_delete=models.CASCADE)
    is_raw_food = models.BooleanField()

    
class Tags(models.Model):
    food = models.OneToOneField(Food, related_name='tags', on_delete=models.CASCADE)
    item = models.CharField(max_length=100)
    measure = models.CharField(max_length=100, null=True, blank=True)
    quantity = models.CharField(max_length=50)
    food_group = models.IntegerField()
    tag_id = models.IntegerField()


### Common Food Model ###

class FoodItem(models.Model):
    food_name = models.CharField(max_length=100)
    serving_unit = models.CharField(max_length=50)
    tag_name = models.CharField(max_length=100)
    serving_qty = models.FloatField()
    common_type = models.CharField(max_length=100, null=True, blank=True)
    tag_id = models.CharField(max_length=50)
    locale = models.CharField(max_length=10)

    def __str__(self):
        return self.food_name

class FoodPhoto(models.Model):
    food_item = models.OneToOneField(FoodItem, related_name='photo', on_delete=models.CASCADE)
    thumb = models.URLField()

    def __str__(self):
        return f"Photo of {self.food_item.food_name}"
