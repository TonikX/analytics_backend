import {Languages, PracticeFormats, PracticeKinds, PracticeTypes, PracticeWays, Qualifications} from "./enum";

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
        label: 'эксплуатационная; преддипломная, преддипломная / Senior internship',
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
        label: 'Стационарно/выездная'
    },
]

export const PRACTICE_FORMATS = [
    {
        value: PracticeFormats.DEDICATED,
        label: 'Выделенная',
    },
    {
        value: PracticeFormats.DISPERSED,
        label: 'Рассредоточенная',
    },
]