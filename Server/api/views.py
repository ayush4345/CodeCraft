from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from assets.api_calls import get_languages, compile
from assets.openai_api import open_ai_api_call

# Create your views here.
class Languages(APIView):
    def get(self,request):
        return Response(get_languages())
        
    
class Compile(APIView):
    def post(self, request):
        return Response(compile(request.data["source_code"], request.data["language_id"], request.data["inputs"]))
    
class Askai(APIView):
    def post(self, request):
        return Response(open_ai_api_call(request.data["error"], request.data["profession"], request.data["age"], request.data['experience'],request.data['level'] , request.data['prev_response']))