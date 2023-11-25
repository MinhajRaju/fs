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



def float_to_init(number):
    if type(number) == float:
        chunk_size = number + 0.5
        return int(round(chunk_size))
    else :
        return int(number)
    

def split_list(input_list, chunk_size):
    split_list = []
    for i in range(0, len(input_list), chunk_size):
        print(i)
        split_list.append(input_list[i:i + chunk_size])
    return split_list


def test(data ,  orderinstance , sellerid):
    print("Data from view sfile" , data  , orderinstance)
        
    p = []
    for i in range(len(data)):
        

        for j in range(data[i]['pqty']):

            p.append({
                'product': data[i]['product'],
                 'order_no':orderinstance,
                 'seller':  data[i]['seller'],
                 'variation_id': data[i]['variationid'],
                 'customer':orderinstance.customer.id,
                 'shipping':orderinstance.shipping.id,                 
                 'qty':1,

                 
                 
            })
    q = []
    for i in sellerid:    

    # Filter based on the 'seller' key
        desired_seller = i  # Change this value to the desired seller ID
        filtered_data = q.append([item for item in p if item.get('seller') == desired_seller])
    q


    
    
   
    for z in q:

        print("lenz" , len(z) , 'selller' , z[0]['seller'])
               
        trackingid = []



   
        for i in range(2):
            trackinginstance = Tracking.objects.create(
                order = orderinstance,
                seller = Seller_Profile.objects.get(id =z[0]['seller'])  

        )
            trackingid.append(Tracking.objects.get(id=trackinginstance.id))
        
        print("trackingid" , len(trackingid))

        chunk_size = len(z)/ len(trackingid)

        chunk_size = float_to_init(chunk_size)
        print("chunk size" , chunk_size)
        split_z_array = split_list(z,chunk_size)

        print("leno fo spizlie array"  , len(split_z_array))

      
        
        for o in range(len(split_z_array)):

            for k in split_z_array[o]:
                pass
                k["tracking"] = trackingid[o]

        for i in range(len(split_z_array)):

            for k in split_z_array[i]:

                Tracking_Details.objects.create(
                    
                    product = Product.objects.get(id=k['product']),
                    order_no=k['order_no'],
                    seller=  Seller_Profile.objects.get(id=k['seller']),
                    variation_id= k['variation_id']  if k['variation_id'] == None else Product_Variation.objects.get(id=k['variation_id']),
                    customer =Customer_Profile.objects.get(id=k['customer']),
                    shipping = shippingAddress.objects.get(id=k['shipping']),                 
                    qty=k['qty'],
                    tracking=k['tracking']

                )
                
   
        

