from django.conf.urls import url 
from WorkReporting import views 
 
urlpatterns = [ 
    url(r'^api/tasks$', views.task_list),
    url(r'^api/tasks$/', views.task_list),
]
