import os
import uuid
from django.utils.deconstruct import deconstructible
from django.utils.text import slugify
from io import BytesIO
from PIL import Image 
from django.core.files import File
import random

def compress(image):
    im = Image.open(image)
    im_io = BytesIO()
    im.save(im_io, 'JPEG', quality=60)
    new_image = File(im_io, name=image.name)
    return new_image


def delete_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.photo.delete(save=False)
    except:
        pass


def update_save_image(sender, instance, *args, **kwargs):

    try:
        old_img = instance.__class__.objects.get(id=instance.id).photo.path
        try:
            new_img = instance.photo.path
        except:
            new_img = None
        if new_img != old_img:
            import os
            if os.path.exists(old_img):
                os.remove(old_img)
    except:
        pass




@deconstructible
class RandomFileName(object):
    def __init__(self, path):
        self.path = os.path.join(path, "%s%s")

    def __call__(self, _, filename):
        # @note It's up to the validators to check if it's the correct file type in name or if one even exist.
        extension = os.path.splitext(filename)[1]
        return self.path % (uuid.uuid4(), extension)






def unique_slug_geneator(instance , new_slug=None):
    if new_slug is not None:
        slug = new_slug
        return slug
    else:
        slug = slugify(instance.title)
        product = instance.__class__

        slug_exists = product.objects.filter(slug=slug).exists()
        print(slug_exists)

        if slug_exists:
            update_slug = slugify(instance.title)
            return unique_slug_geneator(instance , new_slug=update_slug)
    return slug


def slug_generator(sender , instance , *args , **kwargs ):
    if not instance.slug or instance.slug :
        instance.slug = unique_slug_geneator(instance)


def sku_generator(sender , instance , *args , **kwargs ):
    if not instance.sku:
        instance.sku = str(random.randint(1,10000))+ "_BD-" + str(random.randint(1,1000000))


def order_no_generate():
    return "007"  + str(random.randint(1,50000000))
