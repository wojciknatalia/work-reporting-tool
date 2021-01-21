from django.shortcuts import render
from django.http.response import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from WorkReporting.models import Task
from WorkReporting.serializers import TaskSerializer, UserSerializer
from django.contrib.auth.models import User


@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        email = request.GET.get('email')
        tasks = Task.objects.all().filter(employee_email=email)
        tasks_serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(tasks_serializer.data, safe=False)
    
    if request.method == 'POST':
        email = request.data.get('email')
        task_raw = request.data.get('task')
        qs = User.objects.all().filter(email=email).first()
        user_id = UserSerializer(qs).data.get('id')
        task = Task(title=task_raw.get('title'), hours=task_raw.get('hours'), employee_email=task_raw.get('employee_email'), employee=qs)
        task_raw['employee'] = user_id
        serializer = TaskSerializer(data=task_raw)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)

@api_view(['GET', 'DELETE', 'PUT'])
def task_detail(request, pk):
    if request.method == 'GET':
        try:
            task = Task.objects.get(pk=pk)
            task_serializer = TaskSerializer(task)
            return JsonResponse(task_serializer.data, safe=False)
        except ObjectDoesNotExist as e:
            return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)


    if request.method == 'DELETE':
        try:
            task = Task.objects.get(pk=pk)
            task.delete()
            return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)
        except Exception:
            return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    if request.method == 'PUT':
        try:
            task_item = Task.objects.get(pk=pk)
            serializer = TaskSerializer(task_item, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            else: 
                return JsonResponse({'error': 'Invalid data'}, safe=False, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist as e:
            return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
        return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
