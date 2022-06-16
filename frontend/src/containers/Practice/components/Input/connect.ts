import {connect} from 'react-redux';

import {rootState} from "../../../../store/reducers";
import {getPractice, getValidation} from "../../getters";
import {bindActionCreators} from "redux";
import actions from "../../actions";
import {isFetchingComponentByKey} from "../../../../layout/getters";

const mapStateToProps = (state: rootState) => {
    return {
        fields: getPractice(state),
        getLoading: (fieldName: string) => {
            return isFetchingComponentByKey(state, fieldName);
        },
        validation: getValidation(state),
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
