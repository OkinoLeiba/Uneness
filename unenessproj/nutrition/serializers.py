from rest_framework.serializers import ModelSerializer
from .models import (
    Food, FullNutrient, AltMeasure, Photo,
    Metadata, Tags, Exercise, FoodItem, FoodPhoto
)

### Nutrition Exercise Calorie Count Serializer ###

class PhotoSerializer(ModelSerializer):
    class Meta:
        model = Photo
        fields = ['highres', 'thumb', 'is_user_uploaded']

class ExerciseSerializer(ModelSerializer):
    photo = PhotoSerializer()

    class Meta:
        model = Exercise
        fields = [
            'tag_id', 'user_input', 'duration_min', 'met',
            'nf_calories', 'photo', 'compendium_code',
            'name', 'description', 'benefits'
        ]

    def create(self, validated_data: dict) -> object:
        photo_data = validated_data.pop('photo')
        photo = Photo.objects.create(**photo_data)
        exercise = Exercise.objects.create(photo=photo, **validated_data)
        return exercise


### Common Food Serializer ###


class FoodPhotoSerializer(ModelSerializer):
    class Meta:
        model = FoodPhoto
        fields = ['thumb']

class FoodItemSerializer(ModelSerializer):
    photo = FoodPhotoSerializer()

    class Meta:
        model = FoodItem
        fields = [
            'food_name', 'serving_unit', 'tag_name',
            'serving_qty', 'common_type', 'tag_id',
            'locale', 'photo'
        ]

    def create(self, validated_data: dict) -> object:
        photo_data = validated_data.pop('photo', None)
        food_item = FoodItem.objects.create(**validated_data)

        if photo_data:
            FoodPhoto.objects.create(food_item=food_item, **photo_data)

        return food_item


### Natural Language Food Search ###


class FullNutrientSerializer(ModelSerializer):
    class Meta:
        model = FullNutrient
        fields = ['attr_id', 'value']

class AltMeasureSerializer(ModelSerializer):
    class Meta:
        model = AltMeasure
        fields = ['serving_weight', 'measure', 'seq', 'qty']

# class PhotoSerializer(ModelSerializer):
    # class Meta:
        # model = Photo
        # fields = ['thumb', 'highres', 'is_user_uploaded']

class MetadataSerializer(ModelSerializer):
    class Meta:
        model = Metadata
        fields = ['is_raw_food']

class TagsSerializer(ModelSerializer):
    class Meta:
        model = Tags
        fields = ['item', 'measure', 'quantity', 'food_group', 'tag_id']

class FoodSerializer(ModelSerializer):
    full_nutrients = FullNutrientSerializer(many=True)
    alt_measures = AltMeasureSerializer(many=True)
    photo = PhotoSerializer()
    metadata = MetadataSerializer()
    tags = TagsSerializer()

    class Meta:
        model = Food
        fields = [
            'food', 'food_name', 'brand_name', 'serving_qty', 'serving_unit',
            'serving_weight_grams', 'nf_calories', 'nf_total_fat', 'nf_saturated_fat',
            'nf_cholesterol', 'nf_sodium', 'nf_total_carbohydrate', 'nf_dietary_fiber',
            'nf_sugars', 'nf_protein', 'nf_potassium', 'nf_p', 'consumed_at', 'source',
            'ndb_no', 'meal_type', 'nix_brand_name', 'nix_brand_id', 'nix_item_name',
            'nix_item_id', 'upc', 'lat', 'lng', 'sub_recipe', 'class_code', 'brick_code',
            'tag_id', 'full_nutrients', 'alt_measures', 'photo', 'metadata', 'tags'
        ]

    def create(self, validated_data: dict) -> object:
        full_nutrients_data = validated_data.pop('full_nutrients', [])
        alt_measures_data = validated_data.pop('alt_measures', [])
        photo_data = validated_data.pop('photo', None)
        metadata_data = validated_data.pop('metadata', None)
        tags_data = validated_data.pop('tags', None)

        food = Food.objects.create(**validated_data)

        for nutrient in full_nutrients_data:
            FullNutrient.objects.create(food=food, **nutrient)

        for measure in alt_measures_data:
            AltMeasure.objects.create(food=food, **measure)

        if photo_data:
            Photo.objects.create(food=food, **photo_data)

        if metadata_data:
            Metadata.objects.create(food=food, **metadata_data)

        if tags_data:
            Tags.objects.create(food=food, **tags_data)

        return food

