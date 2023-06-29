import {appRouter} from "../../../service/router-service";

export const steps = [
    {
        label: 'Образовательная программа',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 1)
    },
    {
        label: 'Аннотация',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 2)
    },
    {
        label: 'Области профессиональной деятельности',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 3)
    },
    {
        label: 'Сферы профессиональной деятельности',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 4)
    },
    {
        label: 'Объекты профессиональной деятельности',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 5)
    },
    {
        label: 'Типы профессиональных задач, к решению которых готовятся выпускники',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 6)
    },
    {
        label: 'Ключевые компетенции',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 7)
    },
    {
        label: 'Общепрофессиональные компетенции',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 8)
    },
    {
        label: 'Надпрофессиональные компетенции',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 9)
    },
    {
        label: 'Профессиональные компетенции (на основе профессиональных стандартов)',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 10)
    },
    {
        label: 'Профессиональные компетенции (на основе форсайтов)',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 11)
    },
    {
        label: 'Профессиональные компетенции майнора',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 12)
    },
    // {
    //     label: 'Необходимый преподавательский состав',
    //     link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 1)
    // },
    {
        label: 'Матрица компетенций',
        link: (id: number) => appRouter.getCharacteristicSubSectionLink(id, 13)
    },
];
