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
    cporfile = Seller_Profile.objects.all()
    serializer = SellerProfileSerializer(cporfile  , many=True).data
    return Response(serializer)



@api_view(['GET','POST'])
def CreateSeller(request):
    data = request.data
    userinstance = User.objects.create(
        username = data['username'],
        password = make_password(data['password'])
    )
    Seller_Profile.objects.create(
        user = userinstance,
        phone_number = data['phone_number']
    )



    cporfile = Seller_Profile.objects.all()
    serializer = SellerProfileSerializer(cporfile  , many=True).data
    return Response(serializer)



@api_view(['GET','POST'])
def UpadateSeller(request):

    data = request.data
    userinstance = User.objects.get(id=13)
    User.objects.filter(id=13).update(username=data['username'])
    Seller_Profile.objects.filter(user = userinstance).update(phone_number = data['phone_number'] )
    cporfile = Seller_Profile.objects.all()
    serializer = SellerProfileSerializer(cporfile  , many=True).data
    return Response(serializer)


@api_view(['GET','POST'])
def ReadSeller(request , pk):

    cporfile = Seller_Profile.objects.get(id=pk)
    serializer = SellerProfileSerializer(cporfile  , many=False).data
    return Response(serializer)

@api_view(['GET','POST'])
def DeleteSeller(request , pk):
    User.objects.get(id=pk).delete()
    cporfile = Seller_Profile.objects.all()
    serializer = SellerProfileSerializer(cporfile  , many=True).data
    return Response(serializer)


@api_view(['GET','POST'])
def BulkDeleteSeller(request):

    userlist  = list([12, 3])

    for i in userlist:
        print(i)
        User.objects.get(id=i).delete()

    cporfile = Seller_Profile.objects.all()
    serializer = SellerProfileSerializer(cporfile  , many=True).data
    return Response(serializer)



@api_view(['GET','POST'])
def SerllerProduct(request ):
    seller = Seller_Profile.objects.get(id=1)

    seller_product = Product.objects.filter(seller=seller)

    serializer = ProductSerializer(seller_product ,many=True).data
    return Response(serializer)



@api_view(['GET','POST'])
def BulkAction(request ):
    print(request.data)
    idArray = request.data['id']
    flag = request.data['flag']

    if flag =='delete':
        for i in idArray:
            Product.objects.get(id=i).delete()
    if flag =='active':
        for i in idArray:
            Product.objects.filter(id=i).update(active=True)
    if flag =='deactive':
        for i in idArray:
            Product.objects.filter(id=i).update(active=False)
    
    seller = Seller_Profile.objects.get(id=1)
    seller_product = Product.objects.filter(seller=seller)
    serializer = ProductSerializer(seller_product ,many=True).data
    return Response(serializer)
    


    
