from django.urls import path
from customer_app import views


urlpatterns = [

    path('' , views.All  , name='All'),
    path('create/' , views.CreateCustomer  , name='CreateCustomer'),
    path('update/' , views.UpadateCustomer  , name='UpadateCustomer'),
    path('read/<str:pk>/' , views.ReadCustomer  , name='ReadCustomer'),
    path('delete/<str:pk>/' , views.DeleteCustomer  , name='DeleteCustomer'),
    path('bulkdelete/' , views.BulkDeleteCustomer  , name='BulkDeleteCustomer'),



]