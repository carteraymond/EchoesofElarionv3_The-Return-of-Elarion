from django.shortcuts import render
from .data import LORE_ENTRIES
from campaign.progression import get_level


def home(request):
    player_name = request.session.get("player_name", "Adventurer")
    xp = request.session.get("xp", 0)
    explored_lore = request.session.get("explored_lore", [])
    level = request.session.get("level",1)

    selected_topic = request.GET.get("topic")
    selected_lore = None
    xp_gained = False
    level_up = False

    if selected_topic in LORE_ENTRIES:
        selected_lore = LORE_ENTRIES[selected_topic]
        # Only award XP the first time a player discovers this topic.
        if selected_topic not in explored_lore:
            explored_lore.append(selected_topic)
            request.session["explored_lore"] = explored_lore

            old_level = request.session.get("level",1)

            xp += 1
            new_level = get_level(xp)
            request.session["xp"] = xp
            request.session["level"] = new_level
            level = new_level
            
        
            xp_gained = True
            level_up = new_level > old_level

    context = {
        "player_name": player_name,
        "xp": xp,
        "lore_entries": LORE_ENTRIES,
        "selected_lore": selected_lore,
        "xp_gained": xp_gained,
        "level": level,
        "level_up": level_up,
    }

    return render(request, "lore/home.html", context)