from django.contrib import admin
from .models import Proyecto, Tarea, Proveedor, Departamento
from import_export import resources
from import_export.admin import ImportExportModelAdmin

class ProyectoAdmin (ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('nombre', 'estado', 'inicio', 'limite', 'prioridad')
    list_filter = ('estado', 'prioridad')
    search_fields = ('nombre', 'proveedor', 'departamentos')
    
admin.site.register(Proyecto, ProyectoAdmin)
        
class TareaAdmin (ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('nombre', 'inicio', 'limite', 'prioridad')
    list_filter = ('prioridad',)
    search_fields = ('nombre',)
    
admin.site.register(Tarea, TareaAdmin)

class ProveedorAdmin (ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('nombre', 'observaciones')
    search_fields = ('nombre', 'observaciones')
    
admin.site.register(Proveedor, ProveedorAdmin)

class DepartamentoAdmin (ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)
    
admin.site.register(Departamento, DepartamentoAdmin)
        
    
    