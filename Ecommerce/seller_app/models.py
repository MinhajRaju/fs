from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField










class Seller_Profile(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE , null=True , blank=True)
    store_name  = models.CharField(max_length=200 , null=True , blank=True)
    srating = models.FloatField(default=0  , null=True , blank=True)
    phone_number = models.CharField(max_length=200 , null=True , blank=True)
    flag = models.CharField(max_length=150 , default="Seller")

    def __str__(self):

     return self.store_name



class Image_Folder(models.Model):
    owner = models.ForeignKey(Seller_Profile , on_delete=models.CASCADE , null=True , blank=True)
    title = models.CharField(max_length=50, unique=True)
    img_id = ArrayField(models.IntegerField(max_length=1000) , null=True , blank=True  )



    def __str__(self):
        return self.title

