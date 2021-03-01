def skill_sorter(skills_frontend):
    skills_frontend=dict(skills_frontend)
    key_skills = []
    additional_skills = []
    for key, value in skills_frontend.items():
        if value / 306 > 0.01:
            if value / 306 > 0.2:
                key_skills.append(key)
            else:
                additional_skills.append(key)
    return key_skills, additional_skills
