import os
import shutil


def remove_mixins(file):
    file_buff = file[: file.find(".py")] + "-mixin_copy.py"
    shutil.copy(file, file_buff)
    newlines = []
    with open(file_buff, encoding="utf-8", mode="r+") as read_file:
        lines = [line.rstrip() for line in read_file]
        for line in lines:
            if "class" in line and "CloneMixin" in line:
                line = line.replace("CloneMixin,", "")
            newlines.append(line + "\n")
    with open(file, encoding="utf-8", mode="w") as edit_file:
        for line in newlines:
            edit_file.write(line)
    print("DjangoClone was deactivated")


def restore_mixins(file):
    file_buff = file[: file.find(".py")] + "-mixin_copy.py"
    os.remove(file)
    os.rename(file_buff, file)
    print("DjangoClone was activated")


if __name__ == "__main__":
    file_name = "workprogramsapp/models.py"
    remove_mixins(file_name)
    os.system("python manage.py makemigrations workprogramsapp")
    restore_mixins(file_name)
