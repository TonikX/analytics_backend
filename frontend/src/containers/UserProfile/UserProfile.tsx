import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useHistory, Link} from 'react-router-dom';
import get from 'lodash/get';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import {getUserData, getUserGroups} from '../../layout/getters';
import layoutActions from '../../layout/actions';
import {appRouter} from '../../service/router-service';
import UserService from '../../service/user-service';
import {getWorkProgramList} from '../WorkProgramList/getters';
import workProgramActions from '../WorkProgramList/actions';
import {filterFields} from '../WorkProgramList/enum';
import {WorkProgramGeneralFields} from '../WorkProgram/enum';
import {specialization} from '../WorkProgram/constants';
import {FULL_DATE_FORMAT} from '../../common/utils';

import {WorkProgram} from './types';
import {useStyles} from './UserProfile.styles';

const userService = UserService.factory();

export default () => {
    const classes = useStyles();
    const userData = useSelector(getUserData);
    const userGroups = useSelector(getUserGroups);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        userService.logout();
        dispatch(layoutActions.setAuthFalse());
        history.push(appRouter.getSignInRoute());
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
            <Typography className={classes.itemTitle}>
                Вы состоите в группах
            </Typography>
            <Box className={classes.userGroups}>
                {userGroups.map((userGroup: string) => <Chip className={classes.userGroup} label={userGroup}/>)}
            </Box>
            <MyWorkProgramsList/>
        </Box>
    )
};

const MyWorkProgramsList = () => {
    const TABLE_HEADERS = [
        {title: 'Код', key: 'code'},
        {title: 'Название', key: 'title'},
        {title: 'Уровень образования', key: 'qualification'},
        {title: 'Авторский состав', key: 'authors'},
        {title: 'Дата создания', key: 'creation-date'},
    ];

    const classes = useStyles();
    const dispatch = useDispatch();
    const workProgramList = useSelector(getWorkProgramList);

    useEffect(() => {
        dispatch(workProgramActions.changeCurrentPage(1));
        dispatch(workProgramActions.changeFiltering({[filterFields.ONLY_MY]: true}));
        dispatch(workProgramActions.getWorkProgramList())
    }, []);

    return (
        <Box className={classes.tableWrap}>
            <Typography className={classes.itemTitle}>
                Ваши рабочие программы
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
        </Box>
    )
};
