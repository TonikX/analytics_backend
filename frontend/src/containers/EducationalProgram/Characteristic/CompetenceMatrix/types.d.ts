import {EducationalPlanType} from "../../../EducationalPlan/types";
import {DirectionType} from "../../../Direction/types";

type AttachIndicatorProps = {
    workProgramId?: number;
    practiceId?: number;
    competence?: {
        value: number;
        label: string;
    };
};

type TableContentProps = {
    attachIndicator: (props: AttachIndicatorProps) => void;
    setIndicators: (indicators : {label: string, value: number}[]) => void;
    keyCompetences: Competence[];
    generalProfCompetences: Competence[];
    profCompetences: Competence[];
    overProfCompetences: Competence[];
};

type CompetencesRowProps = {
    keyCompetences: Competence[];
    generalProfCompetences: Competence[];
    profCompetences: Competence[];
    overProfCompetences: Competence[];
}

type CompetencesHeaderProps = {
    competences: Competence[];
}

type ContentByAcademicPlanProps = {
    academicPlan: AcademicPlan;
} & TableContentProps;

interface Discipline {
    name: string;
    modules_in_discipline_block: DisciplineModule[]
}

interface CompetenceMatrix {
    educational_program: EducationalProgram[];
    wp_matrix: AcademicPlan[];
    pk_competences: ProfCompetence[];
    key_competences: KeyCompetence[];
    general_prof_competences: GeneralProfCompetence[];
    over_prof_competences: OverProfCompetence[];
}

type CommonCompetence = KeyCompetence | GeneralProfCompetence | OverProfCompetence | ProfCompetence;

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
    type: string;
    change_blocks_of_work_programs_in_modules: WorkProgramChangeInDisciplineBlockModule[];
    childs?: DisciplineModule[];
}

interface EducationalProgram {
    id: number;
    academic_plan: EducationalPlanType;
    year: number;
    qualification: string;
    title: string;
    field_of_study: Array<DirectionType>;
}

interface Competences {
    competences: Competence[]
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
    practice?: ModuleWorkProgram[];
    gia?: ModuleWorkProgram[];
}

interface AcademicPlan {
    academic_plan: string;
    discipline_blocks_in_academic_plan: Discipline[]
}

interface ProfCompetence {
    id: number;
    indicator_of_competence_in_group_of_prof_competences: Array;
    competence: Competence;
}

interface KeyCompetence {
    id: number;
    indicator_of_competence_in_group_of_key_competences: Array;
    competence: Competence;
}

interface OverProfCompetence {
    id: number;
    indicator_of_competence_in_group_of_over_prof_competences: Array;
    competence: Competence;
}

interface GeneralProfCompetence {
    id: number;
    indicator_of_competence_in_group_of_general_prof_competences: Array;
    competence: Competence;
}

interface OverProfCompetence {
    id: number;
    indicator_of_competence_in_group_of_over_prof_competences: Array;
    competence: Competence;
}

interface Competence {
    id: number;
    number: string;
    name: string;
    zuns: Zun[]
}

interface Zun {
    id: number;
    knowledge: string;
    skills: string;
    attainments: string;
    indicator: {
        id: number;
        number: string;
        name: string;
        competence: number;
    };
    wp_in_fs: number;
}
