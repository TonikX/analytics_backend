def get_permissions_gia_practice(instance, exp, user_exp, request):
    return_dict = {}
    return_dict["can_edit"] = bool(
        request.user in instance.editors.all() and exp.expertise_status == "WK") if exp else bool(
        request.user in instance.editors.all())
    return_dict["expertise_status"] = exp.expertise_status if exp else None
    return_dict["use_chat_with_id_expertise"] = exp.id if exp else None
    return_dict["can_comment"] = bool(exp.expertise_status in ["EX", "WK", "RE"]) and bool(
        user_exp) if exp else None
    return_dict["can_approve"] = bool(
        user_exp.stuff_status == "EX" and exp.expertise_status == "EX") if user_exp else None
    return_dict["your_approve_status"] = user_exp.user_expertise_status if user_exp else None
    return return_dict
