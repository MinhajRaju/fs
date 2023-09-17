from django.urls import path
from po_app import views


urlpatterns = [

    path('' , views.All  , name='All'),
    path('singleproduct/<str:slug>/' , views.SingleProduct  , name='All'),
    path('create/' , views.Create  , name='Create'),
    path('removeimg/' , views.RemoveImage, name='RemoveImage'),
    path('update/' , views.Update  , name='Upadate'),
    path('image/' , views.Image  , name='Upadate'),
    path('flashsale/', views.FlashSale , name='FlashSale'),
    path('dashproduct/<int:num_product>/', views.DashProduct , name='FlashSale'),



    path('orderitemsave/' , views.OrderItemSave  , name='OrderItemSave'),
    
    path('shippingaddress/<int:userid>/' , views.ShippingAddress  , name='Upadate'),



    
    path('samestore/<int:id>/' ,  views.SameStore , name='SameStore'),
    path('relateditem/<str:slug>/' ,  views.RelatedItem , name='RelatedItem'),
    path('cateogryrelateditem/<str:category>/<int:num_product>/<str:fprice>/' ,  views.CategoryRelatedItem , name='RelatedItem'),
    path('categorytotal/<str:category>/' ,  views.CatTotal , name='RelatedItem'),

    path('brand/<str:category>/' , views.CatRelatedBrand , name="CatRelatedBrand"),

    path('filter/' ,  views.FilterRelatedItem , name='FilterRelatedItem'),





]


