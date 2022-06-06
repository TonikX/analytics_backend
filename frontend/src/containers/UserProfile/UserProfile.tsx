import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useHistory, Link} from 'react-router-dom';
import get from 'lodash/get';
import moment from 'moment';

import Pagination from "@material-ui/lab/Pagination";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/CloseOutlined';

import MergeWorkProgramsBlock from "../MergeWorkPrograms";
import {getUserData, getUserGroups, getValidationResults, getValidationRunResults} from '../../layout/getters';
import layoutActions from '../../layout/actions';
import {appRouter} from '../../service/router-service';
import UserService from '../../service/user-service';
import {WorkProgramGeneralFields} from '../WorkProgram/enum';
import {specialization} from '../WorkProgram/constants';
import {FULL_DATE_FORMAT} from '../../common/utils';
import {Chart, registerables} from 'chart.js'
import {WorkProgram} from './types';
import {getAllCount, getCurrentPage, getWorkProgramList} from "./getters";
import userProfileActions from './actions';
import {useStyles} from './UserProfile.styles';

Chart.register(...registerables)


const userService = UserService.factory();

export default () => {
    const classes = useStyles();
    const userData = useSelector(getUserData);
    const dispatch = useDispatch();
    const history = useHistory();
    const validationResults = useSelector(getValidationResults);
    const validationRunResults = useSelector(getValidationRunResults);

    useEffect(() => {
        dispatch(userProfileActions.changeCurrentPage(1));
        dispatch(userProfileActions.getUserWorkProgramsList());
        dispatch(layoutActions.getValidationResults());
    }, []);

    const handleLogout = () => {
        userService.logout();
        dispatch(layoutActions.setAuthFalse());
        history.push(appRouter.getSignInRoute());
    };

    const composeUserName = () => `${userData.first_name} ${userData.last_name}`;

    const validate = () => {
        dispatch(layoutActions.validateAcademicPlans());
    }

    const loadAcademicPlanValidation = (event: any) => {
        dispatch(layoutActions.getValidationRunResults(validationResults[event].id));
    }


    return (
        <Box className={classes.root}>
            <Box className={classes.rootHeader}>
                <Typography className={classes.title}>
                    Личный кабинет
                </Typography>
                <Button onClick={handleLogout}>
                    Выйти
                </Button>
            </Box>
            <Typography className={classes.userTitle}>
                Здравствуйте, {composeUserName()}
            </Typography>
            <Button variant="contained" onClick={validate}
                    color="primary">
                Валидировать учебные планы в ИСУ
            </Button>
            {
                validationResults?.length ?
                    <ValidationResults
                        labels={validationResults.map((result: any) => moment(result.run_datetime).format(FULL_DATE_FORMAT))}
                        data={validationResults.map((result: any) => result.invalid_plans_count)}
                        onClick={loadAcademicPlanValidation}
                    />
                    : ''
            }
            {
                validationRunResults?.length ?
                    <ValidationRunResultList validationRunResults={validationRunResults}></ValidationRunResultList>
                    : ''
            }
            <MyGroups/>
            <MergeWorkProgramsBlock className={classes.copyRpdContainer}/>
            <MyWorkProgramsList/>
        </Box>
    )
};

const ValidationResults = (props: any) => {
    const {labels, data, onClick} = props
    const [chart, setChart] = useState()
    const refChart = useRef<any>()
    const classes = useStyles();

    function firstRanderChart(): void {
        if (refChart.current) {
            renderChart()
        }
    }

    useEffect(firstRanderChart, [refChart.current])

    function renderChart() {
        if (chart) {
            //@ts-ignore
            chart?.destroy()
        }
        //@ts-ignore
        const chartLocal = new Chart(refChart.current.getContext('2d'), {
            type: "line",
            options: {
                scales: {
                    y: {
                        min: 0,
                    },
                },
                events: ['click'],
                interaction: {
                    mode: 'nearest'
                },
                onClick: (event, smt, chart) => {
                    // @ts-ignore
                    const activePoints = chart.getElementsAtEventForMode(event.native, 'nearest', { intersect: true }, false);
                    console.log('click event', activePoints)
                    if (activePoints.length) {
                        onClick(activePoints[0].index)
                    }
                }
            },
            data: {
                labels,
                datasets: [{
                    label: 'Невалидных учебных планов',
                    data,
                    borderColor: "red",
                    pointRadius: 3,
                }]
            },
        })
        //@ts-ignore
        setChart(chartLocal)
    }

    return <div className={classes.wrapperChart}>
        <canvas ref={refChart} height={300}/>
    </div>
};

const ValidationRunResultList = ({validationRunResults}: any) => {
    const TABLE_HEADERS = [
        {title: 'Идентификатор', key: 'id'},
        {title: 'Название учебной программы', key: 'title'},
        {title: 'Год начала', key: 'year'},
        {title: 'Ошибка в количестве блоков', key: 'has_blocks_error'},
        {title: 'Ошибка в количестве часов', key: 'has_hours_error'},
        {title: 'Ошибка в модулях специализации', key: 'has_specialization_error'},
        {title: 'Ошибка в модулях ОГНП', key: 'has_ognp_error'},
        {title: 'Ошибка в формате дисциплин', key: 'has_format_error'},
    ];

    const classes = useStyles();

    return (
        <Box className={classes.tableWrap}>
            <Typography className={classes.itemTitle}>
                Результат запуска валидации
            </Typography>
            <Table stickyHeader size='small'>
                <TableHead>
                    <TableRow>
                        {TABLE_HEADERS.map(({title, key}) => {
                            return <TableCell key={key}>{title}</TableCell>
                        })}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {validationRunResults.map((item: any) =>
                        <TableRow key={item.id}>
                            <TableCell>
                                {item.implementation_of_academic_plan.id}
                            </TableCell>
                            <TableCell className={classes.link}>
                                {item.implementation_of_academic_plan.title}
                            </TableCell>
                            <TableCell>
                                {item.implementation_of_academic_plan.year}
                            </TableCell>
                            <TableCell>
                                {item.has_blocks_error ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>}
                            </TableCell>
                            <TableCell>
                                {item.has_hours_error ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>}
                            </TableCell>
                            <TableCell>
                                {item.has_specialization_error ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>}
                            </TableCell>
                            <TableCell>
                                {item.has_ognp_error ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>}
                            </TableCell>
                            <TableCell>
                                {item.has_format_error ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    )
};

const MyGroups = () => {
    const classes = useStyles();
    const userGroups = useSelector(getUserGroups);

    if (!userGroups.length) {
        return null;
    }

    return (
        <Box>
            <Typography className={classes.itemTitle}>
                Вы состоите в группах
            </Typography>
            <Box className={classes.userGroups}>
                {userGroups.map((userGroup: string) => {
                    return <Chip className={classes.userGroup} key={userGroup} label={userGroup}/>
                })}
            </Box>
        </Box>
    )
};

const MyWorkProgramsList = () => {
    const dispatch = useDispatch();
    const allCount = useSelector(getAllCount)
    const currentPage = useSelector(getCurrentPage)
    const workProgramList = useSelector(getWorkProgramList);

    const TABLE_HEADERS = [
        {title: 'Код', key: 'code'},
        {title: 'Название', key: 'title'},
        {title: 'Уровень образования', key: 'qualification'},
        {title: 'Авторский состав', key: 'authors'},
        {title: 'Дата создания', key: 'creation-date'},
    ];

    const classes = useStyles();

    const handleChangePage = (event: any, page: number) => {
        dispatch(userProfileActions.changeCurrentPage(page))
        dispatch(userProfileActions.getUserWorkProgramsList())
    };

    return (
        <Box className={classes.tableWrap}>
            <Typography className={classes.itemTitle}>
                Ваши рабочие программы
            </Typography>
            {workProgramList.length > 0 ? (
                <div>
                    <Table stickyHeader size='small'>
                        <TableHead>
                            <TableRow>
                                {TABLE_HEADERS.map(({title, key}) => {
                                    return <TableCell key={key}>{title}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {workProgramList.map((workProgram: WorkProgram) =>
                                <TableRow key={workProgram[WorkProgramGeneralFields.ID]}>
                                    <TableCell>
                                        {workProgram[WorkProgramGeneralFields.CODE]}
                                    </TableCell>
                                    <TableCell className={classes.link}>
                                        <Link
                                            target="_blank"
                                            to={appRouter.getWorkProgramLink(workProgram[WorkProgramGeneralFields.ID])}
                                        >
                                            {workProgram[WorkProgramGeneralFields.TITLE]}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {get(specialization.find(el => el.value === workProgram[WorkProgramGeneralFields.QUALIFICATION]), 'label', '')}
                                    </TableCell>
                                    <TableCell>
                                        {workProgram[WorkProgramGeneralFields.AUTHORS]}
                                    </TableCell>
                                    <TableCell>
                                        {moment(workProgram[WorkProgramGeneralFields.APPROVAL_DATE]).format(FULL_DATE_FORMAT)}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className={classes.footer}>
                        <Pagination
                            count={Math.ceil(allCount / 10)}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="primary"
                        />
                    </div>
                </div>
            ) : <Typography>У вас пока нет рабочих программ</Typography>}
        </Box>
    )
};
