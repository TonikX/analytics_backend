import {IntermediateCertificationEnum, StepsEnum, WorkProgramStatusEnum} from "./enum";

export const BACHELOR_QUALIFICATION = 'bachelor';
export const SPECIALIST_QUALIFICATION = 'specialist';
export const MASTER_QUALIFICATION = 'master';

export const specializationObject: any = {
    [BACHELOR_QUALIFICATION]: 'Бакалавриат',
    [SPECIALIST_QUALIFICATION]: 'Специалитет',
    [MASTER_QUALIFICATION]: 'Магистратура',
}

export const specialization = [
    {
        value: BACHELOR_QUALIFICATION,
        label: 'Бакалавриат'
    },
    {
        value: SPECIALIST_QUALIFICATION,
        label: 'Специалитет'
    },
    {
        value: MASTER_QUALIFICATION,
        label: 'Магистратура'
    }
];


const ENGLISH = 'en';
const RUSSIAN = 'ru';
const RUSSIAN_ENGLISH = 'ru/en';
const KZ = 'kz';
const GERMAN_ENGLISH = 'de';

export const languageObject: any = {
    [RUSSIAN]: 'Русский',
    [ENGLISH]: 'Английский',
    [RUSSIAN_ENGLISH]: 'Русский/Английский',
    [KZ]: 'Казахский',
    [GERMAN_ENGLISH]: 'Немецкий',
}

export const languageArray = [
    {
        value: RUSSIAN,
        label: 'Русский'
    },
    {
        value: ENGLISH,
        label: 'Английский'
    },
    {
        value: RUSSIAN_ENGLISH,
        label: 'Русский/Английский'
    },
    {
        value: KZ,
        label: 'Казахский'
    },
    {
        value: GERMAN_ENGLISH,
        label: 'Немецкий'
    }
];

export const workProgramStatusesRussian: any = {
    [WorkProgramStatusEnum.AT_WORK]: 'В работе',
    [WorkProgramStatusEnum.EXPERTISE]: 'На экспертизе',
    [WorkProgramStatusEnum.APPROVE]: 'Одобрено',
    [WorkProgramStatusEnum.ARCHIVE]: 'В архиве',
}


export const IntermediateCertificationTypes: any = {
    [IntermediateCertificationEnum.EXAM]: 'Экзамен',
    [IntermediateCertificationEnum.DIF_CREDIT]: 'Дифференцируемый зачет',
    [IntermediateCertificationEnum.CREDIT]: 'Зачет',
    [IntermediateCertificationEnum.COURSE_WORK]: 'Курсовая работа',
}

export const workProgramStatusesColors: any = {
    [WorkProgramStatusEnum.AT_WORK]: '#009aff',
    [WorkProgramStatusEnum.EXPERTISE]: '#C000FF',
    [WorkProgramStatusEnum.APPROVE]: '#2abb00',
    [WorkProgramStatusEnum.ARCHIVE]: '#ccc',
}

export const steps = {
    [StepsEnum.GENERAL]: 'Главное',
    [StepsEnum.PREREQUISITES]: 'Пререквизиты',
    [StepsEnum.SECTIONS]: 'Разделы',
    [StepsEnum.TOPICS]: 'Темы',
    [StepsEnum.LITERATURE]: 'Источники',
    [StepsEnum.EVALUATION]: 'Оценочные средства',
    [StepsEnum.INTERMEDIATE_CERTIFICATION]: 'Оценочные средства промежуточной аттестации',
    [StepsEnum.RESULTS]: 'Результаты обучения',
    [StepsEnum.PLANS]: 'Связанные с рпд учебные планы и направления',
}

export const years = [
    {
        value: '2001/2002',
        label: '2001/2002',
    },
    {
        value: '2002/2003',
        label: '2002/2003',
    },
    {
        value: '2003/2004',
        label: '2003/2004',
    },
    {
        value: '2004/2005',
        label: '2004/2005',
    },
    {
        value: '2005/2006',
        label: '2005/2006',
    },
    {
        value: '2006/2007',
        label: '2006/2007',
    },
    {
        value: '2007/2008',
        label: '2007/2008',
    },
    {
        value: '2008/2009',
        label: '2008/2009',
    },
    {
        value: '2009/2010',
        label: '2009/2010',
    },
    {
        value: '2010/2011',
        label: '2010/2011',
    },
    {
        value: '2011/2012',
        label: '2011/2012',
    },
    {
        value: '2012/2013',
        label: '2012/2013',
    },
    {
        value: '2013/2014',
        label: '2013/2014',
    },
    {
        value: '2014/2015',
        label: '2014/2015',
    },
    {
        value: '2015/2016',
        label: '2015/2016',
    },
    {
        value: '2016/2017',
        label: '2016/2017',
    },
    {
        value: '2017/2018',
        label: '2017/2018',
    },
    {
        value: '2018/2019',
        label: '2018/2019',
    },
    {
        value: '2019/2020',
        label: '2019/2020',
    },
    {
        value: '2020/2021',
        label: '2020/2021',
    },
    {
        value: '2021/2022',
        label: '2021/2022',
    },
    {
        value: '2022/2023',
        label: '2022/2023',
    },
]