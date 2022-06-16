import {connect} from 'react-redux';
import {rootState} from "../../../store/reducers";
import {
    getCertificationCount,
    getCertificationList,
    getCurrentPage,
    getSortingField,
} from "./getters"
import {bindActionCreators} from "redux";
import actions from "./actions";

const mapStateToProps = (state: rootState) => {
    return {
        certificationList: getCertificationList(state),
        sortingField: getSortingField(state),
        currentPage: getCurrentPage(state),
        certificationCount: getCertificationCount(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
