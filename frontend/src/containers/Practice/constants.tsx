import {
    Languages,
    PracticeFields,
    PracticeFormats,
    PracticeKinds, PracticeSteps,
    PracticeTypes,
    PracticeWays,
    Qualifications
} from "./enum";
import GeneralInfo from "./Steps/GeneralInfo";
import GeneralProvisions from "./Steps/GeneralProvisions";
import Structure from "./Steps/Structure";
import ReportingMaterials from "./Steps/ReportingMaterials";
import DisabledPeopleInfo from "./Steps/DisabledPeopleInfo";
import Assessment from "./Steps/Assessment";
import Literature from "./Steps/Literature";
import Prerequisites from "./Steps/Prerequisites";
import PlansAndDirections from "./Steps/PlansAndDirections";
import React from "react";
import Competences from "./Steps/Competences";
import Results from "./Steps/Results";

export const LANGUAGES = [
    {
        value: Languages.RUSSIAN,
        label: 'Русский',
    },
    {
        value: Languages.ENGLISH,
        label: 'Английский',
    },
    {
        value: Languages.KAZAKH,
        label: 'Казахский',
    },
    {
        value: Languages.GERMAN,
        label: 'Немецкий',
    },
    {
        value: Languages.RUSSIAN_ENGLISH,
        label: 'Русский/Английский',
    },
];

export const QUALIFICATIONS = [
    {
        value: Qualifications.PRIMARY_VOCATIONAL_EDUCATION,
        label: 'Начальное профессиональное образование',
    },
    {
        value: Qualifications.SECONDARY_VOCATIONAL_EDUCATION,
        label: 'Среднее профессиональное образование',
    },
    {
        value: Qualifications.BACHELOR,
        label: 'Бакалавриат',
    },
    {
        value: Qualifications.SPECIALIST,
        label: 'Специалитет',
    },
    {
        value: Qualifications.MASTER,
        label: 'Магистратура',
    },
    {
        value: Qualifications.ALL_LEVELS,
        label: 'Все уровни',
    },
];

export const PRACTICE_KINDS  = [
    {
        value: PracticeKinds.EDUCATIONAL,
        label: 'Образовательная',
    },
    {
        value: PracticeKinds.PRODUCTION,
        label: 'Производственная',
    }
];

export const PRACTICE_TYPES = [
    {
        value: PracticeTypes.INTRO,
        label: 'ознакомительная',
    },
    {
        value: PracticeTypes.STD_INTRO,
        label: 'учебно-ознакомительная',
    },
    {
        value: PracticeTypes.TECH,
        label: 'технологическая',
    },
    {
        value: PracticeTypes.CONSTR,
        label: 'конструкторская',
    },
    {
        value: PracticeTypes.SCI_RES,
        label: 'научно-исследовательская',
    },
    {
        value: PracticeTypes.SCI_RES_WORK,
        label: 'научно-исследовательская работа',
    },
    {
        value: PracticeTypes.CONS_EXP,
        label: 'консультативно-экспертная',
    },
    {
        value: PracticeTypes.RES_INTER,
        label: 'научно-исследовательская работа / Research Internship',
    },
    {
        value: PracticeTypes.ORG_CONTR,
        label: 'организационно-управленческая',
    },
    {
        value: PracticeTypes.SCI_PED,
        label: 'научно-педагогическая',
    },
    {
        value: PracticeTypes.EXP_RES,
        label: 'экспериментально-исследовательская работа',
    },
    {
        value: PracticeTypes.PROJ_CONSTR,
        label: 'проектно-конструкторская',
    },
    {
        value: PracticeTypes.TECH_PROJ_INTER,
        label: 'проектно конструкторская / Tech Project Internship',
    },

    {
        value: PracticeTypes.PROD_TECH,
        label: 'производственно-технологическая',
    },
    {
        value: PracticeTypes.IND_TECH,
        label: 'технологическая (проектно-технологическая) / Industrial and tech Internship',
    },
    {
        value: PracticeTypes.TEH_PROJ_TECH_INTET,
        label: 'технологическая (проектно-технологическая)/ Tech Project Internship',
    },
    {
        value: PracticeTypes.TECH_PROJ_TECH,
        label: 'технологическая (проектно-технологическая)',
    },
    {
        value: PracticeTypes.SENIOR_INTER,
        label: 'преддипломная',
    },
    {
        value: PracticeTypes.SENIOR_INTER_ENG,
        label: 'преддипломная / Senior internship',
    },
    {
        value: PracticeTypes.EXPL,
        label: 'эксплуатационная',
    },
    {
        value: PracticeTypes.INTER,
        label: 'стажировка',
    },
]

export const PRACTICE_WAYS = [
    {
        value: PracticeWays.STATIONARY,
        label: 'Стационарная'
    },
    {
        value: PracticeWays.EXTERNAL,
        label: 'Выездная'
    },
    {
        value: PracticeWays.STATIONARY_EXTERNAL,
        label: 'Стационарная или выездная'
    },
];

export const PRACTICE_FORMATS = [
    {
        value: PracticeFormats.DEDICATED,
        label: 'Выделенная',
    },
    {
        value: PracticeFormats.DISPERSED,
        label: 'Рассредоточенная',
    },
];

export const RussianPracticeFields = {
    [PracticeFields.ID]: 'ID',
    [PracticeFields.PRACTICE_BASE]: 'ID шаблона',
    [PracticeFields.DISCIPLINE_CODE]: 'Код дисциплины',
    [PracticeFields.TITLE]: 'Название',
    [PracticeFields.YEAR]: 'Год проведения',
    [PracticeFields.AUTHORS]: 'Авторский состав',
    [PracticeFields.OP_LEADER]: 'Руководитель образовательной программы',
    [PracticeFields.LANGUAGE]: 'Язык реализации',
    [PracticeFields.QUALIFICATION]: 'Уровень образования',
    [PracticeFields.KIND_OF_PRACTICE]: 'Вид практики',
    [PracticeFields.TYPE_OF_PRACTICE]: 'Тип практики',
    [PracticeFields.WAY_OF_DOING_PRACTICE]: 'Способ прохождения практики',
    [PracticeFields.FORMAT_PRACTICE]: 'Формат прохождения практики',
    [PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP]: 'Особенности прохождения практики',
    [PracticeFields.FEATURES_INTERNSHIP]: 'Особенности содержания практики',
    [PracticeFields.ADDITIONAL_REPORTING_MATERIALS]: 'Дополнительные отчетные материалы',
    [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: 'Форма аттестации',
    [PracticeFields.PASSED_GREAT_MARK]: 'Критерий оценки "отлично"',
    [PracticeFields.PASSED_GOOD_MARK]: 'Критерий оценки "хорошо"',
    [PracticeFields.PASSED_SATISFACTORILY_MARK]: 'Критерий оценки "удовлетворительно"',
    [PracticeFields.NOT_PASSED_MARK]: 'Критерий оценки "неудовлетворительно"',
    [PracticeFields.STRUCTURAL_UNIT]: 'Структурное подразделение',
    [PracticeFields.BIBLIOGRAPHIC_REFERENCE]: 'Источники',
    [PracticeFields.EDITORS]: 'Редакторы',
    [PracticeFields.PERMISSIONS_INFO]: 'Информация о правах',
    [PracticeFields.SEMESTER_COUNT]: 'Длительность в семестрах',
    [PracticeFields.ZE_V_SEM]: 'Зачетные единицы',
    [PracticeFields.EVALUATION_TOOLS]: 'Аттестационное оценочное средство',
    [PracticeFields.PRAC_ISU_ID]: 'ID практики в ИСУ',
    [PracticeFields.PREREQUISITES]: 'Пререквизиты',
    [PracticeFields.COMPETENCES]: 'Компетенции',
    [PracticeFields.OUTCOMES]: 'Результаты',
    [PracticeFields.PLANS]: 'Учебные планы и направления',
};

export const fieldToStep = new Map(Object.entries({
    [PracticeFields.ID]: PracticeSteps.GENERAL,
    [PracticeFields.PRACTICE_BASE]: PracticeSteps.GENERAL,
    [PracticeFields.DISCIPLINE_CODE]: PracticeSteps.GENERAL,
    [PracticeFields.TITLE]: PracticeSteps.GENERAL,
    [PracticeFields.YEAR]: PracticeSteps.GENERAL,
    [PracticeFields.AUTHORS]: PracticeSteps.GENERAL,
    [PracticeFields.OP_LEADER]: PracticeSteps.GENERAL,
    [PracticeFields.LANGUAGE]: PracticeSteps.GENERAL,
    [PracticeFields.QUALIFICATION]: PracticeSteps.GENERAL,
    [PracticeFields.KIND_OF_PRACTICE]: PracticeSteps.GENERAL,
    [PracticeFields.TYPE_OF_PRACTICE]: PracticeSteps.GENERAL,
    [PracticeFields.WAY_OF_DOING_PRACTICE]: PracticeSteps.GENERAL,
    [PracticeFields.FORMAT_PRACTICE]: PracticeSteps.GENERAL,
    [PracticeFields.STRUCTURAL_UNIT]: PracticeSteps.GENERAL,
    [PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP]: PracticeSteps.GENERAL_PROVISIONS,
    [PracticeFields.FEATURES_INTERNSHIP]: PracticeSteps.STRUCTURE,
    [PracticeFields.ADDITIONAL_REPORTING_MATERIALS]: PracticeSteps.REPORTING_MATERIALS,
    [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: PracticeSteps.EVALUATION_METHODS,
    [PracticeFields.PASSED_GREAT_MARK]: PracticeSteps.EVALUATION_METHODS,
    [PracticeFields.PASSED_GOOD_MARK]: PracticeSteps.EVALUATION_METHODS,
    [PracticeFields.PASSED_SATISFACTORILY_MARK]: PracticeSteps.EVALUATION_METHODS,
    [PracticeFields.NOT_PASSED_MARK]: PracticeSteps.EVALUATION_METHODS,
    [PracticeFields.BIBLIOGRAPHIC_REFERENCE]: PracticeSteps.REFERENCES,
}));



export const STEPS = [
    {
        name: PracticeSteps.GENERAL,
        component: <GeneralInfo/>,
    },
    {
        name: PracticeSteps.GENERAL_PROVISIONS,
        component: <GeneralProvisions/>,
    },
    {
        name: PracticeSteps.PREREQUISITES,
        component: <Prerequisites/>,
    },
    {
        name: PracticeSteps.STRUCTURE,
        component: <Structure/>,
    },
    {
        name: PracticeSteps.REPORTING_MATERIALS,
        component: <ReportingMaterials/>,
    },
    {
        name: PracticeSteps.OVZ,
        component: <DisabledPeopleInfo/>,
    },
    {
        name: PracticeSteps.EVALUATION_METHODS,
        component: <Assessment/>,
    },
    {
        name: PracticeSteps.RESULTS,
        component: <Results/>,
    },
    {
        name: PracticeSteps.REFERENCES,
        component: <Literature/>,
    },
    {
        name: PracticeSteps.PLANS,
        component: <PlansAndDirections/>,
    },
    {
        name: PracticeSteps.COMPETENCES,
        component: <Competences/>,
    },
];
