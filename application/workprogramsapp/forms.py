from django import forms

from .models import WorkProgram, OutcomesOfWorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, EvaluationTool, DisciplineSection, Topic, FieldOfStudyWorkProgram

class FieldOfStudyWorkProgram(forms.ModelForm):
    class Meta:
        model = FieldOfStudyWorkProgram
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  
        self.fields['field_of_study'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    
        self.fields['work_program'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    
        self.fields['competence'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    

class WorkProgramOutcomesPrerequisites(forms.ModelForm):
    
    class Meta:
        model = WorkProgram
        fields = ('id', 'title', 'hoursFirstSemester', 'hoursSecondSemester', 'prerequisites', 'outcomes' )
        #fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  
        self.fields['prerequisites'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    
        self.fields['outcomes'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    


class PrerequisitesOfWorkProgramForm(forms.ModelForm):

    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  
        self.fields['workprogram'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    
        self.fields['masterylevel'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    

    

class OutcomesOfWorkProgramForm(forms.ModelForm):

    class Meta:
        model = OutcomesOfWorkProgram
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  
        self.fields['workprogram'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    
        self.fields['masterylevel'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    


class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()


class EvaluationToolForm(forms.ModelForm):

    class Meta:
        model = EvaluationTool
        fields = '__all__'

class DisciplineSectionForm(forms.ModelForm):

    class Meta:
        model = DisciplineSection
        fields = '__all__'
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  
        self.fields['work_program'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    
        self.fields['evaluation_tools'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    


class TopicForm(forms.ModelForm):

    class Meta:
        model = Topic
        fields = '__all__'
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  
        self.fields['discipline_section'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    

        

