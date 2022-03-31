import {createLogic} from "redux-logic";
import get from 'lodash/get';
import actions from '../../layout/actions';
import EducationalStandardsActions from './actions';
import Service from './service';
import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";
import {getEducationalStandardId} from "./getters";

const service = new Service();

const getEducationalStandards = createLogic({
    type: EducationalStandardsActions.getEducationalStandards.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATIONAL_STANDARDS}));

        service.getEducationalStandards(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const data = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));
                //@ts-ignore
                dispatch(EducationalStandardsActions.setEducationalStandards(data));
                //@ts-ignore
                dispatch(EducationalStandardsActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATIONAL_STANDARDS}));
                return done();
            });
    }
});

const deleteEducationalStandards = createLogic({
    type: EducationalStandardsActions.deleteEducationalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandardId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_EDUCATIONAL_STANDARD}));

        service.deleteEducationalStandard(educationalStandardId)
            .then((res) => {
                dispatch(EducationalStandardsActions.getEducationalStandards());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_EDUCATIONAL_STANDARD}));
                return done();
            });
    }
});

const createEducationalStandards = createLogic({
    type: EducationalStandardsActions.createNewEducationalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandard = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EDUCATIONAL_STANDARD}));

        service.createEducationalStandard(educationalStandard)
            .then((res) => {
                dispatch(EducationalStandardsActions.getEducationalStandards());
                dispatch(actions.fetchingSuccess());
                dispatch(EducationalStandardsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_EDUCATIONAL_STANDARD}));
                return done();
            });
    }
});

const changeEducationalStandards = createLogic({
    type: EducationalStandardsActions.changeEducationalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandard = action.payload;
        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_EDUCATIONAL_STANDARD}));

        service.changeEducationalStandard(educationalStandard)
            .then((res) => {
                dispatch(EducationalStandardsActions.getEducationalStandards());
                dispatch(actions.fetchingSuccess());
                dispatch(EducationalStandardsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_EDUCATIONAL_STANDARD}));
                return done();
            });
    }
});

const getEducationalStandard = createLogic({
    type: EducationalStandardsActions.getEducationalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATIONAL_STANDARD}));

        service.getEducationalStandard(action.payload)
            .then((res) => {
                dispatch(EducationalStandardsActions.setEducationalStandard(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATIONAL_STANDARD}));
                return done();
            });
    }
});

const educationalStandardCreateGroup = createLogic({
    type: EducationalStandardsActions.educationalStandardCreateGroup.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandardId = getEducationalStandardId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.EDUCATIONAL_STANDARD_CREATE_COMPETENCE_GROUP}));

        service.educationalStandardCreateGroup(action.payload, educationalStandardId)
          .then((res) => {
              dispatch(EducationalStandardsActions.getEducationalStandard(educationalStandardId));
              dispatch(actions.fetchingSuccess());
          })
          .catch((err) => {
              dispatch(actions.fetchingFailed(err));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: fetchingTypes.EDUCATIONAL_STANDARD_CREATE_COMPETENCE_GROUP}));
              return done();
          });
    }
});

const educationalStandardDeleteGroup = createLogic({
    type: EducationalStandardsActions.educationalStandardDeleteGroup.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandardId = getEducationalStandardId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.EDUCATIONAL_STANDARD_DELETE_COMPETENCE_GROUP}));

        service.educationalStandardDeleteGroup(action.payload)
          .then((res) => {
              dispatch(EducationalStandardsActions.getEducationalStandard(educationalStandardId));
              dispatch(actions.fetchingSuccess());
          })
          .catch((err) => {
              dispatch(actions.fetchingFailed(err));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: fetchingTypes.EDUCATIONAL_STANDARD_DELETE_COMPETENCE_GROUP}));
              return done();
          });
    }
});

const educationalStandardSaveCompetence = createLogic({
    type: EducationalStandardsActions.educationalStandardSaveCompetence.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandardId = getEducationalStandardId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.EDUCATIONAL_STANDARD_SAVE_COMPETENCE}));

        service.educationalStandardSaveCompetence(action.payload)
          .then((res) => {
              dispatch(EducationalStandardsActions.getEducationalStandard(educationalStandardId));
              dispatch(actions.fetchingSuccess());
          })
          .catch((err) => {
              dispatch(actions.fetchingFailed(err));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: fetchingTypes.EDUCATIONAL_STANDARD_SAVE_COMPETENCE}));
              return done();
          });
    }
});

const educationalStandardDeleteCompetence = createLogic({
    type: EducationalStandardsActions.educationalStandardDeleteCompetence.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandardId = getEducationalStandardId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.EDUCATIONAL_STANDARD_DELETE_COMPETENCE}));

        service.educationalStandardDeleteCompetence(action.payload)
          .then((res) => {
              dispatch(EducationalStandardsActions.getEducationalStandard(educationalStandardId));
              dispatch(actions.fetchingSuccess());
          })
          .catch((err) => {
              dispatch(actions.fetchingFailed(err));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: fetchingTypes.EDUCATIONAL_STANDARD_DELETE_COMPETENCE}));
              return done();
          });
    }
});

const educationalStandardSaveIndicator = createLogic({
    type: EducationalStandardsActions.educationalStandardSaveIndicator.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandardId = getEducationalStandardId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.EDUCATIONAL_STANDARD_SAVE_INDICATOR}));

        service.educationalStandardSaveIndicator(action.payload)
          .then((res) => {
              dispatch(EducationalStandardsActions.getEducationalStandard(educationalStandardId));
              dispatch(actions.fetchingSuccess());
          })
          .catch((err) => {
              dispatch(actions.fetchingFailed(err));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: fetchingTypes.EDUCATIONAL_STANDARD_SAVE_INDICATOR}));
              return done();
          });
    }
});

const educationalStandardDeleteIndicator = createLogic({
    type: EducationalStandardsActions.educationalStandardDeleteIndicator.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandardId = getEducationalStandardId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.EDUCATIONAL_STANDARD_DELETE_INDICATOR}));

        service.educationalStandardDeleteIndicator(action.payload)
          .then((res) => {
              dispatch(EducationalStandardsActions.getEducationalStandard(educationalStandardId));
              dispatch(actions.fetchingSuccess());
          })
          .catch((err) => {
              dispatch(actions.fetchingFailed(err));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: fetchingTypes.EDUCATIONAL_STANDARD_DELETE_INDICATOR}));
              return done();
          });
    }
});

const educationalStandardSaveGroupTitle = createLogic({
    type: EducationalStandardsActions.educationalStandardSaveGroupTitle.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandardId = getEducationalStandardId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.EDUCATIONAL_STANDARD_SAVE_GROUP_TITLE}));

        service.educationalStandardSaveGroupTitle(action.payload)
          .then((res) => {
              dispatch(EducationalStandardsActions.getEducationalStandard(educationalStandardId));
              dispatch(actions.fetchingSuccess());
          })
          .catch((err) => {
              dispatch(actions.fetchingFailed(err));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: fetchingTypes.EDUCATIONAL_STANDARD_SAVE_GROUP_TITLE}));
              return done();
          });
    }
});

export default [
    getEducationalStandards,
    getEducationalStandard,
    deleteEducationalStandards,
    createEducationalStandards,
    changeEducationalStandards,

    educationalStandardCreateGroup,
    educationalStandardDeleteGroup,

    educationalStandardSaveCompetence,
    educationalStandardDeleteCompetence,

    educationalStandardSaveIndicator,
    educationalStandardDeleteIndicator,

    educationalStandardSaveGroupTitle,
];
