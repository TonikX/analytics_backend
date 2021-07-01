import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import structuralUnitActions from '../../StructuralUnits/actions';
import {WorkProgramGeneralFields} from "../enum";
import actions from "../actions";
import {getWorkProgramField, isCanEdit} from '../getters';

import {isFetchingComponentByKey} from "../../../layout/getters";

import {rootState} from "../../../store/reducers";
import {getStructuralUnitsForSelector} from "../../StructuralUnits/getters";

const mapStateToProps = (state:rootState) => {
    return {
        title: getWorkProgramField(state, WorkProgramGeneralFields.TITLE),
        code: getWorkProgramField(state, WorkProgramGeneralFields.CODE),
        authors: getWorkProgramField(state, WorkProgramGeneralFields.AUTHORS),
        date: getWorkProgramField(state, WorkProgramGeneralFields.APPROVAL_DATE),
        video: getWorkProgramField(state, WorkProgramGeneralFields.VIDEO_LINK),
        description: getWorkProgramField(state, WorkProgramGeneralFields.DESCRIPTION),
        qualification: getWorkProgramField(state, WorkProgramGeneralFields.QUALIFICATION),
        language: getWorkProgramField(state, WorkProgramGeneralFields.LANGUAGE),
        editors: getWorkProgramField(state, WorkProgramGeneralFields.EDITORS),
        structuralUnit: getWorkProgramField(state, WorkProgramGeneralFields.STRUCTURAL_UNIT),

        isCanEdit: isCanEdit(state),
        structuralUnitsList: getStructuralUnitsForSelector(state),

        fetchingCode: isFetchingComponentByKey(state, WorkProgramGeneralFields.CODE),
        fetchingTitle: isFetchingComponentByKey(state, WorkProgramGeneralFields.TITLE),
        fetchingDate: isFetchingComponentByKey(state, WorkProgramGeneralFields.APPROVAL_DATE),
        fetchingAuthors: isFetchingComponentByKey(state, WorkProgramGeneralFields.AUTHORS),
        fetchingVideoLink: isFetchingComponentByKey(state, WorkProgramGeneralFields.VIDEO_LINK),
        fetchingDescription: isFetchingComponentByKey(state, WorkProgramGeneralFields.DESCRIPTION),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    structuralUnitActions: bindActionCreators<any, any>(structuralUnitActions, dispatch),
    actions: bindActionCreators<any, any>(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
