from django.db import models
from django.contrib.auth.models import User
from seller_app.models import *
from customer_app.models import *
from admin_app.models import *
from django.contrib.postgres.fields import ArrayField
 
from po_app.helper import *
from django.db.models.signals import pre_save , post_delete , post_save


class Product(models.Model):
    seller = models.ForeignKey(Seller_Profile , on_delete=models.CASCADE , null=True , blank=True)
    brand = models.ForeignKey(Brand , on_delete=models.SET_NULL , null=True , blank=True)
    title = models.CharField(max_length=200 , null=True , blank=True)
    slug = models.SlugField(max_length=250 , null=True , blank=True)
    sku = models.CharField(max_length=150 , null=True , blank=True)
    totalqty=models.CharField(max_length=150 , null=True, blank=True)
    flashsale = models.BooleanField(default=False , null=True , blank=True)
    discount   = models.IntegerField(default = 0 , null=True , blank=True)    
    rating  = models.FloatField(default=0 , null=True , blank=True)
    categories = ArrayField(models.CharField(max_length=1000) , null=True , blank=True  )
    price  = models.IntegerField(default=0 , null=True , blank=True)
    createdAt = models.DateField(auto_now_add=True , blank=True , null=True)
    active = models.BooleanField(default=True, null=True,  blank=True)
    #product_image_id  = ArrayField(models.IntegerField(max_length=200) , null=True , blank=True)

    def __str__(self):
        return self.title


pre_save.connect(slug_generator, sender=Product)
pre_save.connect(sku_generator, sender=Product)





class Product_Variation(models.Model):
    product = models.ForeignKey(Product , on_delete=models.CASCADE  , null=True , blank=True)
    sku  = models.CharField(max_length=150 , null=True,  blank=True)
    color  = models.CharField(max_length=150 , null=True,  blank=True)
    qty  = models.CharField(max_length=150 , null=True,  blank=True)
    size  = models.CharField(max_length=150 , null=True,  blank=True)
   
    #product_image_id  = ArrayField(models.IntegerField(max_length=200) , null=True , blank=True)

    def __str__(self):
        return str(self.id)




from PIL import Image  ,ImageOps
class Product_Image(models.Model):

    seller = models.ForeignKey(Seller_Profile , on_delete=models.CASCADE , null=True , blank=True)
    product = models.ForeignKey(Product , on_delete=models.SET_NULL , null=True , blank=True)
    variation  = models.ForeignKey(Product_Variation , on_delete=models.SET_NULL , null=True , blank=True)
    photo = models.ImageField(upload_to=RandomFileName('product_image/'))


    def save(self, *args, **kwargs):
           
            new_image = compress(self.photo)            
            im = Image.open(new_image)      
            im = ImageOps.exif_transpose(im)
            super().save(*args, **kwargs)


    def __str__(self):
        return str(self.id)



post_delete.connect(delete_save_image ,sender=Product_Image)
pre_save.connect(update_save_image, sender=Product_Image)




class shippingAddress(models.Model):

    customer =  models.ForeignKey(Customer_Profile , null=True , blank=True , on_delete=models.SET_NULL)
    name = models.CharField(max_length=100 , null=True , blank=True)
    phone_number = models.CharField(max_length=100 , null=True, blank=True)
    region = models.CharField(max_length=100 , null=True, blank=True)
    city = models.CharField(max_length=100 , null=True, blank=True)
    area = models.CharField(max_length=100 , null=True, blank=True)

   

    def __str__(self):
        return self.name




class Order(models.Model):
    customer  = models.ForeignKey(Customer_Profile , on_delete=models.CASCADE , null=True , blank=True)
    shipping = models.ForeignKey(shippingAddress , on_delete=models.CASCADE , null=True , blank=True)
   
    status = models.CharField(max_length=200 , null=True , blank=True)
    payment_type = models.CharField(max_length=200 , null=True , blank=True)
    payment_status = models.CharField(max_length=150 , null=True , blank=True)
    grand_total = models.CharField(max_length=150 , null=True , blank=True)
   
    order_date = models.DateTimeField(auto_now_add=True , blank=True , null=True)
    update_date = models.DateTimeField(auto_now=True, blank=True , null=True)


    def __str__(self):
        return self.payment_status





class Order_Details(models.Model):
    product=  models.ForeignKey(Product ,  on_delete=models.CASCADE)
    order_no= models.ForeignKey(Order , on_delete=models.CASCADE , null=True , blank=True)
    seller = models.ForeignKey(Seller_Profile , on_delete=models.CASCADE , null=True , blank=True)
    variation_id = models.ForeignKey(Product_Variation , on_delete=models.SET_NULL , null=True , blank=True)
    order_date = models.DateTimeField(auto_now_add=True , blank=True , null=True)
    update_date = models.DateTimeField(auto_now=True, blank=True , null=True)   
    qty = models.IntegerField(null=True  , blank=True)
    tprice = models.IntegerField(null=True , blank=True)


    def save(self , *args , **kwargs):
        tprice = self.product.price *  self.qty
        self.tprice = tprice
        super().save(*args , **kwargs)



    def __str__(self):
        return self.product.title




