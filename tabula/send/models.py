from django.db import models

# Create your models here.

class Img(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class  Meta:
        verbose_name = 'Image'
        verbose_name_plural = 'Images'