from django.db import models
from mptt.models import MPTTModel, TreeForeignKey










class Category(MPTTModel):
    name = models.CharField(max_length=50, unique=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    hitcount = models.IntegerField(null=True , blank=True)

    class MPTTMeta:
        order_insertion_by = ['name']

    def __str__(self):
        return self.name



class Brand(models.Model):
    category = models.ForeignKey(Category , null=True , blank=True , on_delete=models.CASCADE)
    name = models.CharField(max_length=200 , null=True)
    logo = models.ImageField(upload_to='brand_image/' , blank=True)

    def __str__(self):
        return self.name
    

class Color_Attr(models.Model):
    cateogry  = models.ForeignKey(Category , on_delete=models.CASCADE , null=True , blank=True)
    color = models.CharField(max_length=150 , null=True , blank=True)

    def __str__(self):
        return str(self.color)
    
class Size_Attr(models.Model):
    cateogry  = models.ForeignKey(Category , on_delete=models.CASCADE , null=True , blank=True)
    size = models.CharField(max_length=150 , null=True , blank=True)

    def __str__(self):
        return str(self.size)
    


class PackageSize(models.Model):
    cateogry  = models.ForeignKey(Category , on_delete=models.CASCADE , null=True , blank=True)
    size = models.CharField(max_length=150 , null=True , blank=True)

    def __str__(self):
        return str(self.size)