export enum workProgramSectionFields {
    ID = 'id',
    NAME = 'name',
    SPO = 'SRO',
    CONSULTATIONS = 'consultations',
    CONTACT_WORK = 'contact_work',
    LECTURE_CLASSES = 'lecture_classes',
    PRACTICAL_LESSONS = 'practical_lessons',
    ZE_V_SEM = 'ze_v_sem',
    LABORATORY = 'laboratory',
    TOTAL_HOURS = 'total_hours',
    EVALUATION_TOOLS = 'evaluation_tools'
}

export const EVALUATION_TOOLS = [{
    value: 1,
    label: 'Экзамен'
}, {
    value: 2,
    label: 'Дифференцированный зачет'
}, {
    value: 3,
    label: 'Зачет'
}, {
    value: 4,
    label: 'Курсовая работа'
}, {
    value: 5,
    label: 'Курсовой проект'
}];

