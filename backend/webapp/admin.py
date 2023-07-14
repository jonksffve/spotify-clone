from django.contrib import admin
from .models import SongFile, SongLike

# Register your models here.
admin.site.register(SongFile)
admin.site.register(SongLike)
