from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from assets.api_calls import get_languages, compile

# Create your views here.
class Languages(APIView):
    def get(self,request):
        return Response(get_languages())
        
    
class Compile(APIView):
    def post(self, request):
        return Response(compile(request.data["source_code"], request.data["language_id"]))