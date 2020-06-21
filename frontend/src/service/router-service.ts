import {ReactText} from "react";

const SIGN_IN = 'sign-in';
const SIGN_UP = 'sign-up';
const COURSES = 'courses';
const LITERATURE = 'literature';
const SUBJECT_AREA = 'subject-area';
const WORK_PROGRAM = 'work-program';
const TRAINING_ENTITIES = 'training-entities';
const COMPETENCES = 'competences';
const EDUCATIONAL_PROGRAM = 'educational-programs';
const EDUCATIONAL_PLAN = 'educational-plans';
const INDICATORS = 'indicators';
const EDUCATIONAL_PLAN_IN_DIRECTION = 'educational-plans-in-direction';
const WORK_PROGRAM_LIST = 'work-programs';

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

    getSignUpRoute = () => {
        return SEPARATOR + SIGN_UP;
    };

    getCoursesRoute = () => {
        return SEPARATOR + COURSES;
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

    getCompetencesRoute = () => {
        return SEPARATOR + COMPETENCES;
    };

    getEducationalProgramRoute = () => {
        return SEPARATOR + EDUCATIONAL_PROGRAM;
    };

    getIndicatorsRoute = () => {
        return SEPARATOR + INDICATORS;
    };

    getEducationPlanInDirectionRoute = () => {
        return SEPARATOR + EDUCATIONAL_PLAN_IN_DIRECTION;
    };

    getWorkProgramListRoute = () => {
        return SEPARATOR + WORK_PROGRAM_LIST;
    };

    getEducationPlanRoute = () => {
        return SEPARATOR;
    };

    getWorkProgramRoute = () => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + ':id';
    };

    getEducationPlanDetailRoute = () => {
        return SEPARATOR + EDUCATIONAL_PLAN + SEPARATOR + ':id';
    };

    getWorkProgramLink = (id: ReactText) => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + id;
    };

    getPlanDetailLink = (id: ReactText) => {
        return SEPARATOR + EDUCATIONAL_PLAN + SEPARATOR + id;
    };
}

export const appRouter = RouterService.factory();