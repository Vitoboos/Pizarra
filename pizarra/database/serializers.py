from rest_framework import serializers
from .models import *

class DepartamentoSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Departamento
        fields = '__all__'
        
class ProveedorSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Proveedor
        fields = '__all__'
        
class ProyectoSerializer(serializers.HyperlinkedModelSerializer):
    
    departamentos = serializers.StringRelatedField(many=True)
    proveedores = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Proyecto
        fields = ['id', 'nombre', 'estado', 'inicio', 'limite', 'prioridad', 'proveedores', 'departamentos', 'observaciones']
        

class TareaSerializer(serializers.HyperlinkedModelSerializer):
    
    proyecto_nombre = serializers.SerializerMethodField()
    def get_proyecto_nombre(self, obj):
        if obj.proyecto:
            return obj.proyecto.nombre
        else:
            return None 

    class Meta:
        model = Tarea
        fields = ['id', 'nombre', 'estado', 'inicio', 'limite', 'prioridad', 'proyecto', 'proyecto_nombre']