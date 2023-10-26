from rest_framework import serializers
from po_app.models import *

from seller_app.models import *
from django.contrib.auth.models import User




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']




class SellerProfileSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Seller_Profile
        fields = ['id' , 'phone_number' , 'flag' , 'user' , 'store_name' , 'srating']

    def get_user(self , obj):
        return UserSerializer(obj.user , many=False).data
    


class PISerializer(serializers.ModelSerializer):

    class Meta:
        model = Product_Image
        fields = ['id','photo' , 'thumbnail']







class ImageFolderDetailsSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Image_Folder
        fields = ['id' ,'title']

   
class ImageFolderSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Image_Folder
        fields = ['image']

    def get_image(self , obj):
            img = []
            for i in obj.img_id:             
                
                img.append( Product_Image.objects.get(id=i))              

            return PISerializer(img , many=True).data

