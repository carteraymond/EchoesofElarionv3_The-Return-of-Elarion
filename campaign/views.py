from django.shortcuts import render,redirect

# Create your views here.

def home(request):
    # Redirect new players to the welcome page before showing the campaign.
    if "player_name" not in request.session:
        return redirect("welcome")
    
    player_name = request.session.get("player_name", "Adventurer")
    xp = request.session.get("xp", 0)
    level = request.session.get("level",1)


    context = {
        "campaign_name": "Echoes of Elarion",
        "player_name": player_name,
        "xp": xp,
        "level":level
    }

    return render(request, "campaign/home.html",context)
#This runs only if the player has reached level 2, which is the requirement to access the history page. If they haven't reached level 2, they will be redirected to the home page.
def history(request):
    # Temporarily removed level restriction, will look into a better implementation later. For now, the player can access the history page regardless of their level.

    level = request.session.get("level",1)

    # if level < 2:
    #     return redirect("home")

    player_name = request.session.get("player_name", "Adventurer")
    xp = request.session.get("xp", 0)

    context = {
        "player_name": player_name,
        "xp":xp,
        "level":level,

    }
    return render(request, "campaign/history.html", context)
#currently no direct link to this page, but it is the first page the player will see when they start the game. It will ask for their name and set their initial stats. Will use Javascript to make the name input field more interactive and fun later.
def welcome(request):
    if request.method == "POST":
        name = request.POST.get("name")
    # Store the new player's starting information in their session.
        request.session["player_name"] = name
        request.session["xp"] = 0
        request.session["level"] = 1
        request.session["explored_lore"] = []
        

        return redirect("home")

    return render(request, "campaign/welcome.html")