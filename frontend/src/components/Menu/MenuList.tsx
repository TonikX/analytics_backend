import {appRouter} from "../../service/router-service";

import SubjectAreaIcon from "./icons/subject-area.svg";
import SubjectAreaSelectedIcon from "./icons/subject-area-selected.svg";

import WorkProgramIcon from "./icons/work-program.svg";
import WorkProgramSelectedIcon from "./icons/work-program-selected.svg";

import EducationPlanIcon from "./icons/education-plans.svg";
import EducationPlanSelectedIcon from "./icons/education-plans-selected.svg";

export default [
    [
        {
            title: 'Предметные области',
            link: appRouter.getSubjectAreaRoute(),
            icon: SubjectAreaIcon,
            selectedIcon: SubjectAreaSelectedIcon,
        },
        {
            title: 'Учебные сущности',
            link: appRouter.getTrainingEntitiesRoute(),
            icon: SubjectAreaIcon,
            selectedIcon: SubjectAreaSelectedIcon,
        }
    ],
    [
        {
            title: 'Рабочие программы',
            link: appRouter.getWorkProgramListRoute(),
            icon: WorkProgramIcon,
            selectedIcon: WorkProgramSelectedIcon,
        },
        {
            title: 'Онлайн курсы',
            link: appRouter.getCoursesRoute(),
            icon: WorkProgramIcon,
            selectedIcon: WorkProgramSelectedIcon,
        },
        {
            title: 'Источники',
            link: appRouter.getLiteratureRoute(),
            icon: WorkProgramIcon,
            selectedIcon: WorkProgramSelectedIcon,
        },
        {
            title: 'Компетенции',
            link: appRouter.getCompetencesRoute(),
            icon: WorkProgramIcon,
            selectedIcon: WorkProgramSelectedIcon,
        },
        {
            title: 'Индикаторы',
            link: appRouter.getIndicatorsRoute(),
            icon: WorkProgramIcon,
            selectedIcon: WorkProgramSelectedIcon,
        },
    ],
    [
        {
            title: 'Направления',
            link: appRouter.getEducationalProgramRoute(),
            icon: EducationPlanIcon,
            selectedIcon: EducationPlanSelectedIcon,
        },
        {
            title: 'Учебные планы',
            link: appRouter.getEducationPlanRoute(),
            icon: EducationPlanIcon,
            selectedIcon: EducationPlanSelectedIcon,
        },
        {
            title: 'Учебные планы в направлении',
            link: appRouter.getEducationPlanInDirectionRoute(),
            icon: EducationPlanIcon,
            selectedIcon: EducationPlanSelectedIcon,
        },
    ]
]