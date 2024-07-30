from rest_framework import permissions

from workprogramsapp.expertise.models import UserExpertise, Expertise
from workprogramsapp.folders_ans_statistic.models import Folder, WorkProgramInFolder, \
    AcademicPlanInFolder, DisciplineBlockModuleInFolder, IndividualImplementationAcademicPlanInFolder
from workprogramsapp.settings_singleton.models import BlockSettings
from workprogramsapp.workprogram_additions.models import UserStructuralUnit
from workprogramsapp.models import DisciplineBlockModule
from dataprocessing.models import User


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


class IsOwnerOrDodWorkerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.groups.filter(name="expertise_master"):
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


class IsExternalUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="external_user")


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


class IsExpertiseMasterStrict(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name="expertise_master"):
            return True


class IsExpertiseMaster(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name="expertise_master"):
            return True
        if 'pk' in dict(view.kwargs):
            return (Expertise.objects.filter(
                work_program__structural_unit__user_in_structural_unit__user=request.user,
                work_program__structural_unit__user_in_structural_unit__status__in=["leader",
                                                                                    "deputy"],
                expertse_users_in_rpd=view.kwargs['pk']))
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
                        expertise=view.kwargs['pk']) or
                    UserExpertise.objects.filter(
                        expertise__practice__structural_unit__user_in_structural_unit__user=request.user,
                        expertise__practice__structural_unit__user_in_structural_unit__status__in=["leader",
                                                                                                   "deputy"],
                        expertise=view.kwargs['pk']) or
                    UserExpertise.objects.filter(
                        expertise__gia__structural_unit__user_in_structural_unit__user=request.user,
                        expertise__gia__structural_unit__user_in_structural_unit__status__in=["leader",
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
                        pk=view.kwargs['pk']) or
                    UserExpertise.objects.filter(
                        expertise__practice__structural_unit__user_in_structural_unit__user=request.user,
                        expertise__practice__structural_unit__user_in_structural_unit__status__in=["leader",
                                                                                                   "deputy"],
                        expertise=view.kwargs['pk']) or
                    UserExpertise.objects.filter(
                        expertise__gia__structural_unit__user_in_structural_unit__user=request.user,
                        expertise__gia__structural_unit__user_in_structural_unit__status__in=["leader",
                                                                                              "deputy"],
                        expertise=view.kwargs['pk']))
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


class IsDisciplineBlockModuleEditor(permissions.BasePermission):
    @staticmethod
    def check_access(module_id: int, user: User) -> bool:
        return DisciplineBlockModule.objects.filter(pk=module_id, editors=user).exists() or user.is_expertise_master


class IsBlockModuleEditor(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        if request.method in ('GET', 'HEAD', 'OPTIONS', "POST", 'PATCH') and request.user.groups.filter(
                name="blockmodule_editor"):
            return True
        return request.user in obj.editors.all()


class IsWPBlocked(permissions.BasePermission):
    def has_permission(self, request, view):
        return not BlockSettings.get_singleton().is_wp_blocked


class IsGIABlocked(permissions.BasePermission):
    def has_permission(self, request, view):
        return not BlockSettings.get_singleton().is_gia_blocked


class IsPracticeBlocked(permissions.BasePermission):
    def has_permission(self, request, view):
        return not BlockSettings.get_singleton().is_gia_blocked


class IsUniversalModule(permissions.BasePermission):

    @staticmethod
    def check_access(module_id: int, user: User) -> bool:
        module = DisciplineBlockModule.objects.get(pk=module_id)
        if user.is_superuser:
            return True
        if module.type == "universal_module" and user not in module.editors.all():
            return False
        else:
            return True

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        # Для удаления модулей
        if request.method == "DELETE" and view.__class__.__name__ == "DisciplineBlockModuleDestroyView":
            module = DisciplineBlockModule.objects.get(pk=view.kwargs['pk'])
            if module.type == "universal_module" and request.user not in module.editors.all():
                return False

        # Для удаления модулей из УП
        if request.method == "DELETE"  and view.__class__.__name__ == "WorkWithBlocksApiView":
            module_id = request.query_params.get('module')
            module = DisciplineBlockModule.objects.get(id=module_id)
            if module.type == "universal_module" and not request.user.groups.filter(name="expertise_master"):
                return False
        # Для добавления модулей в УП
        if request.data.get("module") and request.method == "POST" and view.__class__.__name__ == "WorkWithBlocksApiView":
            for module_id in request.data.get("module"):
                module = DisciplineBlockModule.objects.get(id=module_id)
                if module.type == "universal_module" and not request.user.groups.filter(name="expertise_master"):
                    return False
        # Для копирования модулей
        if request.data.get("module_id") and request.method == "POST":
            module_id = request.data.get('module_id')
            module = DisciplineBlockModule.objects.get(id=module_id)
            if module.type == "universal_module" and not request.user.groups.filter(name="expertise_master"):
                return False
        # Для Обновления модулей
        if view.kwargs.get("pk") and request.method == "PATCH":
            module_id = view.kwargs.get("pk")
            module = DisciplineBlockModule.objects.get(id=module_id)
            if module.type == "universal_module" and not request.user.groups.filter(name="expertise_master"):
                return False

        return True
