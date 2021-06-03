import {createLogic} from "redux-logic";
import actions from '../../layout/actions';
import StatisticsActions from './actions';
import {getQualification, getStatus, getYear, getAPuse,getSUuse, getSemester} from "./getters"
import Service from './service';
import {fetchingTypes} from "../Courses/enum";

const service = new Service();

const getSimpleStat = createLogic({
    type: StatisticsActions.GetSimpleStat.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getSimpleStatistics()
            .then((res) => {
                dispatch(StatisticsActions.SetSimpleStat(res.data));

            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: "GET_STATISTICS"}));
                return done();
            });
    }
});

const getSU = createLogic({
    type: StatisticsActions.GetSU.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getSU()
            .then((res) => {
                dispatch(StatisticsActions.SetSU(res.data));

            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: "GET_STATISTICS"}));
                return done();
            });
    }
});

const getAP = createLogic({
    type: StatisticsActions.GetAP.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {

        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getAP()
            .then((res) => {
                console.log(res.data);
                dispatch(StatisticsActions.SetAP(res.data));

            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: "GET_STATISTICS"}));
                return done();
            });
    }
});

const getQuantityRPD = createLogic({
    type: StatisticsActions.GetQuantityRPD.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        const qualification = getQualification(state);
        console.log(qualification);
        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getStatisticsWorkProgram(qualification)
            .then((res)=>{
                dispatch(StatisticsActions.SetQuantityRPD(res.data));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: "GET_STATISTICS"}));
                return done();
            });
    }
});

const getQuantityOP = createLogic({
    type: StatisticsActions.GetQuantityOP.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        const qualification = getQualification(state);
        const year = getYear(state);
        console.log(qualification);
        console.log(year);
        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getStatisticsOP(qualification, year)
            .then((res)=>{
                dispatch(StatisticsActions.SetQuantityOP(res.data));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: "GET_STATISTICS"}));
                return done();
            });
    }
});

const getRPDwithoutSU = createLogic({
    type: StatisticsActions.GetRPDwithoutSU.type,
    latest: true,
    process({getState, action}: any, dispatch, done){

        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getWPwithoutStructuralUnit()
            .then((res)=>{
                dispatch(StatisticsActions.SetRPDwithoutSU(res.data));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: "GET_STATISTICS"}));
                return done();
            });
    }
});

const getRPDinSU = createLogic({
    type: StatisticsActions.GetRPDinSU.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        let status = getStatus(state);
        if (status == 'all'){
            status = '';
        } else {
            status = "?status=" + status;
        }
        console.log(status);
        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getStructuralUnitWP(status)
            .then((res)=>{
                dispatch(StatisticsActions.SetRPDinSU(res.data));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: "GET_STATISTICS"}));
                return done();
            });
    }
});

const getRPDinAP = createLogic({
    type: StatisticsActions.GetRPDinAP.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        let ap = getAPuse(state);

        console.log(ap);
        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getAPWP(ap)
            .then((res)=>{
                dispatch(StatisticsActions.SetRPDinAP(res.data["wp_in_academic_plan"]));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: "GET_STATISTICS"}));
                return done();
            });
    }
});

const getRPDinSEMESTER = createLogic({
    type: StatisticsActions.GetRPDinSEMESTER.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        let su = '?structural_unit_id=' + getSUuse(state);
        let status = getStatus(state);
        if (status == 'all'){
            status = '';
        } else {
            status = "&status=" + status;
        }
        let year = getYear(state);
        if (year == 'all'){
            year = '';
        } else {
            year = "&year=" + year;
        }
        let semester = getSemester(state);
        if (semester == 'all'){
            semester = '';
        } else {
            semester = "&semester=" + semester;
        }



        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getStructuralUnitWPFilter(su, year, semester, status)
            .then((res)=>{
                dispatch(StatisticsActions.SetRPDinSEMESTER(res.data));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: "GET_STATISTICS"}));
                return done();
            });
    }
});


export default [
    getSimpleStat,
    getQuantityRPD,
    getQuantityOP,
    getRPDwithoutSU,
    getRPDinSU,
    getSU,
    getAP,
    getRPDinAP,
    getRPDinSEMESTER
];