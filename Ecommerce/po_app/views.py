from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User

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
import random












#All Product 
@api_view(['GET','POST'])
def All(request):
    product = Product.objects.all()
    serializer = ProductSerializer(product , many=True).data
    return Response(serializer)




#Single Product
@api_view(['GET','POST'])
def SingleProduct(request , slug):
    product = Product.objects.get(slug=slug)
    serializer = ProductSerializer(product , many=False).data
    return Response(serializer)



#All Images
@api_view(['GET','POST'])
def Image(request):
    product = Product_Image.objects.all()
    serializer = ProductImageSerializer(product , many=True).data
    return Response(serializer)








@api_view(['GET','POST'])
def Create(request):

    data = request.data
    sellerinstance = Seller_Profile.objects.get(id=2)

    variation = [{"id":2,"color":"red","qty":12,"size":"50","product":5,"product_image_id":[16,17,18]},
                 {"id":3,"color":"red","qty":30,"size":"50","product":5,"product_image_id":[19,20,21]}]

    sumofqty = [v['qty'] for i  , v in enumerate(variation)]


    porductimg = [{"imgid":[16,20,21]}]

    productinstance = Product.objects.create(
        seller  = sellerinstance,
        title = data['title'],
        totalqty = sumofqty
    )


    for i in porductimg[0]['imgid']:
        Product_Image.objects.filter(id=i).update(product=productinstance)







    ramdomnum = random.randint(1,100000)
    for i , value in enumerate(variation):

        number  =  ramdomnum + i
        skunumber = str(productinstance.id) +"_BD-"+str(number)
        productvaritaioninstance = Product_Variation.objects.create(
            product = productinstance,
            color = value['color'],
            qty = value['qty'],
            size = value['size'],
            sku = skunumber,
        )

        for  i in value['product_image_id']:
            Product_Image.objects.filter(id=i).update(variation=productvaritaioninstance)


    product = Product.objects.all()
    serializer = ProductSerializer(product , many=True).data
    return Response(serializer)






@api_view(['GET','POST'])
def FlashSale(request):

    flashsale = Product.objects.filter(flashsale=True)
    serializer   = ProductSerializer(flashsale , many=True).data
    return Response(serializer)







@api_view(['GET','POST'])
def Update(request):

    data = request.data

    variation = [{"id":44,"color":"red","qty":12,"size":"50","product":5,"product_image_id":[19,20,21]},
                 {"id":45,"color":"adfasfd","qty":30,"size":"50","product":5,"product_image_id":[16,17,18]}]



    sumofqty = [v['qty'] for i  , v in enumerate(variation)]

    Product.objects.filter(id=29).update(

        title = data['title'],
        totalqty = sumofqty
    )


    for i , value in enumerate(variation):
        id  = value['id']

        Product_Variation.objects.filter(id=id).update(
            color = value['color'],
            qty = value['qty'],
            size = value['size'],

        )

        for  i in value['product_image_id']:
            Product_Image.objects.filter(id=i).update(variation=id)




    product = Product.objects.all()
    serializer = ProductSerializer(product , many=True).data
    return Response(serializer)




@api_view(['GET','POST'])
def RemoveImage(request):

    idarray = [21,20]

    for i in idarray:
        Product_Image.objects.filter(id=i).delete()

    return Response()

@api_view(['GET','POST'])
def OrderItemSave(request):
    data = request.data

    cartitem = data['cartItems']

    customerinstance = Customer_Profile.objects.get(id=3)
    shippingAddressinstance = shippingAddress.objects.get(id=2)


    x = [i['seller'] for i in cartitem]
    sellerid  = set(x)




    orderInstance = Order.objects.create(
        customer = customerinstance,
        shipping = shippingAddressinstance,
        
        status = "Hold",
        payment_status = "paid"
    )



        #lambda argument(s) : expression


    for i in sellerid:
        x = filter(lambda cart: cart['seller'] == i , cartitem)
        itemlist = list(x)
        sellerinstance  = Seller_Profile.objects.get(id=i)

        for j in itemlist:

            product = Product.objects.get(id=j['product'])
            if j['variationid'] != None:
                variation = Product_Variation.objects.get(id=j['variationid'])
            else:
                variation = j['variationid']

            Order_Details.objects.create(
                product = product,
                order_no = orderInstance,
                seller = sellerinstance,
                variation_id = variation,
                qty = j['pqty']


            )



    return Response()

import random 

@api_view(['GET'])
def SameStore(request , id):



    product = random.sample(list(Product.objects.filter(seller=id)) , 2)
    print(product)
    

    serializer = ProductSerializer(product , many=True).data
    return Response(serializer)





@api_view(['GET','POST'])
def RelatedItem(request ,slug):
    product = Product.objects.get(slug=slug)
    print(product.categories)
    categories_wise = random.sample(product.categories , 1)
    print(categories_wise)
    product = Product.objects.filter(categories__contains=categories_wise)
    print(product)
    serializer = ProductSerializer(product , many=True).data
    return Response(serializer)



@api_view(['GET','POST'])
def CategoryRelatedItem(request ,category  , **kwargs):
    num_of_product = kwargs.get('num_product')
    fprice  =kwargs.get('fprice')
    category_id = Category.objects.get(name=category)

    if fprice == 'L2H':
        product = Product.objects.filter(categories__contains=[category_id.id]).order_by('price')[0:num_of_product]
    elif fprice =='H2L':
        product = Product.objects.filter(categories__contains=[category_id.id]).order_by('-price')[0:num_of_product]
    else:
        product = Product.objects.filter(categories__contains=[category_id.id])[0:num_of_product]  
 
  
    serializer = ProductSerializer(product , many=True).data
    return Response(serializer  )



@api_view(['GET','POST'])
def CatTotal(request ,category  , **kwargs):
    category_id = Category.objects.get(name=category)
    product = Product.objects.filter(categories__contains=[category_id.id]) 
    l = len(product)
    print(l)
    return Response({'totalproduct':l})




@api_view(['GET','POST'])
def CatRelatedBrand(request ,category  , **kwargs):
    category_id = Category.objects.get(name=category)
    brand = Brand.objects.filter(category=category_id) 
    
    serializer = BrandSerializer(brand , many=True).data
    
    return Response(serializer)



@api_view(['GET','POST'])
def FilterRelatedItem(request , **kwargs):
    fprice  =kwargs.get('fprice')
    print(request.data)
    category_id = Category.objects.get(name=request.data['CatId']) 




    if fprice== 'L2H':
        product = Product.objects.filter(categories__contains=[category_id.id]).filter(Q(price__range=(request.data['Min'] ,request.data['Max'])) | Q(rating__in=request.data['RatingArray']) | Q(brand__in=request.data['BrandIdArray'])).order_by('price')
     
    elif fprice == 'H2L':
        product = Product.objects.filter(categories__contains=[category_id.id]).filter(Q(price__range=(request.data['Min'] ,request.data['Max'])) | Q(rating__in=request.data['RatingArray']) | Q(brand__in=request.data['BrandIdArray'])).order_by('-price')
     
    else:
        product = Product.objects.filter(categories__contains=[category_id.id]).filter(Q(price__range=(request.data['Min'] ,request.data['Max'])) | Q(rating__in=request.data['RatingArray']) | Q(brand__in=request.data['BrandIdArray']))
   



    serializer = ProductSerializer(product , many=True).data  
    
    return Response(serializer)






















@api_view(['GET' , 'POST'])
def DetailsOrder(request):

    order = Order.objects.all()
    serializer = OrderSerailizer(order, many=True).data
    return Response(serializer)

@api_view(['GET' , 'POST'])
def DashProduct(request , *args , **kwargs):

    num_of_product = kwargs.get('num_product')
    product = Product.objects.all()[0:num_of_product]
    print(product)
    serializer =  ProductSerializer(product , many=True).data
    return Response(serializer)



@api_view(['GET' , 'PSOT'])
def ShippingAddress(request , userid):
    customer = Customer_Profile.objects.get(id=userid)
    shippingaddress = shippingAddress.objects.filter(customer = customer)
    print(shippingaddress)

    serializers  = ShippingAdressSerializer(shippingaddress , many=True).data

    return Response(serializers)




