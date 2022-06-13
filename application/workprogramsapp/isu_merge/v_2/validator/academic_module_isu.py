class AcademicModuleISU:
  def __init__(self, id, name, parent_id, rules, params_rules, sort, language_id, language_code):
    self.id = id
    self.name = name
    self.parent_id = parent_id
    self.rules = rules
    self.params_rules = params_rules
    self.sort = sort
    self.language_id = language_id
    self.language_code = language_code

class AcademicModuleRuleISU:
  def __init__(self, id, name, language_id, language_code):
    self.id = id
    self.name = name
    self.language_id = language_id
    self.language_code = language_code