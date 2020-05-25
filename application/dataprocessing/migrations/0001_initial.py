from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('patronymic', models.CharField(blank=True, max_length=1024, null=True)),
                ('isu_number', models.CharField(blank=True, max_length=1024, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Domain',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200, verbose_name='Название')),
                ('user', models.ManyToManyField(related_name='domain_user', to=settings.AUTH_USER_MODEL, verbose_name='Пользователи')),
            ],
        ),
        migrations.CreateModel(
            name='Items',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200, verbose_name='Название')),
                ('value', models.IntegerField(blank=True, default=0, null=True, verbose_name='Значение')),
                ('source', models.CharField(blank=True, max_length=200, verbose_name='Источник')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Автор', to=settings.AUTH_USER_MODEL, verbose_name='Пользователи')),
                ('domain', models.ForeignKey(blank=True, help_text='Укажите область', null=True, on_delete=django.db.models.deletion.CASCADE, to='dataprocessing.Domain', verbose_name='Область знаний')),
            ],
        ),
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField(blank=True, default=0, null=True, verbose_name='Повторения')),
            ],
        ),
        migrations.CreateModel(
            name='Relation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('relation', models.CharField(choices=[('0', 'неопределенное'), ('1', 'включает в себя'), ('2', 'является частью одного раздела'), ('4', 'имеет пререквизит'), ('5', 'тождество'), ('7', 'отсутствует')], default='1', max_length=10, verbose_name='Связь')),
                ('item1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='item1', to='dataprocessing.Items', verbose_name='Элемент РПД')),
                ('item2', models.ManyToManyField(related_name='item2', through='dataprocessing.Connection', to='dataprocessing.Items', verbose_name='Элемент РПД')),
            ],
            options={
                'verbose_name_plural': 'Связи между учебными сущностями',
            },
        ),
        migrations.AddField(
            model_name='connection',
            name='items',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='item', to='dataprocessing.Items', verbose_name='Учебная сущность'),
        ),
        migrations.AddField(
            model_name='connection',
            name='relation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dataprocessing.Relation', verbose_name='Связь'),
        ),
    ]