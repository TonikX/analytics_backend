import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import profStandardsActions from "../../containers/ProfessionalStandards/actions";

import {rootState} from "../../store/reducers";
import {getProfStandardsForSelector} from "../../containers/ProfessionalStandards/getters";

const mapStateToProps = (state: rootState) => {
    return {
        profStandardsList: getProfStandardsForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    profStandardsActions: bindActionCreators<any, any>(profStandardsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
