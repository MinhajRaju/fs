from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

#Model import
from admin_app.models import *
from customer_app.models import *
from po_app.models import *
from seller_app.models import *

#Serializer Import
from admin_app.serializers import *
from customer_app.serializers import *
from po_app.serializers import *
from seller_app.serializers import *




@api_view(['GET','POST'])
def All(request):
    cporfile = Customer_Profile.objects.all()
    serializer = CustomerProfileSerializer(cporfile  , many=True).data
    return Response(serializer)



@api_view(['GET','POST'])
def RegisterCustomer(request):
    data = request.data
    userinstance = User.objects.create(
        username = data['name'],
        email = data['email'],
        password = make_password(data['pass'])       
        
    )
    customerprofileinstance = Customer_Profile.objects.create(
        user = userinstance,
        phone_number = data['number']
    )
   
    serializer = CustomerProfileSerializerWithToken(customerprofileinstance  , many=False).data
    return Response(serializer)



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        print(data)
        print(self.user)
        serializer = UserSerializerWithToken(self.user).data
        print(serializer)
        for k, v in serializer.items():
            data[k] = v

        return data



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET','POST'])
def UpadateCustomer(request):

    data = request.data
    userinstance = User.objects.get(id=1)
    User.objects.filter(id=1).update(username=data['username'])
    Customer_Profile.objects.filter(user = userinstance).update(phone_number = data['phone_number'] )
    cporfile = Customer_Profile.objects.all()
    serializer = CustomerProfileSerializer(cporfile  , many=True).data
    return Response(serializer)


@api_view(['GET','POST'])
def ReadCustomer(request , pk):

    cporfile = Customer_Profile.objects.get(id=pk)
    serializer = CustomerProfileSerializer(cporfile  , many=False).data
    return Response(serializer)

@api_view(['GET','POST'])
def DeleteCustomer(request , pk):
    User.objects.get(id=pk).delete()
    cporfile = Customer_Profile.objects.all()
    serializer = CustomerProfileSerializer(cporfile  , many=True).data
    return Response(serializer)


@api_view(['GET','POST'])
def BulkDeleteCustomer(request):

    userlist  = list([9 , 10])

    for i in userlist:
        print(i)
        User.objects.get(id=i).delete()

    cporfile = Customer_Profile.objects.all()
    serializer = CustomerProfileSerializer(cporfile  , many=True).data
    return Response(serializer)

