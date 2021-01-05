from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
 
from WorkReporting.models import Task
from WorkReporting.serializers import TaskSerializer


@api_view(['GET', 'POST', 'DELETE'])
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        
        tasks_serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(tasks_serializer.data, safe=False)
    
    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)