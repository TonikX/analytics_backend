import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {
    getSimpleStat,
    getCurrentCH,
    getQualification,
    getQuantityRPD,
    getYear,
    getQuantityOP,
    getRPDwithoutSU, getRPDinSU, getStatus, getSemester, getSU, getAP, getAPuse, getRPDinAP, getSUuse, getRPDinSEMESTER
} from "./getters";
import {StatisticsActions} from "./types"
import {rootState} from "../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        CURRENT_CH: getCurrentCH(state),
        SIMPLE_STATE: getSimpleStat(state),
        QUALIFICATION : getQualification(state),
        QUANTITY_RPD: getQuantityRPD(state),
        YEAR: getYear(state),
        QUANTITY_OP: getQuantityOP(state),
        RPD_WITHOUT_SU: getRPDwithoutSU(state),
        RPD_IN_SU: getRPDinSU(state),
        STATUS: getStatus(state),
        SEMESTER: getSemester(state),
        SU: getSU(state),
        AP: getAP(state),
        APuse :getAPuse(state),
        RPD_IN_AP: getRPDinAP(state),
        SUuse: getSUuse(state),
        RPD_IN_SEMESTER: getRPDinSEMESTER(state),
    }
};


const mapDispatchToProps  = (dispatch: Dispatch<StatisticsActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps,mapDispatchToProps);
