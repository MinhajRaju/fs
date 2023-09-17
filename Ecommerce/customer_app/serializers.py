from rest_framework import serializers
from customer_app.models import *
from django.contrib.auth.models import User







class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']




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


