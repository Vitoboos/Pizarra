from django.urls import path, include
from rest_framework import routers
from database import viewsets

router = routers.DefaultRouter()
router.register(r'proyectos', viewsets.ProyectoViewSet)
router.register(r'tareas', viewsets.TareaViewSet)
router.register(r'departamentos', viewsets.DepartamentoViewSet)
router.register(r'proveedores', viewsets.ProveedorViewSet)

urlpatterns = [
    path('api/<str:name>/', viewsets.DepartamentoViewSet.as_view({'get': 'list'})),
    path('api/<str:name>/', viewsets.ProveedorViewSet.as_view({'get': 'list'})),
    path('api/<str:name>/', viewsets.ProyectoViewSet.as_view({'get': 'list'})),
    path('api/<str:name>/', viewsets.TareaViewSet.as_view({'get': 'list'})),
    path('', include(router.urls))
]