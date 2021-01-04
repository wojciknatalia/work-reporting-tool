from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view
 
from WorkReporting.models import Employee
from WorkReporting.serializers import EmployeeSerializer


@api_view(['GET', 'POST', 'DELETE'])
def employee_list(request):
    if request.method == 'GET':
        employees = Employee.objects.all()
        
        employees_serializer = EmployeeSerializer(employees, many=True)
        return JsonResponse(employees_serializer.data, safe=False)
 
 
@api_view(['GET'])
def employee_detail(request, pk):
    try: 
        employee = Employee.objects.get(pk=pk) 
    except Employee.DoesNotExist: 
        return JsonResponse({'message': 'The employee does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        employee_serializer = EmployeeSerializer(employee) 
        return JsonResponse(employee_serializer.data) 
     