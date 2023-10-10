def skill_sorter(skills_frontend, num_of_prof):
    skills_frontend=dict(skills_frontend)
    key_skills = []
    additional_skills = []
    for key, value in skills_frontend.items():
        if value / num_of_prof > 0.01:
            if value / num_of_prof > 0.2:
                key_skills.append(key)
            else:
                additional_skills.append(key)
    return key_skills, additional_skills
