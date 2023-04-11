import {ReactText} from "react";
import {subSections} from "../containers/WorkProgram/constants";

const FOLDERS = 'folders';
const SIGN_IN = 'sign-in';
const SIGN_UP = 'sign-up';
const COURSES = 'courses';
const COURSE = 'course'
const OVERVIEW = 'overview'
const LITERATURE = 'literature';
const SUBJECT_AREA = 'subject-area';
const WORK_PROGRAM = 'work-program';
const TRAINING_ENTITIES = 'training-entities';
const ENTITY_TO_ENTITY = 'entity-to-entity';
const COMPETENCES = 'competences';
const DIRECTION = 'direction';
const EDUCATIONAL_PLAN = 'educational-plans';
const TRAINING_MODULES = 'training-modules';
const INDICATORS = 'indicators';
const EDUCATIONAL_PLAN_IN_DIRECTION = 'educational-plans-in-direction';
const EDUCATIONAL_PROGRAM = 'educational-program';
const WORK_PROGRAM_LIST = 'work-programs';
const PROFESSIONS = 'professions';
const ROLES = 'roles';
const SKILLS = 'skills';
const EXPERTISES = 'expertises';
const SELECT_EDUCATIONAL_PROGRAM = 'select-educational-program';
const INDIVIDUAL_TRAJECTORIES = 'individual-trajectories';
const INDIVIDUAL_EDUCATIONAL_PLANS = 'individual-educational-plans';
const PROFESSIONAL_STANDARDS = 'professional-standards';
const EDUCATIONAL_STANDARDS = 'educational-standards';
const DODPROFILE = 'dod-profile';
const PRACTICE_LIST = 'practice-list';
const PRACTICE = 'practice';
const FINAL_CERTIFICATION = 'gia';
const FINAL_CERTIFICATION_LIST = 'gia-list';
const USER_SETTINGS = 'user-settings';
const EMAIL_CONFIRM_SUCCESS = 'email-confirm-success';
const EMAIL_CONFIRM_FAIL = 'email-confirm-error';

const RECORDS = 'records';

const ACADEMIC_PLAN_UPDATE = 'academic-plan-update';

const STRUCTURAL_UNITS = 'structural-units';
const NOTIFICATIONS = 'notifications';

const SEPARATOR = '/';

export default class RouterService {

    static routerService : RouterService | null = null;

    static factory(): RouterService {
        let routerServiceInstance = this.routerService;

        if (routerServiceInstance === null) {
            routerServiceInstance = new RouterService();
        }

        return routerServiceInstance;
    }

    getSignInRoute = () => {
        return SEPARATOR + SIGN_IN;
    };

    getFoldersRoute = () => {
        return SEPARATOR + FOLDERS;
    };

    getProfessionalStandardsRoute = () => {
        return SEPARATOR + PROFESSIONAL_STANDARDS;
    };


    getEducationalStandardRoute = (id: number | string) => {
        return SEPARATOR + EDUCATIONAL_STANDARDS + SEPARATOR + id;
    };

	getProfessionalStandardRoute = (id: number | string) => {
        return SEPARATOR + PROFESSIONAL_STANDARDS + SEPARATOR + id;
    };

    getAcademicPlanUpdateRoute = () => {
        return SEPARATOR + ACADEMIC_PLAN_UPDATE;
    }

    getEducationalStandardsRoute = () => {
        return SEPARATOR + EDUCATIONAL_STANDARDS;
    };

    getProfessionalStandardIDRoute = (id: number| string) => {
        return SEPARATOR + PROFESSIONAL_STANDARDS + SEPARATOR + id;
    };

    getStructuralUnitsRoute = () => {
        return SEPARATOR + STRUCTURAL_UNITS;
    };

    getStructuralUnitRouteLink = (id: number) => {
        return SEPARATOR + STRUCTURAL_UNITS + SEPARATOR + id;
    };

    getStructuralUnitRoute = () => {
        return SEPARATOR + STRUCTURAL_UNITS + SEPARATOR + ':id';
    };

    getSignUpRoute = () => {
        return SEPARATOR + SIGN_UP;
    };

    getCoursesRoute = () => {
        return SEPARATOR + COURSES;
    };

    getCourseRoute = () => {
        return SEPARATOR + COURSE + SEPARATOR + ':id';
    };

    getOverviewRoute = () => {
        return SEPARATOR + OVERVIEW;
    };

    getLiteratureRoute = () => {
        return SEPARATOR + LITERATURE;
    };

    getSubjectAreaRoute = () => {
        return SEPARATOR + SUBJECT_AREA;
    };

    getTrainingEntitiesRoute = () => {
        return SEPARATOR + TRAINING_ENTITIES;
    };

    getEntityToEntityRoute = () => {
        return SEPARATOR + ENTITY_TO_ENTITY;
    };

    getCompetencesRoute = () => {
        return SEPARATOR + COMPETENCES;
    };

    getRecordsRoute = () => {
        return SEPARATOR + RECORDS;
    };

    getDirectionRoute = () => {
        return SEPARATOR + DIRECTION;
    };

    getIndicatorsRoute = () => {
        return SEPARATOR + INDICATORS;
    };

    getEducationalProgram = () => {
        return SEPARATOR + EDUCATIONAL_PROGRAM;
    };

    getEducationalProgramCharacteristic = () => {
        return SEPARATOR + EDUCATIONAL_PROGRAM + SEPARATOR + ':id';
    };

    getEducationalProgramCharacteristicLink = (id: number) => {
        return SEPARATOR + EDUCATIONAL_PROGRAM + SEPARATOR + id;
    };

    getEducationPlanInDirectionRoute = () => {
        return SEPARATOR + EDUCATIONAL_PLAN_IN_DIRECTION;
    };

    getProfessionsRoute = () => {
        return SEPARATOR + PROFESSIONS;
    };

    getRolesRoute = () => {
        return SEPARATOR + ROLES;
    };

    getSkillsProfessionsRoute = () => {
        return SEPARATOR + 'skills-professions';
    };

    getSelectDisciplineRoute = () => {
        return SEPARATOR + 'select-discipline';
    };

    getSelectEducationalProgramRoute = () => {
        return SEPARATOR + SELECT_EDUCATIONAL_PROGRAM;
    };

    getIndividualTrajectoriesRoute = () => {
        return SEPARATOR + INDIVIDUAL_TRAJECTORIES;
    };

    getIndividualEducationalPlansRoute = () => {
        return SEPARATOR + INDIVIDUAL_EDUCATIONAL_PLANS;
    };

    getNotificationsRoute = () => {
        return SEPARATOR + NOTIFICATIONS;
    };

    getUserProfile = () => {
      return SEPARATOR + 'user-profile';
    };

    getSkillsRolesRoute = () => {
        return SEPARATOR + 'skills-roles';
    };

    getRolesSkillsRoute = () => {
        return SEPARATOR + ROLES + SEPARATOR + ':id' + SEPARATOR + SKILLS;
    };
    getProfessionSkillsRoute = () => {
        return SEPARATOR + PROFESSIONS + SEPARATOR + ':id' + SEPARATOR + SKILLS;
    };

    getProfessionSkillsRouteLink = (id: number) => {
        return SEPARATOR + PROFESSIONS + SEPARATOR + id + SEPARATOR + SKILLS;
    };

    getCompetenceIndicatorsRouteLink = (id: number) => {
        return SEPARATOR + COMPETENCES + SEPARATOR + id + SEPARATOR + INDICATORS;
    };
    getCompetenceIndicatorsRoute = () => {
        return SEPARATOR + COMPETENCES + SEPARATOR + ':id' + SEPARATOR + INDICATORS;
    };

    getRoleSkillsRouteLink = (id: number) => {
        return SEPARATOR + ROLES + SEPARATOR + id + SEPARATOR + SKILLS;
    };

    getWorkProgramListRoute = () => {
        return SEPARATOR + WORK_PROGRAM_LIST;
    };

    getEducationPlanRoute = () => {
        return SEPARATOR + EDUCATIONAL_PLAN;
    };

    getTrainingModulesRoute = () => {
        return SEPARATOR + TRAINING_MODULES;
    };

    getTrainingModuleDetailRoute = () => {
        return SEPARATOR + TRAINING_MODULES + SEPARATOR + ':id';
    };

    getTrainingModuleDetailLink = (id: number) => {
        return SEPARATOR + TRAINING_MODULES + SEPARATOR + id;
    };

    getExpertisesRoute = () => {
        return SEPARATOR + EXPERTISES;
    };

    getExpertiseRoute = () => {
        return SEPARATOR + EXPERTISES + SEPARATOR + ':id';
    };

    getForbiddenPage = () => {
        return SEPARATOR + 403;
    };

    getExpertiseRouteLink = (id: number) => {
        return SEPARATOR + EXPERTISES + SEPARATOR + id;
    };

    getWorkProgramRoute = () => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + ':id' + SEPARATOR + '*';
    };

    getEducationPlanDetailRoute = () => {
        return SEPARATOR + EDUCATIONAL_PLAN + SEPARATOR + ':id';
    };

    getTrajectoryPlanDetailRoute = () => {
        return SEPARATOR + INDIVIDUAL_TRAJECTORIES + SEPARATOR + EDUCATIONAL_PLAN + SEPARATOR + ':id';
    };

    getWorkProgramLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.GENERAL;
    };

    getWorkProgramGeneralLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.GENERAL
    };
    getWorkProgramPrerequisitesLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.PREREQUISITES
    };
    getWorkProgramSectionsLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.SECTIONS
    };
    getWorkProgramTopicsLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.TOPICS
    };
    getWorkProgramLiteratureLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.LITERATURE
    };
    getWorkProgramEvaluationToolsLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.EVALUATION_TOOLS
    };
    getWorkProgramEvaluationToolLink = (wpId: number, id: number) => {
        return this.getWorkProgramEvaluationToolsLink(wpId) + SEPARATOR + id
    };
    getWorkProgramIntermediateCertificationLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.INTERMEDIATE_CERTIFICATION
    };
    getWorkProgramIntermediateCertificationToolLink = (wpId: number, id: number) => {
        return this.getWorkProgramIntermediateCertificationLink(wpId) + SEPARATOR + id
    };
    getWorkProgramResultsLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.RESULTS
    };
    getWorkProgramPlansLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.PLANS
    };
    getWorkProgramCompetencesLink = (id: number) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id + SEPARATOR + subSections.COMPETENCES
    };

    getPlanDetailLink = (id: ReactText) => {
        return SEPARATOR + EDUCATIONAL_PLAN + SEPARATOR + id;
    };

    getTrajectoryPlanDetailLink = (id: ReactText) => {
        return SEPARATOR + INDIVIDUAL_TRAJECTORIES + SEPARATOR + EDUCATIONAL_PLAN + SEPARATOR + id;
    };

    getDodProfileRoute = () => {
        return SEPARATOR + DODPROFILE;
    };

    getUserSettings = () => {
        return SEPARATOR + USER_SETTINGS;
    };

    getPracticeListRoute = () => {
        return SEPARATOR + PRACTICE_LIST;
    }

    getPracticeRoute = () => {
        return SEPARATOR + PRACTICE + SEPARATOR + ':id';
    }

    getPracticeLink = (id: number) => {
        return SEPARATOR + PRACTICE + SEPARATOR + id;
    }

    getFinalCertificationRoute = () => {
        return SEPARATOR + FINAL_CERTIFICATION + SEPARATOR + ':id';
    }

    getFinalCertificationLink = (id: number) => {
        return SEPARATOR + FINAL_CERTIFICATION + SEPARATOR + id;
    }

    getFinalCertificationListRoute = () => {
        return SEPARATOR + FINAL_CERTIFICATION_LIST;
    }

    getEmailConfirmSuccess = () => {
        return SEPARATOR + EMAIL_CONFIRM_SUCCESS;
    }

    getEmailConfirmFail = () => {
        return SEPARATOR + EMAIL_CONFIRM_FAIL;
    }
}

export const appRouter = RouterService.factory();
