import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom';
import get from 'lodash/get';
import moment from 'moment';

import Pagination from "@mui/lab/Pagination";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import MergeWorkProgramsBlock from "../MergeWorkPrograms";
import {getUserData, getUserGroups} from '../../layout/getters';
import layoutActions from '../../layout/actions';
import {appRouter} from '../../service/router-service';
import UserService from '../../service/user-service';
import {WorkProgramGeneralFields} from '../WorkProgram/enum';
import {specialization} from '../WorkProgram/constants';
import {FULL_DATE_FORMAT} from '../../common/utils';

import {WorkProgram} from './types';
import {getAllCount, getCurrentPage, getWorkProgramList} from "./getters";
import userProfileActions from './actions';
import {useStyles} from './UserProfile.styles';

const userService = UserService.factory();

export default () => {
    const classes = useStyles();
    const userData = useSelector(getUserData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userProfileActions.changeCurrentPage(1));
        dispatch(userProfileActions.getUserWorkProgramsList())
    }, []);

    const handleLogout = () => {
        userService.logout();
        dispatch(layoutActions.setAuthFalse());
        navigate(appRouter.getSignInRoute());
    };

    const composeUserName = () => `${userData.first_name} ${userData.last_name}`;

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
            <MyGroups/>
            <MergeWorkProgramsBlock className={classes.copyRpdContainer}/>
            <MyWorkProgramsList/>
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
                            count={allCount}
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
