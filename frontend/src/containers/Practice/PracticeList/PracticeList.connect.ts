import {connect} from 'react-redux';
import {rootState} from "../../../store/reducers";
import {
    getCurrentPage,
    getPracticeCount,
    getPracticeList,
    getSortingField,
    getSortingMode
} from "./getters"
import {bindActionCreators} from "redux";
import actions from "./actions";

const mapStateToProps = (state: rootState) => {
    return {
        practiceList: getPracticeList(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
        currentPage: getCurrentPage(state),
        practiceCount: getPracticeCount(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
