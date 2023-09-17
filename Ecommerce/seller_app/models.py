from django.db import models
from django.contrib.auth.models import User


class Seller_Profile(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE , null=True , blank=True)
    phone_number = models.CharField(max_length=200 , null=True , blank=True)
    flag = models.CharField(max_length=150 , default="Seller")

    def __str__(self):

     return self.user.username


