from django.urls import path
from . import views

urlpatterns = [
    path("", views.world_map, name="world_map"),
]