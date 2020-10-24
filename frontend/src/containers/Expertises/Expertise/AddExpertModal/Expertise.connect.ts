import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../actions";
import generalActions from "../../../../layout/actions";
import {getExpertise, getIsOpenAddExpertModal} from '../../getters';
import {ExpertisesActions} from "../../types";

import {rootState} from "../../../../store/reducers";
import {getUsersForSelector} from "../../../../layout/getters";

const mapStateToProps = (state: rootState) => {
    return {
        expertise: getExpertise(state),
        isOpen: getIsOpenAddExpertModal(state),
        usersList: getUsersForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ExpertisesActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    generalActions: bindActionCreators(generalActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
