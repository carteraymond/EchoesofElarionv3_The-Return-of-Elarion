LEVELS = {
    1: {
        "xp_required": 0,
        "name": "Beginning the Journey",
        "unlock": None,
    },
    2: {
        "xp_required": 5,
        "name": "Path of History",
        "unlock": "history",
    },
}


def get_level(xp):
    level = 1

    for level_number, level_data in LEVELS.items():
        if xp >= level_data["xp_required"]:
            level = level_number

    return level