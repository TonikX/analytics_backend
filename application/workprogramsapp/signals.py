from django.contrib.auth.models import Group
from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver

from dataprocessing.models import User
from workprogramsapp.expertise.models import UserExpertise, Expertise, ExpertiseComments
from workprogramsapp.models import WorkProgram, WorkProgramInFieldOfStudy, Zun, WorkProgramIdStrUpForIsu
from workprogramsapp.notifications.models import ExpertiseNotification, NotificationComments


def populate_models(sender, **kwargs):
    list_of_groups = ["rpd_developer", "education_plan_developer", "op_leader", "roles_and_professions_master",
                      "student", "expertise_master", "academic_plan_developer", "external_user"]
    for group in list_of_groups:
        Group.objects.get_or_create(name=group)


@receiver(post_save, sender=UserExpertise)
def create_profile(sender, instance, created, **kwargs):
    """Create a matching profile whenever a user object is created."""
    if created:
        wp_exp = WorkProgram.objects.get(expertise_with_rpd=instance.expertise)
        ExpertiseNotification.objects.create(expertise=instance.expertise, user=instance.expert,
                                             message=f'Вы добавлены в экспертизу для рабочей программы "{wp_exp.title}"')


@receiver(post_save, sender=Expertise)
def expertise_notificator(sender, instance, created, **kwargs):
    """Create a matching profile whenever a user object is created and updated."""
    wp_exp = WorkProgram.objects.get(expertise_with_rpd=instance)
    struct_users = User.objects.filter(user_for_structural_unit__status__in=["leader", "deputy"],
                                       user_for_structural_unit__structural_unit__workprogram_in_structural_unit__expertise_with_rpd=instance).distinct()
    for user in struct_users:
        ExpertiseNotification.objects.create(expertise=instance, user=user,
                                             message=f'Экспертиза для рабочей программы "{wp_exp.title}" поменяла свой статус на "{instance.get_expertise_status_display()}"')
    if instance.expertise_status == 'WK':
        wp_exp = WorkProgram.objects.get(expertise_with_rpd=instance)
        users = User.objects.filter(expertse_in_rpd__expertise__work_program=wp_exp).distinct()
        for user in users:
            ExpertiseNotification.objects.create(expertise=instance, user=user,
                                                 message=f'Рабочую программу "{wp_exp.title}" вернули на доработку (Статус: "{instance.get_expertise_status_display()}")')


@receiver(post_save, sender=ExpertiseComments)
def comment_notificator(sender, instance, created, **kwargs):
    wp_exp = WorkProgram.objects.get(expertise_with_rpd__expertse_users_in_rpd__user_expertise_comment=instance)
    user_sender = User.objects.get(expertse_in_rpd__user_expertise_comment=instance)
    for editor in User.objects.filter(editors=wp_exp):
        if editor != user_sender:
            NotificationComments.objects.create(comment_new=instance, user=editor,
                                                message=f'В экспертизе для рабочей программы "{wp_exp.title}" в блоке "{instance.get_comment_block_display()}"был оставлен комментарий "{instance.comment_text}"')
    for user in User.objects.filter(expertse_in_rpd__expertise__work_program=wp_exp, expertse_in_rpd__stuff_status="EX",
                                    expertse_in_rpd__user_expertise_comment__comment_block=instance.comment_block).distinct():
        if user != user_sender:
            NotificationComments.objects.create(comment_new=instance, user=user,
                                                message=f'В экспертизе для рабочей программы "{wp_exp.title}" в блоке "{instance.get_comment_block_display()}"был оставлен комментарий "{instance.comment_text}"')


@receiver(pre_delete, sender=WorkProgramInFieldOfStudy)
def zun_saver(sender, instance, using, **kwargs):
    wp_in_fs_id_strs = WorkProgramIdStrUpForIsu.objects.filter(work_program_in_field_of_study = instance.id)
    for wp_in_fs_id_str in wp_in_fs_id_strs:
        for wp_in_fs in WorkProgramInFieldOfStudy.objects.filter(zuns_for_wp = wp_in_fs_id_str):
            for zun in Zun.objects.filter(wp_in_fs = wp_in_fs):
                print(wp_in_fs_id_str.id_str_up)
                zun.wp_in_fs_saved_fk_id_str_up = wp_in_fs_id_str.id_str_up
                zun.save()
