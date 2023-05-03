from django.contrib.auth.models import Group
from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver

from dataprocessing.itmo_backends import isu_client_credentials_request
from dataprocessing.models import User
from gia_practice_app.GIA.models import GIA
from gia_practice_app.Practice.models import Practice
from workprogramsapp.expertise.models import UserExpertise, Expertise, ExpertiseComments
from workprogramsapp.models import WorkProgram, WorkProgramInFieldOfStudy, Zun, WorkProgramIdStrUpForIsu, AcademicPlan, \
    ImplementationAcademicPlan
from workprogramsapp.notifications.emails.send_mail import mail_sender
from workprogramsapp.notifications.models import ExpertiseNotification, NotificationComments, \
    AcademicPlanUpdateNotification


def populate_models(sender, **kwargs):
    list_of_groups = ["rpd_developer", "education_plan_developer", "op_leader", "roles_and_professions_master",
                      "student", "expertise_master", "academic_plan_developer", "external_user", "blockmodule_editor",
                      "items_editor"]
    for group in list_of_groups:
        Group.objects.get_or_create(name=group)


@receiver(post_save, sender=UserExpertise)
def create_profile(sender, instance, created, **kwargs):
    """Create a matching profile whenever a user object is created."""
    if created:
        expertise = Expertise.objects.get(expertse_users_in_rpd=instance)
        if expertise.expertise_type == "WP" or not expertise.expertise_type:
            name_of_object = "рабочей программы"
            wp_exp = WorkProgram.objects.get(expertise_with_rpd__expertse_users_in_rpd=instance)
        elif expertise.expertise_type == "GIA":
            name_of_object = "ГИА"
            wp_exp = GIA.objects.get(expertise_with_gia__expertse_users_in_rpd=instance)
        elif expertise.expertise_type == "PRAC":
            name_of_object = "Практики"
            wp_exp = Practice.objects.get(expertise_with_practice__expertse_users_in_rpd=instance)
        ExpertiseNotification.objects.create(expertise=instance.expertise, user=instance.expert,
                                             message=f'Вы добавлены в экспертизу для {name_of_object} "{wp_exp.title}"')


@receiver(post_save, sender=Expertise)
def expertise_notificator(sender, instance, created, **kwargs):
    """Create a matching profile whenever a user object is created and updated."""
    if instance.expertise_type == "WP" or not instance.expertise_type:
        name_of_object = "рабочей программы"
        wp_exp = WorkProgram.objects.get(expertise_with_rpd=instance)
        struct_users = User.objects.filter(user_for_structural_unit__status__in=["leader", "deputy"],
                                           user_for_structural_unit__structural_unit__workprogram_in_structural_unit__expertise_with_rpd=instance).distinct()
        users = User.objects.filter(expertse_in_rpd__expertise__work_program=wp_exp).distinct()
    elif instance.expertise_type == "GIA":
        name_of_object = "ГИА"
        wp_exp = GIA.objects.get(expertise_with_gia=instance)
        struct_users = User.objects.filter(user_for_structural_unit__status__in=["leader", "deputy"],
                                           user_for_structural_unit__structural_unit__gia_in_structural_unit__expertise_with_gia=instance).distinct()
        users = User.objects.filter(expertse_in_rpd__expertise__gia=wp_exp).distinct()
    elif instance.expertise_type == "PRAC":
        name_of_object = "Практики"
        wp_exp = Practice.objects.get(expertise_with_practice=instance)
        struct_users = User.objects.filter(user_for_structural_unit__status__in=["leader", "deputy"],
                                           user_for_structural_unit__structural_unit__practice_in_structural_unit__expertise_with_practice=instance).distinct()
        users = User.objects.filter(expertse_in_rpd__expertise__practice=wp_exp).distinct()
    else:
        struct_users = []
        name_of_object = "Оферты"
        wp_exp = WorkProgram.objects.get(expertise_with_rpd=instance)

    if not struct_users:
        ExpertiseNotification.objects.create(expertise=instance, user=None,
                                             message=f'Экспертиза для {name_of_object} "{wp_exp.title}" поменяла свой статус на "{instance.get_expertise_status_display()}"')
    for user in struct_users:
        ExpertiseNotification.objects.create(expertise=instance, user=user,
                                             message=f'Экспертиза для {name_of_object} "{wp_exp.title}" поменяла свой статус на "{instance.get_expertise_status_display()}"')

    if instance.expertise_status == 'RE' or instance.expertise_status == 'AC':

        user_to_send = users.filter(expertise_status_notification=True, do_email_notifications=True)
        user_email = [user.email for user in user_to_send]
        mail_sender(topic=f'Экспертиза для {name_of_object} "{wp_exp.title}" поменяла свой статус.',
                    text=f'Экспертиза для {name_of_object} "{wp_exp.title}" поменяла свой статус на "{instance.get_expertise_status_display()}"\n https://op.itmo.ru/work-program/{wp_exp.id}',
                    emails=user_email, users=user_to_send)

        for user in users:
            ExpertiseNotification.objects.create(expertise=instance, user=user,
                                                 message=f'Экспертиза для {name_of_object} "{wp_exp.title}" поменяла свой статус на "{instance.get_expertise_status_display()}')

    if instance.expertise_status == 'AC':
        read_notifications_array = [False, False, False, False, False, False, False, False]
        wp_exp.read_notifications = str(read_notifications_array).replace('[', '').replace(']', '')
        wp_exp.save()


    # isu_client_credentials_request('https://dev.disc.itmo.su/api/v1/disciplines/:disc_id?status={status}&url=https://op.itmo.ru/work-program/{wp_id}'.format(status=instance.expertise_status, wp_id=wp_exp.id))

    isu_client_credentials_request(
        'https://disc.itmo.su/api/v1/disciplines/{disc_id}?status={status}&url=https://op.itmo.ru/work-program/{wp_id}'.format(
            disc_id=wp_exp.discipline_code, status=instance.get_expertise_status_display(), wp_id=wp_exp.id))


@receiver(post_save, sender=ExpertiseComments)
def comment_notificator(sender, instance, created, **kwargs):
    wp_exp = WorkProgram.objects.get(expertise_with_rpd__expertse_users_in_rpd__user_expertise_comment=instance)
    user_sender = User.objects.get(expertse_in_rpd__user_expertise_comment=instance)

    user_to_send = User.objects.filter(editors=wp_exp, expertise_comments_notification=True,
                                       do_email_notifications=True)
    user_to_send = user_to_send.exclude(id=user_sender.id)
    user_email = [user.email for user in user_to_send]
    mail_sender(topic=f'В экспертизе для рабочей программы "{wp_exp.title}" был оставлен новый комментарий',
                text=f'В экспертизе для рабочей программы "{wp_exp.title}" (https://op.itmo.ru/work-program/{wp_exp.id}) в блоке "{instance.get_comment_block_display()}" был оставлен комментарий: "{instance.comment_text}"',
                emails=user_email, users=user_to_send)

    for editor in User.objects.filter(editors=wp_exp):
        if editor != user_sender:
            NotificationComments.objects.create(comment_new=instance, user=editor,
                                                message=f'В экспертизе для рабочей программы "{wp_exp.title}" в блоке "{instance.get_comment_block_display()}"был оставлен комментарий "{instance.comment_text}"')
    for user in User.objects.filter(expertse_in_rpd__expertise__work_program=wp_exp, expertse_in_rpd__stuff_status="EX",
                                    expertse_in_rpd__user_expertise_comment__comment_block=instance.comment_block).distinct():
        if user != user_sender:
            NotificationComments.objects.create(comment_new=instance, user=user,
                                                message=f'В экспертизе для рабочей программы "{wp_exp.title}" в блоке "{instance.get_comment_block_display()}" был оставлен комментарий "{instance.comment_text}"')

    read_notifications_array = [True if str(x) == 'True' else False for x in wp_exp.read_notifications.split(', ')]
    if instance.comment_block == 'MA':
        read_notifications_array[0] = True
    elif instance.comment_block == 'PR':
        read_notifications_array[1] = True
    elif instance.comment_block == 'SE':
        read_notifications_array[2] = True
    elif instance.comment_block == 'TH':
        read_notifications_array[3] = True
    elif instance.comment_block == 'SO':
        read_notifications_array[4] = True
    elif instance.comment_block == 'EV':
        read_notifications_array[5] = True
    elif instance.comment_block == 'CO':
        read_notifications_array[6] = True
    elif instance.comment_block == 'RE':
        read_notifications_array[7] = True

    wp_exp.read_notifications = str(read_notifications_array).replace('[', '').replace(']', '')
    wp_exp.save()


@receiver(pre_delete, sender=WorkProgramInFieldOfStudy)
def zun_saver(sender, instance, using, **kwargs):
    wp_in_fs_id_strs = WorkProgramIdStrUpForIsu.objects.filter(work_program_in_field_of_study=instance.id)
    for wp_in_fs_id_str in wp_in_fs_id_strs:
        for wp_in_fs in WorkProgramInFieldOfStudy.objects.filter(zuns_for_wp=wp_in_fs_id_str):
            for zun in Zun.objects.filter(wp_in_fs=wp_in_fs):
                print(wp_in_fs_id_str.id_str_up)
                zun.wp_in_fs_saved_fk_id_str_up = wp_in_fs_id_str.id_str_up
                zun.save()


@receiver(pre_save, sender=AcademicPlan)
def check_previous_mode(sender, instance, *args, **kwargs):
    original_status = None
    if instance.id:
        original_status = AcademicPlan.objects.get(pk=instance.id).on_check

    if instance.on_check != original_status and original_status in ["in_work", "on_check"]:
        status = "instance.on_check"
        if instance.on_check == "in_work":
            status = "В работе"
        elif instance.on_check == "on_check":
            status = "На экспертизе"
        elif instance.on_check == "verified":
            status = "Одобрено"
        imp = ImplementationAcademicPlan.objects.filter(academic_plan__id=instance.id)[0]
        users = User.objects.filter(
            implementation_academic_plan_block_modules__academic_plan__id=instance.id).distinct()
        for user in users:
            AcademicPlanUpdateNotification.objects.create(academic_plan=instance, user=user,
                                                          message=f'Учебный план "{imp.title}" поменял свой статус на '
                                                                  f'"{status}"')
        user_to_send = users.filter(expertise_status_notification=True, do_email_notifications=True)
        user_email = [user.email for user in user_to_send]
        mail_sender(topic=f'Учебный план "{imp.title}" поменял свой статус.',
                    text=f'Учебный план "{imp.title}" поменял свой статус на "{status}"\n https://op.itmo.ru/educational-plans/{instance.id}',
                    emails=user_email, users=user_to_send)
