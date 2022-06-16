import {connect} from 'react-redux';

import {rootState} from "../../../../store/reducers";
import {getCertification, getValidation} from "../../getters";
import {bindActionCreators} from "redux";
import actions from "../../actions";
import {getStructuralUnitsForSelector} from "../../../StructuralUnits/getters";
import structuralUnitActions from "../../../StructuralUnits/actions";

const mapStateToProps = (state: rootState) => {
    return {
        fields: getCertification(state),
        structuralUnitsList: getStructuralUnitsForSelector(state),
        validation: getValidation(state),
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
    structuralUnitActions: bindActionCreators<any, any>(structuralUnitActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
