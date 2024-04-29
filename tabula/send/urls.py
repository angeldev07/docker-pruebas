
from django.urls import path
from .views import file, file_list

urlpatterns = [
    path('', file, name='file'),
    path('list', file_list, name='file_list')
]