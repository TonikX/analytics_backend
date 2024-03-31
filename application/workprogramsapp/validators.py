import os

from django.core.exceptions import ValidationError


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = [
        ".application",
        ".bat",
        ".cmd",
        ".com",
        ".cpl",
        ".docm",
        ".dotm",
        ".exe",
        ".gadget",
        ".hta",
        ".inf",
        ".jar",
        ".jse",
        ".lnk",
        ".msc",
        ".msh",
        ".msh1",
        ".msh1xml",
        ".msh2",
        ".msh2xml",
        ".mshxml",
        ".msi",
        ".pif",
        ".potm",
        ".ppam",
        ".ppsm",
        ".pptm",
        ".ps1",
        ".ps1xml",
        ".ps2",
        ".ps2xml",
        ".psc1",
        ".scf",
        ".scr",
        ".sldm",
        ".vb",
        ".vbe",
        ".vbs",
        ".ws",
        ".wsc",
        ".wsf",
        ".wsh",
        ".xlam",
        ".xlsm",
        ".xltm",
        "js",
        "msp",
        "psc2",
        "reg",
    ]
    if ext.lower() in valid_extensions:
        raise ValidationError("Unsupported file extension.")
    MAX_FILE_SIZE = 10485760
    print(value.name)
    if value.size > MAX_FILE_SIZE:
        print(value.size)
        raise ValidationError("File size too big!")
