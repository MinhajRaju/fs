from rest_framework import serializers
from customer_app.models import *
from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import RefreshToken





class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'





class UserSerializerWithToken(serializers.ModelSerializer):
    
    token = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    customer = serializers.SerializerMethodField(read_only=True)

    
    class Meta:
        model = User

        fields = ['id','username' , 'email' ,  'isAdmin' ,'token' , 'customer']

    def get_isAdmin(self , obj):
        return obj.is_staff
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
    def get_customer(self, obj):
        return CustomerProfileSerializerForLogin(obj.customer_profile_set.all() , many=True).data


class CustomerProfileSerializerForLogin(serializers.ModelSerializer):
   
   

    class Meta:
        model = Customer_Profile
        fields = ['id' , 'phone_number' , 'flag' ,'product_id'] 


  

class CustomerProfileSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField(read_only=True)
   

    class Meta:
        model = Customer_Profile
        fields = ['id' , 'phone_number' , 'flag' , 'user' ,'product_id'] 


    def get_user(self , obj):
        return UserSerializer(obj.user , many=False).data
    








    
    
    

class RatingAndCommentSerializer(serializers.ModelSerializer):

    customer  = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Rating_Comment
        fields = ['id' , 'customer','rating' , 'comment']


    def get_customer(self , obj):
        return CustomerProfileSerializer(obj.customer  , many=False).data


