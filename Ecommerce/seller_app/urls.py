from django.urls import path
from seller_app import views


urlpatterns = [


    path('' , views.All  , name='All'),
    path('create/' , views.CreateSeller  , name='CreateSeller'),
    path('update/' , views.UpadateSeller  , name='UpadateSeller'),
    path('read/<str:pk>/' , views.ReadSeller  , name='ReadSeller'),
    path('delete/<str:pk>/' , views.DeleteSeller  , name='DeleteSeller'),
    path('bulkdelete/' , views.BulkDeleteSeller  , name='BulkDeleteSeller'),


    path('sellerproduct/' , views.SerllerProduct , name='SerllerProduct'),
    
    path('bulkaction/' , views.BulkAction , name="BulkAction"),
        
    path('media/' , views.Media , name="BulkAction"),
    path('mediaupload/' , views.MediaUpload , name="MediaUpload"),

    path('bulkmediaremove/' , views.RemoveMultiple , name="RemoveMultiple"),

    path('sellerwiseorder/' , views.SellerWiseOrder , name="RemoveMultiple"),
    path('sellerorderid/' , views.SellerOrderId , name="SellerOrderId"),
    path('orderinfo/<int:id>' , views.OrderInfo , name="OrderInfo"),
    path('orderstatus/<int:id>' , views.OrderStatusUpdate , name="OrderInfo"),


    path('statuslength/',  views.OrderStatusLength , name="OrderStatusLength"),
    
    path('fetchfolderdetails/',  views.FolderDetails , name="OrderStatusLength"),
    path('fetchimage/',  views.FolderImage , name="OrderStatusLength")

]