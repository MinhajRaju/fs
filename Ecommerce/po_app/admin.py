from django.contrib import admin
from po_app.models import *
# Register your models here.

admin.site.register(Product)
admin.site.register(Product_Variation)
admin.site.register(Product_Image)

admin.site.register(shippingAddress)
admin.site.register(Order)
admin.site.register(Order_Details)
admin.site.register(Services)
admin.site.register(Tracking)
admin.site.register(Tracking_Details)

