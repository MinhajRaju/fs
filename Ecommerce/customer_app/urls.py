from django.urls import path
from customer_app import views


urlpatterns = [

    path('' , views.All  , name='All'),
    path('customerlogin/' , views.MyTokenObtainPairView.as_view()  , name='Login'),
    path('register/' , views.RegisterCustomer  , name='CreateCustomer'),
  


    path('update/' , views.UpadateCustomer  , name='UpadateCustomer'),
    path('read/<str:pk>/' , views.ReadCustomer  , name='ReadCustomer'),
    path('delete/<str:pk>/' , views.DeleteCustomer  , name='DeleteCustomer'),
    path('bulkdelete/' , views.BulkDeleteCustomer  , name='BulkDeleteCustomer'),



]