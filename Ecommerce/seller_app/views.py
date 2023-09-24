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

from django.db.models import Q









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
    


    
@api_view(['GET','POST'])
def Media(request ): 
    
    seller = Seller_Profile.objects.get(id=1)
    seller_image = Product_Image.objects.filter(seller=seller)
    print(seller_image)


    serializer = ProductImageSerializer(seller_image ,many=True).data
    return Response(serializer)
    


    
    
@api_view(['GET','POST'])
def MediaUpload(request ): 
    seller = Seller_Profile.objects.get(id=1)
   
    image = request.FILES.getlist('file')
    
    for i in image:
        Product_Image.objects.create(
            seller = seller,
            photo  = i
        )
       
    seller_image = Product_Image.objects.filter(seller=seller)  
    serializer = ProductImageSerializer(seller_image ,many=True).data
    return Response(serializer)

    

@api_view(['GET','POST'])
def RemoveMultiple(request ): 
    seller = Seller_Profile.objects.get(id=1)
   
    idArray = request.data['idArray'] 

    for i in idArray:
        Product_Image.objects.get(id=i).delete()
   
       
    seller_image = Product_Image.objects.filter(seller=seller)  
    serializer = ProductImageSerializer(seller_image ,many=True).data
    return Response(serializer)

    


   


   
@api_view(['GET','POST'])
def SellerWiseOrder(request ): 


    if request.data['flag'] == "Cancle":
        order_details = Order_Details.objects.get(id=request.data['id'])
        product  = Product.objects.get(id=order_details.product.id)
        product.totalqty += order_details.qty
        product.save()
        

    if request.data['flag'] != None:
        Order_Details.objects.filter(id=request.data['id']).update(order_status=request.data['flag'])

    seller = Seller_Profile.objects.get(id=1)
    order = Order.objects.get(id=int(request.data['orderId']))


    

    if len(request.data['status']) == 0 :   
        order_with_order_Details = Order_Details.objects.filter(seller=seller).filter(order_no=order)
    else:
        order_with_order_Details = Order_Details.objects.filter(seller=seller).filter(order_no=order).filter(Q(order_status__in=request.data['status']))

    serializer  = OrderDetailSerializer(order_with_order_Details , many=True).data

    return Response(serializer)





   
@api_view(['GET','POST'])
def OrderStatusUpdate(request ,id ): 

    Order_Details.objects.filter(id=id).update(order_status=request.data)
    seller = Seller_Profile.objects.get(id=1)
    order = Order.objects.get(id=48)       
    order_with_order_Details = Order_Details.objects.filter(seller=seller).filter(order_no=order)       
    serializer  = OrderDetailSerializer(order_with_order_Details , many=True).data
    return Response(serializer)








   
@api_view(['GET','POST'])
def SellerOrderId(request ): 

    order = Order.objects.filter(seller_id_array__contains=[1]) 
    serializer  = OrderSerailizer(order , many=True).data
    return Response(serializer)





   
@api_view(['GET','POST'])
def OrderStatusLength(request ):   

    order_details = Order_Details.objects.filter(seller=1)  
    serializer  = OrderDetailSerializer(order_details , many=True).data

    return Response(serializer)




















    

@api_view(['GET','POST'])
def OrderInfo(request  , id): 


    order = Order.objects.get(id=id)

    serializer  = OrderSerailizer(order , many=False).data

    return Response(serializer)

    
    