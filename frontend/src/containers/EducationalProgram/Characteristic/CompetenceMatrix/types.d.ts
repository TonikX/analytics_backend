interface Discipline {
    name: string;
    modules_in_discipline_block: DisciplineModule[]
}

interface CompetenceMatrix {
    wp_matrix: AcademicPlan[];
    pk_competences: Array;
    key_competences: KeyCompetence[];
    general_prof_competences: ProfCompetence[];
    over_prof_competences: Array;
}

enum DISCIPLINE_MODULE_TYPE {
    universal_module = 'universal_module',
    universal_fundamental_module = 'universal_fundamental_module',
    physical_culture = 'physical_culture',
    philosophy_thinking = 'philosophy_thinking',
    digital_culture = 'digital_culture',
    entrepreneurial_culture = 'entrepreneurial_culture',
    soft_skills = 'soft_skills',
    ognp = 'ognp',
    natural_science_module = 'natural_science_module',
    general_professional_module = 'general_professional_module',
    elective_module = 'elective_module',
    interdisciplinary_module_of_the_faculty = 'interdisciplinary_module_of_the_faculty',
    faculty_module = 'faculty_module',
    math_module = 'math_module',
    digital_culture_in_professional_activities = 'digital_culture_in_professional_activities',
    specialization_module = 'specialization_module',
    gia = 'gia',
    practice = 'practice',
    optional_disciplines = 'optional_disciplines',
    profile_professional_module = 'profile_professional_module',
    f_ognp = 'f_ognp'
}

enum CHANGE_TYPE {
    REQUIRED = 'Required',
    OPTIONALLY = 'Optionally',
    OGNP_SET = 'OGNP_set',
    SET_SPECIALIZATION = 'Set_specialization',
    FACULTATIV = 'Facultativ',
    OPT_SPECIALIZATION = 'Opt_specialization',
    LANG = 'Lang',
    MODULE = 'Module',
}

interface DisciplineModule {
    name: string;
    type: typeof DISCIPLINE_MODULE_TYPE;
    change_blocks_of_work_programs_in_modules: WorkProgramChangeInDisciplineBlockModule[]
}

interface Competences {
    competences: any[]
}

interface ModuleWorkProgram {
    id: number;
    title: string;
    competences: Competences
}

interface WorkProgramChangeInDisciplineBlockModule {
    change_type: typeof CHANGE_TYPE;
    credit_units: string;
    work_program: ModuleWorkProgram[]
}

interface AcademicPlan {
    academic_plan: string;
    discipline_blocks_in_academic_plan: Discipline[]
}

interface CompetenceInGroupOfKeyCompetences {
    id: number;
    indicator_of_competence_in_group_of_key_competences: Array;
    competence: Competence;
}

interface CompetenceInGroupOfGeneralProfCompetences {
    id: number;
    indicator_of_competence_in_group_of_general_prof_competences: Array;
    competence: Competence;
}

interface CompetenceInGroupOfOverProfCompetences {
    id: number;
    indicator_of_competence_in_group_of_over_prof_competences: Array;
    competence: Competence;
}

interface Competence {
    id: number;
    number: string;
    name: string;
}

interface KeyCompetence {
    id: null;
    name: string;
    competence_in_group_of_key_competences: CompetenceInGroupOfKeyCompetences[]
}

interface ProfCompetence {
    id: null;
    name: string;
    competence_in_group_of_general_prof_competences: CompetenceInGroupOfGeneralProfCompetences[]
}

interface OverProfCompetence {
    id: null;
    name: string;
    competence_in_group_of_over_prof_competences: CompetenceInGroupOfOverProfCompetences[]
}
