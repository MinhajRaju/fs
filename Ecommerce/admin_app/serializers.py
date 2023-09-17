from rest_framework import serializers
from admin_app.models import *
from django.contrib.auth.models import User




class CategoryNestedSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [  'id' ,'name' , 'parent' ,'level','children', 'hitcount']

    def get_children(self, obj):
        return CategoryNestedSerializer(obj.get_children(), many=True).data