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
    
    path('bulkaction/' , views.BulkAction , name="BulkAction")


]