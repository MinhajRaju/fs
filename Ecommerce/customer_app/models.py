from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField


class Customer_Profile(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE , null=True , blank=True)
    phone_number = models.CharField(max_length=200 , null=True , blank=True)
    flag = models.CharField(max_length=150 , default="Customer")
    product_id = ArrayField(models.IntegerField() , null=True , blank=True)

    def __str__(self):
        return self.user.username
    
from po_app.models import Product 
class Rating_Comment(models.Model):
    product_id  = models.ForeignKey(Product , on_delete=models.CASCADE)
    customer  = models.ForeignKey(Customer_Profile , on_delete=models.CASCADE , null=True , blank=True)
    rating = models.FloatField(default=0 , null=True , blank=True)
    comment = models.CharField(max_length=200 , null=True , blank=True)


    def save(self, *args, **kwargs):
           
            
            
            
            product = Product.objects.get(id=self.product_id.id)
            rating  = Rating_Comment.objects.filter(product_id  = product)

            if len(rating) == 0:
               
               super().save(*args, **kwargs)
            else:
                x = []
                for i in rating:

                    if i.rating == None:
                        pass
                    else:                        
                        x.append(i.rating)
                print(len(x) , sum(x))       
                res  = round(sum(x)/len(x), 2)               
                
                Product.objects.filter(id=self.product_id.id).update(rating=res)
                super().save(*args, **kwargs)
    


    def __str__(self):
        return self.comment
