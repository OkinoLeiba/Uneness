from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from requests_oauthlib import OAuth1
import requests   
import json
import os


class RequestAPIExercise(APIView):
    """Request list of exercises
    Params:
        Request: http request for resources 

    Returns:
        Response: json of data and request status
    """
    def get(self, request) -> Response:       
        url = 'https://exercisedb.p.rapidapi.com/exercises'
        API = os.environ.get('X_RAPIDAPI_KEY')
        HOST = os.environ.get('X_RAPIDAPI_HOST')

        page = 1
        limit = 10
        more = True

        while more:
            headers = {
	        'x-rapidapi-key': API,
	        'x-rapidapi-host': HOST
            }
            params = {
                'page': page,
                'limit': limit
            }

            response = requests.get(url, headers=headers, params=params)
            if response.status_code == 200:
                body = json.loads(response.content)
                
                more = len(body.get('result', [])) > 0
                page += 1
                return Response(body, status=status.HTTP_200_OK)                    
        
        return Response({'message':'Response body is empty.'}, status=status.HTTP_400_BAD_REQUEST)
