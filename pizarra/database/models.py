from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Departamento(models.Model):
    nombre = models.CharField(max_length=255)
    
    class Meta:
        verbose_name_plural = "Departamentos"
        ordering = ['nombre']
    
    def __str__(self):
        return self.nombre

class Proveedor(models.Model):
    nombre = models.CharField(max_length=255)
    observaciones = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name_plural = "Proveedores"
        ordering = ['nombre']

    def __str__(self):
        return self.nombre

class Proyecto(models.Model):
    
    ESTADOS = (
        ('Por Iniciar', 'Por Iniciar'),
        ('En Curso', 'En Curso'),
        ('Suspendido', 'Suspendido'),
        ('Finalizado', 'Finalizado'),
    )
    
    nombre = models.CharField(max_length=255)
    estado = models.CharField(max_length=255, choices=ESTADOS, default='Por Iniciar')
    inicio = models.DateField(blank=True, null=True)
    limite = models.DateField(blank=True, null=True)
    prioridad = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(3)], default=0)
    proveedores = models.ManyToManyField('Proveedor', blank=True, null=True)
    departamentos = models.ManyToManyField('Departamento', blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name_plural = "Proyectos"
        ordering = ['prioridad']

    def __str__(self):
        return self.nombre
    
class Tarea(models.Model):
    nombre = models.CharField(max_length=255)
    estado = models.BooleanField(default=False)
    inicio = models.DateField(blank=True, null=True)
    limite = models.DateField(blank=True, null=True)
    prioridad = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(3)], default=0)
    proyecto = models.ForeignKey('Proyecto', on_delete=models.CASCADE, blank=True, null=True)
    
    class Meta:
        verbose_name_plural = "Tareas"
        ordering = ['prioridad']
    
    def __str__(self):
        return self.nombre
    
