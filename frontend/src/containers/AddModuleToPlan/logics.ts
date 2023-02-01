import {createLogic} from "redux-logic";
import actions from "../../layout/actions";
import Service from "./service";
import get from "lodash/get";
import {fetchingTypes} from "./enum";
import addModuleToPlanActions from "./actions";
import {getFilterField} from "../EducationalPlan/TrainingModules/getters";
import {fields} from "../EducationalPlan/TrainingModules/enum";
import {
    getCurrentModulePage,
    getCurrentPlansPage,
    getModuleSearchQuery,
    getPlansSearchQuery, getSelectedBlock, getSelectedModules, getSelectedPlans,
    getSortingMode
} from "./getters";

const service = new Service();

const getTrainingModulesList = createLogic({
    type: addModuleToPlanActions.getTrainingModulesList.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const filters = {
            id: getFilterField(state, fields.FILTER_ID),
            name: getFilterField(state, fields.FILTER_MODULE_NAME),
            isuId: getFilterField(state, fields.FILTER_MODULE_ISU_ID),
            disciplineName: getFilterField(state, fields.FILTER_MODULE_DISCIPLINE_NAME),
            availableForAll: getFilterField(state, fields.FILTER_MODULE_AVAILABLE_FOR_ALL),
        };

        const currentPage = getCurrentModulePage(state);
        const searchQuery = getModuleSearchQuery(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_MODULES}));

        service.getTrainingModules(currentPage, searchQuery, 'id', sortingMode, filters)
            .then((res) => {
                const results = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));
                dispatch(addModuleToPlanActions.setTrainingModulesList(results));
                dispatch(addModuleToPlanActions.changeModulesAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_MODULES}));
                return done();
            });
    }
});

const addModuleToPlan = createLogic({
    type: addModuleToPlanActions.addModuleToPlan.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const selectedModules = getSelectedModules(state);
        const selectedPlans = getSelectedPlans(state);
        const selectedBlock = getSelectedBlock(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_MODULES_TO_PLAN}));

        service.addModuleToPlan(selectedModules, selectedPlans, selectedBlock)
            .then(() => {
                dispatch(actions.fetchingSuccess(['Модули успешно добавлены']));
            })
            .catch(() => {
                dispatch(actions.fetchingFailed(['Произошла ошибка добавления']));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_MODULES_TO_PLAN}));
                return done();
            });
    }
});

const getEducationalPlansList = createLogic({
    type: addModuleToPlanActions.getEducationalPlan.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const currentPage = getCurrentPlansPage(state);
        const searchQuery = getPlansSearchQuery(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PLANS}));

        service.getEducationalPlan(currentPage, searchQuery, 'id', sortingMode)
            .then((res) => {
                const results = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));
                dispatch(addModuleToPlanActions.setEducationalPlan(results));
                dispatch(addModuleToPlanActions.changePlansAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PLANS}));
                return done();
            });
    }
});

export default [
    getTrainingModulesList,
    getEducationalPlansList,
    addModuleToPlan
];
