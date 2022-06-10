import {createLogic} from "redux-logic";
import actions from '../../layout/actions';
import statisticsActions from './actions';
import { getQualification, getStatus, getYear, getAPuse, getSUuse, getSemester, getQualificationAll } from "./getters"
import Service from './service';

const service = new Service();

const getSimpleStat = createLogic({
    type: statisticsActions.GetSimpleStat.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getSimpleStatistics()
            .then((res) => {
                dispatch(statisticsActions.SetSimpleStat(res.data));
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
    type: statisticsActions.GetSU.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getSU()
            .then((res) => {
                dispatch(statisticsActions.SetSU(res.data));
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
    type: statisticsActions.GetAP.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getAP()
            .then((res) => {
                console.log(res.data);
                dispatch(statisticsActions.SetAP(res.data));
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
    type: statisticsActions.GetQuantityRPD.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        const qualification = getQualification(state);

        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getStatisticsWorkProgram(qualification)
            .then((res)=>{
                dispatch(statisticsActions.SetQuantityRPD(res.data));
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
    type: statisticsActions.GetQuantityOP.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        const qualification = getQualification(state);
        const year = getYear(state);

        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getStatisticsOP(qualification, year)
            .then((res)=>{
                dispatch(statisticsActions.SetQuantityOP(res.data));
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
const getQuantityOPAll = createLogic({
    type: statisticsActions.GetQuantityOPAll.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        const qualificationAll = getQualificationAll(state);

        if(Array.isArray(state.records.YEARS_ALL) && state.records.YEARS_ALL.length) {
            dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
            dispatch(statisticsActions.SetQuantityOPAll(null));

            state.records.YEARS_ALL.forEach((year: string, idx: number) => {
                qualificationAll.forEach((qualification) => {
                    service.getStatisticsOP(qualification, year)
                      .then((res)=>{
                          const actualState = getState();

                          dispatch(statisticsActions.SetQuantityOPAll({ qualification, data: res.data }))
                      })
                      .catch((err) => {
                          dispatch(actions.fetchingFailed(err));
                      })
                })
            })
            dispatch(actions.fetchingFalse({destination: "GET_STATISTICS"}));
        }
    }
});

const getRPDwithoutSU = createLogic({
    type: statisticsActions.GetRPDwithoutSU.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getWPwithoutStructuralUnit()
            .then((res)=>{
                dispatch(statisticsActions.SetRPDwithoutSU(res.data));
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
    type: statisticsActions.GetRPDinSU.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        let status = getStatus(state);
        if (status == 'all'){
            status = '';
        } else {
            status = "?status=" + status;
        }

        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getStructuralUnitWP(status)
            .then((res)=>{
                dispatch(statisticsActions.SetRPDinSU(res.data));
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
    type: statisticsActions.GetRPDinAP.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        const ap = getAPuse(state);

        dispatch(actions.fetchingTrue({destination: "GET_STATISTICS"}));
        service.getAPWP(ap)
            .then((res)=>{
                dispatch(statisticsActions.SetRPDinAP(res.data["wp_in_academic_plan"]));
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
    type: statisticsActions.GetRPDinSEMESTER.type,
    latest: true,
    process({getState, action}: any, dispatch, done){
        const state = getState();
        let su = ''
        let reduxSu: Array<number> = getSUuse(state)
        if(Array.isArray(reduxSu)) {
            reduxSu.forEach((el, idx) => {
                if(idx === 0) {
                    su += `?structural_unit_id=${el}&`
                } else {
                    su += `structural_unit_id=${el}&`
                }
            })
        }
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
        service.getStructuralUnitWPFilter(su, year, status)
            .then((res)=>{
                dispatch(statisticsActions.SetRPDinSEMESTER(res.data));
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
    getRPDinSEMESTER,
    getQuantityOPAll
];