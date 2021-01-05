from rest_framework import serializers 
from WorkReporting.models import Task
 
 
class TaskSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Task
        fields = ('title',
                  'date',
                  'hours',
                  'employee_email')
