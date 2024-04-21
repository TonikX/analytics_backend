import * as React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import {Link} from 'react-router-dom';
import {Typography} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Pagination from '@mui/lab/Pagination';
import {specializationObject} from "../WorkProgram/constants";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Notifications from "../Profile/Notifications/Notifications";
import MergeWorkProgramsBlock from "../MergeWorkPrograms";
import {EmailWidget} from "../EmailWidget";
import {FULL_DATE_FORMAT} from "../../common/utils";
import moment from "moment";
import Chip from "@mui/material/Chip";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import actions from "./actions";
import {useStyles} from "./DodProfile.styles";
import {getAllCount, getCurrentPage, getTableMode, getUserGroups, getUserName, getWorkProgramList} from "./getters";
import {rootState} from "../../store/reducers";
import {appRouter} from "../../service/router-service";
import {AddModuleToPlan} from "../AddModuleToPlan";

export default () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const workProgramList = useSelector((state: rootState) => getWorkProgramList(state))
    const allCount = useSelector((state: rootState) => getAllCount(state))
    const currentPage = useSelector((state: rootState) => getCurrentPage(state))
    const tableMode = useSelector((state: rootState) => getTableMode(state))
    const userName = useSelector((state: rootState) => getUserName(state))
    const userGroups = useSelector((state: rootState) => getUserGroups(state))

    useEffect(() => {
        dispatch(actions.getDodWorkProgramsList())
        dispatch(actions.getUserName())
        dispatch(actions.getUserGroups())
    }, []);


    const handleChangePage = (event: any, page: number) => {
        dispatch(actions.changeCurrentPage(page))
        dispatch(actions.getDodWorkProgramsList())
    };

    const changeTableMode = (event: any, newValue: any) => {
        dispatch(actions.changeCurrentPage(1))
        dispatch(actions.changeTableMode(newValue))
        dispatch(actions.getDodWorkProgramsList())
    };

   return (
        <Paper className={classes.root}>
            <div>
                <Typography className={classes.userTitle}> {userName?.first_name} {userName?.last_name}</Typography>
                <div className={classes.groupsList}>
                    {userGroups.map((item: any, key: number) => <Chip key={key} label={item} className={classes.group} />)}
                </div>
            </div>
            <div className={classes.row}>
                <EmailWidget/>
                <AddModuleToPlan/>
            </div>
            <MergeWorkProgramsBlock className={classes.copyRpdContainer}/>
            <div className={classes.mainContainer}>
                <div className={classes.dodProfileContainer}>
                    <Typography className={classes.title}>

                        <Tabs value={tableMode}
                              onChange={changeTableMode}
                              indicatorColor="primary"
                        >
                            <Tab
                                value={1}
                                label="я эксперт"/>
                            <Tab
                                value={2}
                                label="я редактор"/>
                        </Tabs>
                    </Typography>

                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell>
                                        Код
                                    </TableCell>
                                    <TableCell>
                                        Название
                                    </TableCell>
                                    <TableCell>
                                        Авторский состав
                                    </TableCell>
                                    <TableCell>
                                        Уровень образования
                                    </TableCell>
                                    <TableCell>
                                        Дата
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {workProgramList.map((item: any) =>
                                    <TableRow>
                                        <TableCell> {item.discipline_code}  </TableCell>
                                        <TableCell className={classes.link}>
                                            <Link
                                                target="_blank"
                                                to={appRouter.getWorkProgramLink(item.id)}
                                            >
                                                {item.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell> {item.authors} </TableCell>
                                        <TableCell> {specializationObject[item.qualification]}</TableCell>
                                        <TableCell> {moment(item.approval_date).format(FULL_DATE_FORMAT)}  </TableCell>


                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>

                    </div>

                    <div className={classes.footer}>
                        <Pagination count={Math.ceil(allCount / 10)}
                                    page={currentPage}
                                    onChange={handleChangePage}
                                    color="primary"
                        />
                    </div>
                </div>
                <div className={classes.notificationsContainer}>
                    <Scrollbars>
                        <Notifications hideTitle={true}/>
                    </Scrollbars>
                </div>
            </div>
        </Paper>
    )
}
