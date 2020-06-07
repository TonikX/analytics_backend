import {createLogic} from "redux-logic";

import actions from '../../../layout/actions';
import workProgramActions from '../actions';

import Service from '../service';
import {getWorkProgramField, getWorkProgramId} from '../getters';

import {fetchingTypes, fields} from "../enum";
import {LiteratureType} from "../../Literature/types";
import {literatureFields} from "../../Literature/enum";

const service = new Service();

const deleteLiterature = createLogic({
    type: workProgramActions.deleteLiterature.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const literatureList: Array<LiteratureType> = getWorkProgramField(state, fields.WORK_PROGRAM_BIBLIOGRAPHIC_REFERENCE);

        const deleteLiteratureId = action.payload;
        const literatureListWithoutDeleted = literatureList.filter(item => item[literatureFields.ID] !== deleteLiteratureId);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_LITERATURE}));

        service.updateLiterature(literatureListWithoutDeleted.map(item => item[literatureFields.ID]), workProgramId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_LITERATURE}));
                return done();
            });
    }
});

const addLiterature = createLogic({
    type: workProgramActions.addLiterature.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const selectedLiterature: Array<LiteratureType> = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_LITERATURE}));

        service.updateLiterature(selectedLiterature.map(item => item[literatureFields.ID]), workProgramId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                dispatch(workProgramActions.closeDialog(fields.ADD_NEW_LITERATURE));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_LITERATURE}));
                return done();
            });
    }
});

export default [
    deleteLiterature,
    addLiterature,
];
