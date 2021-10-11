import React, {SyntheticEvent} from 'react';
import Scrollbars from "react-custom-scrollbars";
import get from "lodash/get";

import moment from "moment";
import {Link} from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import withStyles from '@material-ui/core/styles/withStyles';
import EyeIcon from "@material-ui/icons/VisibilityOutlined";
import TableBody from "@material-ui/core/TableBody";

import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";
import Search from "../../components/Search";
import WorkProgramStatus from "../../components/WorkProgramStatus";
import TableFilter from "../../components/TableFilter/TableFilter";

import {ExpertisesProps, ExpertUserInRPDType} from './types';
import {ExpertisesFields} from "./enum";

import {FULL_DATE_FORMAT, getUserFullName} from "../../common/utils";

import {WorkProgramGeneralFields} from "../WorkProgram/enum";
import {WorkProgramStatusType} from "../WorkProgram/types";
import {workProgramStatusesColors, workProgramStatusesRussian, specializationObject} from "../WorkProgram/constants";

import {appRouter} from "../../service/router-service";

import connect from './Expertises.connect';
import styles from './Expertises.styles';
import Pagination from "@material-ui/lab/Pagination";
import {UserType} from "../../layout/types";

class Expertises extends React.Component<ExpertisesProps> {
    state = {
        anchorsEl: {}
    }

    componentDidMount() {
        this.props.actions.getExpertisesList();
    }

    handleChangePage = (event: any | null, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getExpertisesList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getExpertisesList();
    }

    handleChangeSearchQuery = (search: string) => {
        this.props.actions.changeSearchQuery(search);
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getExpertisesList();
    }

    handleMenu = (id: number) => (event: SyntheticEvent): void => {
        this.setState({
            anchorsEl: {
                [id]: event.currentTarget
            }
        });
    };

    handleCloseMenu = () => {
        this.setState({anchorsEl: {}});
    };

    handleSelectStatus = (status: WorkProgramStatusType) => {
        this.props.actions.changeCurrentPage(1);
        if (this.props.selectedStatus === status){
            this.props.actions.changeSelectedStatus('')
        } else {
            this.props.actions.changeSelectedStatus(status)
        }
        this.props.actions.getExpertisesList()
    }

    handleSelectQualification = (qualification: Array<string>) => {
        this.props.actions.changeCurrentPage(1);
        this.props.actions.changeSelectedQualification(qualification[0])
        this.props.actions.getExpertisesList()
    }

    render() {
        const {classes, expertisesList, allCount, currentPage, sortingField, sortingMode, selectedStatus} = this.props;

        return (
            <Paper className={classes.root}>
                <div className={classes.titleWrap}>
                    <Typography className={classes.title}> Экспертизы</Typography>

                    <Search handleChangeSearchQuery={this.handleChangeSearchQuery}/>
                </div>

                <div className={classes.statuses}>
                    {Object.keys(workProgramStatusesRussian).map(status =>
                        <WorkProgramStatus status={status}
                                           key={status}
                                           onClick={this.handleSelectStatus}
                                           disabledStyle={selectedStatus !== '' && selectedStatus !== status}
                        />
                    )}
                </div>

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell>
                                        Рабочая программа
                                        <SortingButton changeMode={this.changeSorting(ExpertisesFields.WORK_PROGRAM)}
                                                       mode={sortingField === ExpertisesFields.WORK_PROGRAM ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.qualificationCell}>
                                        Уровень
                                        <TableFilter items={specializationObject} handleSelect={this.handleSelectQualification} />
                                    </TableCell>
                                    <TableCell>
                                        Эксперты
                                    </TableCell>
                                    <TableCell>
                                        Редакторы
                                    </TableCell>
                                    <TableCell>
                                        Дата изменения
                                        <SortingButton changeMode={this.changeSorting(ExpertisesFields.DATE_OF_LAST_CHANGE)}
                                                       mode={sortingField === ExpertisesFields.DATE_OF_LAST_CHANGE ? sortingMode : ''}
                                        />
                                    </TableCell>

                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expertisesList.map(expertise =>
                                    <TableRow key={expertise[ExpertisesFields.ID]}>
                                        <TableCell className={classes.cellStatus}
                                                   style={{borderLeftColor: workProgramStatusesColors[expertise[ExpertisesFields.STATUS]]}}
                                        >
                                            <Link to={appRouter.getWorkProgramLink(expertise[ExpertisesFields.WORK_PROGRAM][WorkProgramGeneralFields.ID])}>
                                                {expertise[ExpertisesFields.WORK_PROGRAM][WorkProgramGeneralFields.TITLE]}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{specializationObject[expertise[ExpertisesFields.WORK_PROGRAM][WorkProgramGeneralFields.QUALIFICATION]]}</TableCell>
                                        <TableCell>
                                            {expertise[ExpertisesFields.EXPERTS_USERS_IN_RPD]
                                                .filter((item: any) => get(item, "stuff_status") === 'EX' || get(item, "stuff_status") === 'SE' || get(item, "stuff_status") === 'AU')
                                                .map((item: ExpertUserInRPDType) => getUserFullName(item[ExpertisesFields.EXPERT])).join(', ')}
                                        </TableCell>
                                        <TableCell>
                                            {expertise[ExpertisesFields.WORK_PROGRAM][WorkProgramGeneralFields.EDITORS].map((item: UserType) => getUserFullName(item)).join(', ')}
                                        </TableCell>
                                        <TableCell>
                                            {moment(expertise[ExpertisesFields.DATE_OF_LAST_CHANGE]).format(FULL_DATE_FORMAT)}
                                        </TableCell>
                                        <TableCell className={classes.linkCell}>
                                            <Link to={appRouter.getExpertiseRouteLink(expertise[ExpertisesFields.ID])}>
                                                <EyeIcon />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Scrollbars>


                <div className={classes.footer}>
                    <Pagination count={Math.ceil(allCount / 10)}
                                page={currentPage}
                                onChange={this.handleChangePage}
                                color="primary"
                    />
                </div>
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(Expertises));
