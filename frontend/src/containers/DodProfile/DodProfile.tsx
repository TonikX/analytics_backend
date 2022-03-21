import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import {Typography} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Pagination from '@material-ui/lab/Pagination';
import {specializationObject} from "../WorkProgram/constants";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Notifications from "../Profile/Notifications/Notifications";
import MergeWorkProgramsBlock from "../MergeWorkPrograms";
import {FULL_DATE_FORMAT} from "../../common/utils";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import actions from "./actions";
import {useStyles} from "./DodProfile.styles";
import {getAllCount, getCurrentPage, getTableMode, getUserGroups, getUserName, getWorkProgramList} from "./getters";
import {rootState} from "../../store/reducers";

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
                <div className={classes.userTitle}> {userName?.first_name} {userName?.last_name}</div>
                <div className={classes.groupsList}>
                    {userGroups.map((item: any) => <Chip label={item} className={classes.group} />)}
                </div>
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
                            <TableHead>
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
                                        <TableCell> {item.title}  </TableCell>
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




