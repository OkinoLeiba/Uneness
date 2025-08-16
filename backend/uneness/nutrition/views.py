from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from requests_oauthlib import OAuth1
from .serializers import (
    ExerciseSerializer, FoodItemSerializer, FoodSerializer
)
import requests   
import json
import os


#refer: https://docx.syndigo.com/developers/docs/natural-language-for-exercise

"""
The API estimate calories burned for various exercises using natural language. 
The key context is the exercise and time duration.
Optionally, user demographics like age, gender, weight can be pass as params to make a more 
accurate estimate for calories burned.
"""

class ExerciseCalorieCount(APIView):
    """Retrieve calorie burns based on input data: exercise and duration
    Params:
        Exercise: type of exercise
        Duration: length of time of exercise or repetitions 
    Returns:
        Response: json of data and request status
    """
    def post(self, request, exercise: str, duration: int) -> Response:       
        url = 'https://trackapi.nutritionix.com/v2/natural/exercise'
        API_ID = os.environ.get('')
        API_KEY = os.environ.get('')
        
      
        headers = {
            'Content-Type': 'application/json',
            'x-app-id': API_ID,
            'x-app-key': API_KEY,
        },
        body = json.dumps({
            "query": f"{exercise} for {duration} hour" # TODO: write logic to change base on exercise
        })
        response = requests.get(url, headers=headers, data=body)
        if response.status_code == 200:
            body = json.loads(response.content)
            
            serializer = ExerciseSerializer(data=body, many=True)
            if serializer.is_valid():
                serializer.save()
                return Response(body, status=status.HTTP_200_OK)                    

        return Response({'message':'Response body is empty.'}, status=status.HTTP_400_BAD_REQUEST)



#refer: https://docx.syndigo.com/developers/docs/instant-endpoint

"""
API to populate data from any search interface, including autocomplete, with common foods 
and branded foods from Nutritionix. This searches their entire database of 600K+ foods. 
Once you select the food from the autocomplete interface, make a separate API request to 
look up the nutrients of the food.
"""

class CommonFoodSearch(APIView):
    """_summary_

    Returns:
        _type_: _description_
    """
    def get(self, request, food) -> Response:    
        #TODO: I should be able to pass the query within the request body or will pass as param when invoking method   
        url = 'https://trackapi.nutritionix.com/v2/search/instant/?query=hamburger'
        API_ID = os.environ.get('')
        API_KEY = os.environ.get('')
        
      
        headers = {
            'Content-Type': 'application/json',
            'x-app-id': API_ID,
            'x-app-key': API_KEY,
        },
        body = json.dumps({
            "query": f"{food}"
        })
        response = requests.get(url, headers=headers, data=body)
        if response.status_code == 200:
            body = json.loads(response.content)
            
            serializer = FoodItemSerializer(data=body, many=True)
            if serializer.is_valid():
                serializer.save()
                return Response(body, status=status.HTTP_200_OK)                    

        return Response({'message':'Response body is empty.'}, status=status.HTTP_400_BAD_REQUEST)




#refer: https://docx.syndigo.com/developers/docs/natural-language-for-exercisehttps://docx.syndigo.com/developers/docs/natural-language-for-nutrients

"""
API to get detailed nutrient breakdown of any natural language text.  
It can also be used in combination with the /search/instant endpoint to provide 
nutrition information for common foods.
"""

class NaturalLangNutrients(APIView):
    """_summary_
    
    Returns:
            _type_: _description_
    """
    def post(self, request, text) -> Response:       
        url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
        API_ID = os.environ.get('')
        API_KEY = os.environ.get('')
        
      
        headers = {
            'Content-Type': 'application/json',
            'x-app-id': API_ID,
            'x-app-key': API_KEY,
        },
        body = json.dumps({
            "query": f"{text}"
        })
        response = requests.get(url, headers=headers, data=body)
        if response.status_code == 200:
            body = json.loads(response.content)
            serializer = FoodSerializer(data=body)
            if serializer.is_valid():
                serializer.save()
                return Response(body, status=status.HTTP_200_OK)                    

        return Response({'message':'Response body is empty.'}, status=status.HTTP_400_BAD_REQUEST)
