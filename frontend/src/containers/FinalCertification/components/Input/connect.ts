import {connect} from 'react-redux';

import {rootState} from "../../../../store/reducers";
import {getCertification} from "../../getters";
import {bindActionCreators} from "redux";
import actions from "../../actions";
import {isFetchingComponentByKey} from "../../../../layout/getters";
import {getValidation} from "../../getters";

const mapStateToProps = (state: rootState) => {
    return {
        fields: getCertification(state),
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
