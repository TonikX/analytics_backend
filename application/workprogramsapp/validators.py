import os

from django.core.exceptions import ValidationError


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = [".exe", ".pif", ".application", ".gadget", ".msi",
                        "msp", ".com", ".scr", ".hta", ".cpl", ".msc", ".jar", ".bat", ".cmd", ".vb", ".vbs", ".vbe",
                        "js", ".jse", ".ws", ".wsf", ".wsc", ".wsh", ".ps1", ".ps1xml", ".ps2", ".ps2xml", ".psc1",
                        "psc2", ".msh", ".msh1", ".msh2", ".mshxml", ".msh1xml", ".msh2xml", ".scf", ".lnk", ".inf",
                        "reg", ".docm", ".dotm", ".xlsm", ".xltm", ".xlam", ".pptm", ".potm", ".ppam", ".ppsm", ".sldm"]
    if ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')
    MAX_FILE_SIZE = 10485760
    print(value.name)
    if value.size > MAX_FILE_SIZE:
        print(value.size)
        raise ValidationError("File size too big!")
