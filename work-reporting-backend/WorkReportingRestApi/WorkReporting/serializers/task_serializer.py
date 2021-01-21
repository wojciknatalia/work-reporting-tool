from rest_framework import serializers 
from WorkReporting.models import Task
from django.contrib.auth.models import User
 
 
class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ('id',
                  'title',
                  'date',
                  'hours',
                  'employee_email',
                  'employee')
