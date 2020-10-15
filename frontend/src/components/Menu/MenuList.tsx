import {appRouter} from "../../service/router-service";

import CompetencesIcon from "./icons/competences.svg";
import CompetencesSelectedIcon from "./icons/competences-selected.svg";

import DirectionsIcon from "./icons/directions.svg";
import DirectionsSelectedIcon from "./icons/directions-selected.svg";

import EducationPlanIcon from "./icons/education-plans.svg";
import EducationPlanSelectedIcon from "./icons/education-plans-selected.svg";

import IndicatorsIcon from "./icons/indicators.svg";
import IndicatorsSelectedIcon from "./icons/indicators-selected.svg";

import LiteratureIcon from "./icons/literature.svg";
import LiteratureSelectedIcon from "./icons/literature-selected.svg";

import CoursesIcon from "./icons/online-courses.svg";
import CoursesSelectedIcon from "./icons/online-courses-selected.svg";

import SubjectAreaIcon from "./icons/subject-area.svg";
import SubjectAreaSelectedIcon from "./icons/subject-area-selected.svg";

import TrainingEntitiesIcon from "./icons/training-entities.svg";
import TrainingEntitiesSelectedIcon from "./icons/training-entities-selected.svg";

import WorkProgramIcon from "./icons/work-programs.svg";
import WorkProgramSelectedIcon from "./icons/work-programs-selected.svg";

import WorkProgramInDirectionIcon from "./icons/work-program-in-direction.svg";
import WorkProgramInDirectionSelectedIcon from "./icons/work-program-in-direction-selected.svg";

import EntityToEntityIcon from "./icons/entity-to-entity.svg";
import EntityToEntitySelectedIcon from "./icons/entity-to-entity-selected.svg";

import RolesIcon from "./icons/roles.svg";
import RolesSelectedIcon from "./icons/roles-selected.svg";

import RolesSkillsIcon from "./icons/roles-skills.svg";
import RolesSkillsSelectedIcon from "./icons/roles-skills-selected.svg";

import ProfessionsSkillsIcon from "./icons/professions-skills.svg";
import ProfessionsSkillsSelectedIcon from "./icons/professions-skills-selected.svg";

import ProfessionsIcon from "./icons/professions.svg";
import ProfessionsSelectedIcon from "./icons/professions-selected.svg";

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
            icon: TrainingEntitiesIcon,
            selectedIcon: TrainingEntitiesSelectedIcon,
        },
        {
            title: 'Связи',
            link: appRouter.getEntityToEntityRoute(),
            icon: EntityToEntityIcon,
            selectedIcon: EntityToEntitySelectedIcon,
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
            icon: CoursesIcon,
            selectedIcon: CoursesSelectedIcon,
        },
        {
            title: 'Источники',
            link: appRouter.getLiteratureRoute(),
            icon: LiteratureIcon,
            selectedIcon: LiteratureSelectedIcon,
        },
        {
            title: 'Компетенции',
            link: appRouter.getCompetencesRoute(),
            icon: CompetencesIcon,
            selectedIcon: CompetencesSelectedIcon,
        },
        {
            title: 'Индикаторы',
            link: appRouter.getIndicatorsRoute(),
            icon: IndicatorsIcon,
            selectedIcon: IndicatorsSelectedIcon,
        },
    ],
    [
        {
            title: 'Направления',
            link: appRouter.getEducationalProgramRoute(),
            icon: DirectionsIcon,
            selectedIcon: DirectionsSelectedIcon,
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
            icon: WorkProgramInDirectionIcon,
            selectedIcon: WorkProgramInDirectionSelectedIcon,
        },
    ],
    [
        {
            title: 'Роли',
            link: appRouter.getRolesRoute(),
            icon: RolesIcon,
            selectedIcon: RolesSelectedIcon,
        },
        {
            title: 'Навыки ролей',
            link: appRouter.getSkillsRolesRoute(),
            icon: RolesSkillsIcon,
            selectedIcon: RolesSkillsSelectedIcon,
        },
        {
            title: 'Профессии',
            link: appRouter.getProfessionsRoute(),
            icon: ProfessionsIcon,
            selectedIcon: ProfessionsSelectedIcon,
        },
        {
            title: 'Навыки профессий',
            link: appRouter.getSkillsProfessionsRoute(),
            icon: ProfessionsSkillsIcon,
            selectedIcon: ProfessionsSkillsSelectedIcon,
        },
    ]
]