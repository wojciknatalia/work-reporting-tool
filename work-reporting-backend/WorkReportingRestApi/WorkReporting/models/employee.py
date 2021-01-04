from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')
    surname = models.CharField(max_length=200,blank=False, default='')