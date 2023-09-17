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








@api_view(['GET'])
def categoryNestedView(request):
    c = Category.objects.all()
    serializer = CategoryNestedSerializer(c , many=True).data
    return Response(serializer)



@api_view(['GET'])
def TopCategoryView(request , number):
    c = Category.objects.filter(parent__isnull=True)
    print(c)
    c = list(c)
    print(c)
    hitcounter = []
    for i in c:
        hitcounter.append(i.hitcount)

    print(hitcounter)

    largenumberlist = []
    for y in range(number):
        largenumberlist.append(max(hitcounter))
        hitcounter.remove(max(hitcounter))


    product = []
    for q in largenumberlist:
         p  = Category.objects.get(hitcount=q)
         product.append(p)


    serializer = CategoryNestedSerializer( product, many=True).data
    return Response(serializer)
