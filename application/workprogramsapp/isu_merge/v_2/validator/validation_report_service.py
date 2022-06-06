from .validation_report_base import ValidationReportBase
import os

class ValidationReportService:
  def __init__(self):
      self.specializationReport = None
      self.formatReport = None
      self.blocksReport = None
      self.hoursReport = None
      self.ognpReport = None
      if not os.path.exists('report'):
          os.mkdir('report')

  def createISUOldPlansReports(self):
      self.ognpReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала"))
      self.hoursReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала", "Количество часов ожидаемое", "Количество часов реальное"))
      self.blocksReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала", "Количество блоков"))
      self.formatReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала"))
      self.specializationReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала"))

  def createISUNewPlansReports(self):
      self.hoursReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала",
                                               "Количество часов ожидаемое", "Количество часов реальное"))
      self.blocksReport = ValidationReportBase(
          ("ИД", "Название Образовательной Программы", "Год начала", "Количество блоков"))
      self.formatReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала"))

  def createConstructorPlansReports(self):
      self.ognpReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала"))
      self.hoursReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала",
                                               "Количество часов ожидаемое", "Количество часов реальное"))
      self.formatReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала"))
      self.specializationReport = ValidationReportBase(("ИД", "Название Образовательной Программы", "Год начала"))

  def appendToOgnpReport(self, row):
      self.ognpReport.append(row)

  def appendToHoursReport(self, row):
      self.hoursReport.append(row)

  def appendToBlocksReport(self, row):
      self.blocksReport.append(row)

  def appendToFormatReport(self, row):
      self.formatReport.append(row)

  def appendToSpecializationReport(self, row):
      self.specializationReport.append(row)

  def saveISUOldPlansReports(self):
      self.ognpReport.save("report/result_ognp.xlsx")
      self.blocksReport.save("report/result_block.xlsx")
      self.hoursReport.save("report/result_hours.xlsx")
      self.specializationReport.save("report/result_specialization.xlsx")
      self.formatReport.save("report/result_discipline_format.xlsx")

  def saveISUNewPlansReports(self):
      self.blocksReport.save("report/result_block.xlsx")
      self.hoursReport.save("report/result_hours.xlsx")
      self.formatReport.save("report/result_discipline_format.xlsx")