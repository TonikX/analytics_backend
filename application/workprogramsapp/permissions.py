from rest_framework import permissions

from workprogramsapp.expertise.models import Expertise, UserExpertise


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

        return request.user.is_rpd_developer == True


class IsMemberOfExpertise(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'PUT' or request.method == 'PATCH':
            return UserExpertise.objects.filter(expert=request.user)
        else:
            if 'pk' in dict(view.kwargs):
                return UserExpertise.objects.filter(expert=request.user, expertise=view.kwargs['pk'])
            else:
                return UserExpertise.objects.filter(expert=request.user)

