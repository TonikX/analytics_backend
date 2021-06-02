from rest_framework import permissions

from workprogramsapp.expertise.models import UserExpertise
from workprogramsapp.folders_ans_statistic.models import Folder, WorkProgramInFolder, \
    AcademicPlanInFolder, DisciplineBlockModuleInFolder, IndividualImplementationAcademicPlanInFolder
from workprogramsapp.workprogram_additions.models import UserStructuralUnit


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_superuser:
            return True

        try:
            return request.user in obj.editors.all()
        except:
            pass

        return obj.owner == request.user


class IsRpdDeveloperOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_superuser:
            return True
        return request.user.groups.filter(name="rpd_developer")


class IsEducationPlanDeveloper(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="education_plan_developer")


class IsOpLeader(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="op_leader")


class IsRolesAndProfessionsMaster(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="roles_and_professions_master")


class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="student")


class IsAcademicPlanDeveloper(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="academic_plan_developer")


class IsExpertiseMaster(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name="expertise_master"):
            return True
        if 'pk' in dict(view.kwargs):
            return (UserExpertise.objects.filter(
                        expertise__work_program__structural_unit__user_in_structural_unit__user=request.user,
                        expertise__work_program__structural_unit__user_in_structural_unit__status__in=["leader",
                                                                                                       "deputy"],
                        expertise=view.kwargs['pk']))
        return UserStructuralUnit.objects.filter(user=request.user, status__in=["leader", "deputy"])


class IsMemberOfExpertise(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name="expertise_master"):
            return True
        if 'pk' in dict(view.kwargs):
            return (UserExpertise.objects.filter(expert=request.user, expertise=view.kwargs['pk']) or
                    UserExpertise.objects.filter(
                        expertise__work_program__structural_unit__user_in_structural_unit__user=request.user,
                        expertise__work_program__structural_unit__user_in_structural_unit__status__in=["leader",
                                                                                                       "deputy"],
                        expertise=view.kwargs['pk']))
        else:
            return (UserExpertise.objects.filter(expert=request.user) or
                    UserStructuralUnit.objects.filter(user=request.user, status__in=["leader", "deputy"]))


class IsWorkProgramMemberOfExpertise(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name="expertise_master"):
            return True
        if 'pk' in dict(view.kwargs):
            return UserExpertise.objects.filter(expert=request.user, expertise__work_program=view.kwargs['pk'])
        else:
            return UserExpertise.objects.filter(expert=request.user)


class IsMemberOfUserExpertise(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name="expertise_master"):
            return True
        if 'pk' in dict(view.kwargs):
            return (UserExpertise.objects.filter(expert=request.user, pk=view.kwargs['pk']) or
                    UserExpertise.objects.filter(
                        expertise__work_program__structural_unit__user_in_structural_unit__user=request.user,
                        expertise__work_program__structural_unit__user_in_structural_unit__status__in=["leader",
                                                                                                       "deputy"],
                        pk=view.kwargs['pk']))
        else:
            return (UserExpertise.objects.filter(expert=request.user) or
                    UserStructuralUnit.objects.filter(user=request.user, status__in=["leader", "deputy"]))


class IsOwnerOfFolder(permissions.BasePermission):
    def has_permission(self, request, view):
        if 'pk' in dict(view.kwargs):
            return Folder.objects.filter(owner=request.user, pk=view.kwargs['pk'])


class IsOwnerOfFolderWithWorkProgramm(permissions.BasePermission):
    def has_permission(self, request, view):
        if 'pk' in dict(view.kwargs):
            return WorkProgramInFolder.objects.filter(pk=view.kwargs['pk'], folder__owner=request.user)
        try:
            return Folder.objects.filter(owner=request.user, pk=request.data['folder'])
        except KeyError:
            return True


class IsOwnerOfFolderWithAcademicPlan(permissions.BasePermission):
    def has_permission(self, request, view):
        if 'pk' in dict(view.kwargs):
            return AcademicPlanInFolder.objects.filter(pk=view.kwargs['pk'], folder__owner=request.user)
        try:
            return Folder.objects.filter(owner=request.user, pk=request.data['folder'])
        except KeyError:
            return True


class IsOwnerOfFolderWithIndividualImplementationAcademicPlan(permissions.BasePermission):
    def has_permission(self, request, view):
        if 'pk' in dict(view.kwargs):
            return IndividualImplementationAcademicPlanInFolder.objects.filter(pk=view.kwargs['pk'],
                                                                               folder__owner=request.user)
        try:
            return Folder.objects.filter(owner=request.user, pk=request.data['folder'])
        except KeyError:
            return True


class IsOwnerOfFolderWithDisciplineBlockModule(permissions.BasePermission):
    def has_permission(self, request, view):
        if 'pk' in dict(view.kwargs):
            return DisciplineBlockModuleInFolder.objects.filter(pk=view.kwargs['pk'], folder__owner=request.user)
        try:
            return Folder.objects.filter(owner=request.user, pk=request.data['folder'])
        except KeyError:
            return True
