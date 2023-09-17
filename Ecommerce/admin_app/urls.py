from django.urls import path
from admin_app import views


urlpatterns = [

    path('category/' , views.categoryNestedView  , name='All'),
    path('topcategory/<int:number>/' , views.TopCategoryView  , name='All')


]