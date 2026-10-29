from django.shortcuts import render

def world_map(request):
    return render(request, "worldmap/map.html")