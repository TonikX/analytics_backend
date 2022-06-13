from openpyxl import Workbook

class ValidationReportBase:
  def __init__(self, headers):
      self.headers = headers
      self.workbook = Workbook()
      self.sheet = self.workbook.active
      self.sheet.append(headers)
      self.sheet = self.sheet

  def append(self, row):
      self.sheet.append(row)

  def save(self, file_name):
      self.workbook.save(filename=file_name)