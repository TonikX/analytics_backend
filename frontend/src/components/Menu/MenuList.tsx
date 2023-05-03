import uniqBy from 'lodash/uniqBy'

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

import ReportsIcon from "./icons/reports.svg";
import ReportsSelectedIcon from "./icons/reports-selected.svg";

import {
    isUserCanSeeCharacteristic, isUserCanSeeEducationalModules,
    isUserCanSeeProfessions,
    isUserInExpertiseGroup,
    isUserInItemsEditorGroup
} from "../../common/userRights";

export const getMockMenu = (menuArr: Array<number>): Array<any> => {
    const selectedMenus = []
    for (let i = 0; i < menuArr.length; i++) {


        switch (menuArr[i]) {
            case 1:
                selectedMenus.push(...[
                    {
                        title: 'Учебные планы',
                        link: appRouter.getEducationPlanRoute(),
                        icon: EducationPlanIcon,
                        selectedIcon: EducationPlanSelectedIcon,
                    },
                    {
                        title: 'Образовательные программы',
                        link: appRouter.getEducationPlanInDirectionRoute(),
                        icon: WorkProgramInDirectionIcon,
                        selectedIcon: WorkProgramInDirectionSelectedIcon,
                    },
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
                    {
                        title: 'Подбор дисциплин',
                        link: appRouter.getSelectDisciplineRoute(),
                        icon: ProfessionsSkillsIcon,
                        selectedIcon: ProfessionsSkillsSelectedIcon,
                    },
                    {
                        title: 'Подбор ОП по профессиям',
                        link: appRouter.getSelectEducationalProgramRoute(),
                        icon: WorkProgramInDirectionIcon,
                        selectedIcon: WorkProgramInDirectionSelectedIcon,
                    },
                    {
                        title: 'Индивидуальные траектории',
                        link: appRouter.getIndividualTrajectoriesRoute(),
                        icon: WorkProgramInDirectionIcon,
                        selectedIcon: WorkProgramInDirectionSelectedIcon,
                    }
                ])
                break
            case 2:
                selectedMenus.push(...[
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
                    },
                    {
                        title: 'Рабочие программы',
                        link: appRouter.getWorkProgramListRoute(),
                        icon: WorkProgramIcon,
                        selectedIcon: WorkProgramSelectedIcon,
                    },
                    {
                        title: 'Источники',
                        link: appRouter.getLiteratureRoute(),
                        icon: LiteratureIcon,
                        selectedIcon: LiteratureSelectedIcon,
                    },
                    {
                        title: 'Структурные подразделения',
                        link: appRouter.getStructuralUnitsRoute(),
                        icon: IndicatorsIcon,
                        selectedIcon: IndicatorsSelectedIcon,
                    },
                    {
                        title: 'Экспертизы',
                        link: appRouter.getExpertisesRoute(),
                        icon: WorkProgramIcon,
                        selectedIcon: WorkProgramSelectedIcon,
                    },
                ])
                break
            case 3:
                selectedMenus.push(...[
                    {
                        title: 'Рабочие программы',
                        link: appRouter.getWorkProgramListRoute(),
                        icon: WorkProgramIcon,
                        selectedIcon: WorkProgramSelectedIcon,
                    },
                    {
                        title: 'Учебные планы',
                        link: appRouter.getEducationPlanRoute(),
                        icon: EducationPlanIcon,
                        selectedIcon: EducationPlanSelectedIcon,
                    },
                    {
                        title: 'Образовательные модули',
                        link: appRouter.getTrainingModulesRoute(),
                        icon: EducationPlanIcon,
                        selectedIcon: EducationPlanSelectedIcon,
                    },
                ])
                break
            case 4:
                selectedMenus.push(...[
                    {
                        title: 'Рабочие программы',
                        link: appRouter.getWorkProgramListRoute(),
                        icon: WorkProgramIcon,
                        selectedIcon: WorkProgramSelectedIcon,
                    },
                    {
                        title: 'Направления',
                        link: appRouter.getDirectionRoute(),
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
                        title: 'Образовательные модули',
                        link: appRouter.getTrainingModulesRoute(),
                        icon: EducationPlanIcon,
                        selectedIcon: EducationPlanSelectedIcon,
                    },
                    {
                        title: 'Образовательные программы',
                        link: appRouter.getEducationPlanInDirectionRoute(),
                        icon: WorkProgramInDirectionIcon,
                        selectedIcon: WorkProgramInDirectionSelectedIcon,
                    },
                ])
                break
            case 5:
                selectedMenus.push(...[
                    {
                        title: 'Направления',
                        link: appRouter.getDirectionRoute(),
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
                        title: 'Образовательные модули',
                        link: appRouter.getTrainingModulesRoute(),
                        icon: EducationPlanIcon,
                        selectedIcon: EducationPlanSelectedIcon,
                    },
                    {
                        title: 'Образовательные программы',
                        link: appRouter.getEducationPlanInDirectionRoute(),
                        icon: WorkProgramInDirectionIcon,
                        selectedIcon: WorkProgramInDirectionSelectedIcon,
                    },
                    {
                        title: 'Общие характеристики',
                        link: appRouter.getEducationalProgram(),
                        icon: WorkProgramInDirectionIcon,
                        selectedIcon: WorkProgramInDirectionSelectedIcon,
                    },
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
                    {
                        title: 'Индивидуальные траектории',
                        link: appRouter.getIndividualTrajectoriesRoute(),
                        icon: WorkProgramInDirectionIcon,
                        selectedIcon: WorkProgramInDirectionSelectedIcon,
                    }
                ])
                break
            case 6:
                selectedMenus.push(...[
                    {
                        title: 'Онлайн курсы',
                        link: appRouter.getCoursesRoute(),
                        icon: CoursesIcon,
                        selectedIcon: CoursesSelectedIcon,
                    },
                ])
                break
            case 7:
                break
            case 8:
                break
        }
    }

    selectedMenus.push([
        {
            title: 'Отчеты',
            link: appRouter.getRecordsRoute(),
            icon: CoursesIcon,
            selectedIcon: CoursesSelectedIcon,
        },
    ])
    // @ts-ignore
    return uniqBy(selectedMenus, 'title')
}

export default (groups: Array<string>) => {
    const firstMenu = isUserInItemsEditorGroup(groups) ?
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
        ]
        :
        []
    ;

    const secondMenu = [
        {
            title: 'Рабочие программы',
            link: appRouter.getWorkProgramListRoute(),
            icon: WorkProgramIcon,
            selectedIcon: WorkProgramSelectedIcon,
        },
        {
            title: 'Практики',
            link: appRouter.getPracticeListRoute(),
            icon: WorkProgramIcon,
            selectedIcon: WorkProgramSelectedIcon,
        },
        {
            title: 'ГИА',
            link: appRouter.getFinalCertificationListRoute(),
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
            title: 'Структурные подразделения',
            link: appRouter.getStructuralUnitsRoute(),
            icon: IndicatorsIcon,
            selectedIcon: IndicatorsSelectedIcon,
        },
    ];

    if (isUserInExpertiseGroup(groups)) {
        secondMenu.push(
            {
                title: 'Экспертизы',
                link: appRouter.getExpertisesRoute(),
                icon: WorkProgramIcon,
                selectedIcon: WorkProgramSelectedIcon,
            },
        )
    }

    const thirdMenu = [
        {
            title: 'Направления',
            link: appRouter.getDirectionRoute(),
            icon: DirectionsIcon,
            selectedIcon: DirectionsSelectedIcon,
        },
        {
            title: 'Учебные планы',
            link: appRouter.getEducationPlanRoute(),
            icon: EducationPlanIcon,
            selectedIcon: EducationPlanSelectedIcon,
        },
        ...isUserCanSeeEducationalModules(groups) ? [{
            title: 'Образовательные модули',
            link: appRouter.getTrainingModulesRoute(),
            icon: EducationPlanIcon,
            selectedIcon: EducationPlanSelectedIcon,
        }] : [],
        {
            title: 'Образовательные программы',
            link: appRouter.getEducationPlanInDirectionRoute(),
            icon: WorkProgramInDirectionIcon,
            selectedIcon: WorkProgramInDirectionSelectedIcon,
        },
    ];

    const fourthMenu = isUserCanSeeProfessions(groups) ? [
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
        {
            title: 'Подбор дисциплин',
            link: appRouter.getSelectDisciplineRoute(),
            icon: ProfessionsSkillsIcon,
            selectedIcon: ProfessionsSkillsSelectedIcon,
        },
        {
            title: 'Подбор ОП по профессиям',
            link: appRouter.getSelectEducationalProgramRoute(),
            icon: WorkProgramInDirectionIcon,
            selectedIcon: WorkProgramInDirectionSelectedIcon,
        },
        {
            title: 'Индивидуальные траектории',
            link: appRouter.getIndividualTrajectoriesRoute(),
            icon: WorkProgramInDirectionIcon,
            selectedIcon: WorkProgramInDirectionSelectedIcon,
        }
    ] : [];


    const sixthMenu = [{
        title: 'Отчеты',
        link: appRouter.getRecordsRoute(),
        icon: ReportsIcon,
        selectedIcon: ReportsSelectedIcon,
    }, {
        title: 'Обновления учебных планов',
        link: appRouter.getAcademicPlanUpdateRoute(),
        icon: WorkProgramInDirectionIcon,
        selectedIcon: WorkProgramInDirectionSelectedIcon,
    }]

    const characteristicMenu = isUserCanSeeCharacteristic(groups) ? [
        {
            title: 'Общие характеристики',
            link: appRouter.getEducationalProgram(),
            icon: WorkProgramInDirectionIcon,
            selectedIcon: WorkProgramInDirectionSelectedIcon,
        },
        {
            title: 'Профессиональные стандарты',
            link: appRouter.getProfessionalStandardsRoute(),
            icon: IndicatorsIcon,
            selectedIcon: IndicatorsSelectedIcon,
        },
        {
            title: 'Образовательные стандарты',
            link: appRouter.getEducationalStandardsRoute(),
            icon: IndicatorsIcon,
            selectedIcon: IndicatorsSelectedIcon,
        },
    ] : []

    const menu = [];

    if (firstMenu.length){
        menu.push(firstMenu);
    }

    menu.push(secondMenu);

    if (thirdMenu.length){
        menu.push(thirdMenu);
    }

    if (characteristicMenu.length){
        menu.push(characteristicMenu);
    }

    if (fourthMenu.length){
        menu.push(fourthMenu);
    }

    menu.push(sixthMenu);

    return menu;
}