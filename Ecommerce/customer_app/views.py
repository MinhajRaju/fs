from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

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
def CreateCustomer(request):
    data = request.data
    userinstance = User.objects.create(
        username = data['username'],
        password = make_password(data['password'])
    )
    Customer_Profile.objects.create(
        user = userinstance,
        phone_number = data['phone_number']
    )



    cporfile = Customer_Profile.objects.all()
    serializer = CustomerProfileSerializer(cporfile  , many=True).data
    return Response(serializer)



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

