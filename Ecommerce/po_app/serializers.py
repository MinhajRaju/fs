from rest_framework import serializers
from po_app.models import *
from django.contrib.auth.models import User
from seller_app.serializers import *
from admin_app.serializers import *
from customer_app.serializers import *


class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product_Image
        fields = ['id','photo' , 'thumbnail']


class ProductVariation(serializers.ModelSerializer):

    variation_image =  serializers.SerializerMethodField(read_only=True)
    colors =  serializers.SerializerMethodField(read_only=True)
    size =  serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product_Variation
        fields= ['id','sku','product','color','colors','qty','size','variation_image']

    def get_colors(self , obj):

        if obj.color == None:
            return 
        else:
         
            return ColorAttrSerializer(obj.color , many=False).data
    def get_size(self , obj):
        if obj.size == None:
            return 
        else:

            return SizeAttrSerializer(obj.size , many=False).data


    def get_variation_image(self, obj):
        return ProductImageSerializer(obj.product_image_set.all(), many=True).data



class WarrentySerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'



class ProductSerializer(serializers.ModelSerializer):

    variation = serializers.SerializerMethodField(read_only=True)

    image =  serializers.SerializerMethodField(read_only=True)
    seller = serializers.SerializerMethodField(read_only=True)
    rc = serializers.SerializerMethodField(read_only=True)
    category = serializers.SerializerMethodField(read_only=True)
    services = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model =  Product
        fields = ['id'  ,'brand' ,'seller','title','slug', 'flashsale' ,'sku','totalqty','variation' ,'image' ,'rc' ,'rating' ,'category' ,'price' ,'createdAt' , 'active' , 'spec' , 'highlights','sdes' ,'ldes','services','oservices']

 
    def get_seller(self , obj):
        return SellerProfileSerializer(obj.seller , many=False).data   
    
    def get_services(self , obj):

        if obj.wservices == None:
            return None
        else:
            
            return WarrentySerializer(obj.wservices , many=False).data
    def get_variation(self, obj):
        return ProductVariation(obj.product_variation_set.all() , many=True).data
    def get_image(self, obj):
        return ProductImageSerializer(obj.product_image_set.all(), many=True).data
    def get_rc(self , obj):
        query = obj.rating_comment_set.all().order_by('-id')
        return RatingAndCommentSerializer(query , many=True).data
    def get_category(self , obj):
        category = []
        for i in obj.categories:
            cat = Category.objects.get(id=i)
            if cat.parent == None:
                category.append(cat)

        return CategoryNestedSerializer(category , many=True).data




class ShippingAdressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = shippingAddress
        fields ='__all__'


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'







class OrderSerailizer(serializers.ModelSerializer):

    customer = serializers.SerializerMethodField(read_only=True)
    shipping = serializers.SerializerMethodField(read_only=True)
    order = serializers.SerializerMethodField(read_only=True)
    
    
    class Meta:
        model = Order
        fields = ['id' ,'customer' , 'shipping' , 'order']
    
    
    def get_customer(self, obj):
        return CustomerProfileSerializer(obj.customer , many=False).data
    
    def get_shipping(self, obj):
        return ShippingAdressSerializer(obj.shipping , many=False).data

     
    def get_order(self, obj):
        return OrderDetailSerializer(obj.order_details_set.all() , many=True).data
        



class OrderDetailSerializer(serializers.ModelSerializer):

  
    product = serializers.SerializerMethodField(read_only=True)
   
    seller = serializers.SerializerMethodField(read_only=True)
    variation = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order_Details
        fields = ['id' , 'product' , 'seller' , 'order_no','order_date' , 'variation','order_status' , 'qty' , 'tprice']
    

    def get_product(self, obj):
        return ProductSerializer(obj.product , many=False).data    
   
        
    def get_seller(self, obj):
        return SellerProfileSerializer(obj.seller , many=False).data
            
    def get_variation(self, obj):

        if obj.variation_id == None:
            return None
        else:      
         
         return ProductVariation(obj.variation_id , many=False).data


  

  







