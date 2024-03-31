def skill_sorter(skills_frontend: dict, num_of_prof: int) -> tuple[list, list]:
    skills_frontend = dict(skills_frontend)
    key_skills = []
    additional_skills = []
    for key, value in skills_frontend.items():
        if float(value) / num_of_prof > 0.01:
            if float(value) / num_of_prof > 0.2:
                key_skills.append(key)
            else:
                additional_skills.append(key)
    return key_skills, additional_skills
