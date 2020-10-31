from rest_framework import permissions

from workprogramsapp.expertise.models import UserExpertise


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user


class IsRpdDeveloperOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.groups.filter(name="rpd_developer")


class isEducationPlanDeveloper(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="education_plan_developer")


class isOpLeader(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="op_leader")


class isRolesAndProfessionsMaster(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="roles_and_professions_master")


class isStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="student")


class IsExpertiseMaster(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="expertise_master")


class IsMemberOfExpertise(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_expertise_master:
            return True
        if 'pk' in dict(view.kwargs):
            return UserExpertise.objects.filter(expert=request.user, expertise=view.kwargs['pk'])
        else:
            return UserExpertise.objects.filter(expert=request.user)


class IsWorkProgramMemberOfExpertise(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_expertise_master:
            return True
        if 'pk' in dict(view.kwargs):
            return UserExpertise.objects.filter(expert=request.user, expertise__work_program=view.kwargs['pk'])
        else:
            return UserExpertise.objects.filter(expert=request.user)


class IsMemberOfUserExpertise(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_expertise_master:
            return True
        if 'pk' in dict(view.kwargs):
            return UserExpertise.objects.filter(expert=request.user, pk=view.kwargs['pk'])
        else:
            return UserExpertise.objects.filter(expert=request.user)
