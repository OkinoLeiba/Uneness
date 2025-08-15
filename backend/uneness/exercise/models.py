from django.db import models
from django.contrib.postgres.fields import ArrayField
from client.models import Client 

class Exercise(models.Model):
    name = models.CharField(max_length=100, unique=True)
    MUSCLE_GROUP = [
    ('ABDUCTORS', 'abductors'),
    ('ABS', 'abs'),
    ('ADDUCTORS', 'adductors'),
    ('BICEPS', 'biceps'),
    ('CALVES', 'calves'),
    ('CARDIOVASCULAR SYSTEM', 'cardiovascular system'),
    ('DELTS', 'delts'),
    ('FOREARMS', 'forearms'),
    ('GLUTES', 'glutes'),
    ('HAMSTRINGS', 'hamstrings'),
    ('LATS', 'lats'),
    ('LEVATOR SCAPULAE', 'levator scapulae'),
    ('PECTORALS', 'pectorals'),
    ('QUADS', 'quads'),
    ('SERRATUS ANTERIOR', 'serratus anterior'),
    ('SPINE', 'spine'),
    ('TRAPS', 'traps'),
    ('TRICEPS', 'triceps'),
    ('UPPER BACK', 'upper back'),
    ]
    major_muscle = models.CharField(max_length=100, choices=MUSCLE_GROUP)
    minor_muscle = ArrayField(models.CharField(max_length=100))
    exercise_category = models.CharField(max_length=50)
    equipment = models.CharField(max_length=50)
    TARGET = [
    ('BACK', 'back'),
    ('CARDIO', 'cardio'),
    ('CHEST', 'chest'),
    ('LOWER_ARMS', 'lower arms'),
    ('LOWER_LEGS', 'lower legs'),
    ('NECK', 'neck'),
    ('SHOULDERS', 'shoulders'),
    ('UPPER_ARMS', 'upper arms'),
    ('UPPER_LEGS', 'upper legs'),
    ('WAIST', 'waist'),
    ]
    target_body_part = models.CharField(max_length=50, choices=TARGET)
    equipment = models.CharField(max_length=50)
    instructions = ArrayField(models.CharField(max_length=100))
    description = models.CharField(max_length=150)
    exercise_level = models.CharField(max_length=50)
    calorie_burn = models.FloatField(default=0.0)
    score = models.IntegerField() 
    
    external_id = models.IntegerField(unique=True)
        
        

    def __str__(self) -> str:
        return f'List of all exerices:\n{[print(name) for name in self.name]}'

class ExerciseData(models.Model):
    client = models.ForeignKey(Client,
                            on_delete=models.CASCADE,
                             )
    exercise = models.ForeignKey(Exercise,
                                 on_delete=models.CASCADE,
                                 to_field='name')
    date = models.DateField()
    duration = models.FloatField()
    distance = models.FloatField()
    repetition = models.IntegerField()
    set = models.IntegerField()
    exercise_category = models.CharField(max_length=50)
    exercise_type = models.CharField(max_length=50)
    exercise_level_rate = models.IntegerField()
    excercise_heart_rate = models.IntegerField()

    def __str__(self) -> str:
        # expected data for the most recent date
        return f'Exerice data associated with client {self.client}'































