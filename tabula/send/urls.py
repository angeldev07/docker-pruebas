
from django.urls import path
from .views import listar_items, crear_item

urlpatterns = [
    path('listar-items', listar_items, name='listar items'),
    path('crear-items', crear_item, name='crear items'),
]