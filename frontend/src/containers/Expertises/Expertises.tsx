import React, {SyntheticEvent} from 'react';
import Scrollbars from "react-custom-scrollbars-2";
import get from "lodash/get";

import moment from "moment";
import {Link} from "react-router-dom";

import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {withStyles} from '@mui/styles';
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import TableBody from "@mui/material/TableBody";

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
import Pagination from "@mui/lab/Pagination";
import {UserType} from "../../layout/types";
import {PracticeFields} from "../Practice/enum";
import {CertificationFields} from "../FinalCertification/enum";

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

    changeSorting = (field: string) => (mode: SortingType) => {
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
        if (this.props.selectedStatus === status) {
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
                                        <div className={classes.headerCell}>
                                            Рабочая программа
                                            <SortingButton changeMode={this.changeSorting(ExpertisesFields.WORK_PROGRAM)}
                                                           mode={sortingField === ExpertisesFields.WORK_PROGRAM ? sortingMode : ''}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className={classes.qualificationCell}>
                                        <div className={classes.headerCell}>
                                            Уровень
                                            <TableFilter items={specializationObject}
                                                         handleSelect={this.handleSelectQualification}/>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        Эксперты
                                    </TableCell>
                                    <TableCell>
                                        Редакторы
                                    </TableCell>
                                    <TableCell>
                                        <div className={classes.headerCell}>
                                            Дата изменения
                                            <SortingButton
                                                changeMode={this.changeSorting(ExpertisesFields.DATE_OF_LAST_CHANGE)}
                                                mode={sortingField === ExpertisesFields.DATE_OF_LAST_CHANGE ? sortingMode : ''}
                                            />
                                        </div>
                                    </TableCell>

                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expertisesList.map(expertise => {
                                        let link = '';
                                        let title = '';
                                        let editors = [];
                                        if (expertise[ExpertisesFields.WORK_PROGRAM]) {
                                            link = appRouter.getWorkProgramLink(expertise[ExpertisesFields.WORK_PROGRAM][WorkProgramGeneralFields.ID]);
                                            title = expertise[ExpertisesFields.WORK_PROGRAM][WorkProgramGeneralFields.TITLE];
                                            editors = expertise[ExpertisesFields.WORK_PROGRAM][WorkProgramGeneralFields.EDITORS];
                                        } else if (expertise[ExpertisesFields.PRACTICE]) {
                                            link = appRouter.getPracticeLink(expertise[ExpertisesFields.PRACTICE][PracticeFields.ID]);
                                            title = expertise[ExpertisesFields.PRACTICE][PracticeFields.TITLE];
                                            editors = expertise[ExpertisesFields.PRACTICE][PracticeFields.EDITORS];
                                        } else if (expertise[ExpertisesFields.GIA]) {
                                            link = appRouter.getFinalCertificationLink(expertise[ExpertisesFields.GIA][CertificationFields.ID]);
                                            title = expertise[ExpertisesFields.GIA][CertificationFields.TITLE];
                                            editors = expertise[ExpertisesFields.GIA][CertificationFields.EDITORS];
                                        }

                                        if (expertise[ExpertisesFields.EXPERTISE_TYPE] === 'OFERTA') {
                                            title = title + ' (оферта)'
                                        }

                                        const qualification = expertise[ExpertisesFields.WORK_PROGRAM]
                                            ? specializationObject[expertise[ExpertisesFields.WORK_PROGRAM][WorkProgramGeneralFields.QUALIFICATION]]
                                            : '';
                                        return (
                                            <TableRow key={expertise[ExpertisesFields.ID]}>
                                                <TableCell className={classes.cellStatus}
                                                           style={{borderLeftColor: workProgramStatusesColors[expertise[ExpertisesFields.STATUS]]}}
                                                >
                                                    <Link to={link}>
                                                        {title}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{qualification}</TableCell>
                                                <TableCell>
                                                    {expertise[ExpertisesFields.EXPERTS_USERS_IN_RPD]
                                                        .filter((item: any) => get(item, "stuff_status") === 'EX' || get(item, "stuff_status") === 'SE' || get(item, "stuff_status") === 'AU')
                                                        .map((item: ExpertUserInRPDType) => getUserFullName(item[ExpertisesFields.EXPERT])).join(', ')}
                                                </TableCell>
                                                <TableCell>
                                                    {editors?.map((item: UserType) => getUserFullName(item)).join(', ')}
                                                </TableCell>
                                                <TableCell>
                                                    {moment(expertise[ExpertisesFields.DATE_OF_LAST_CHANGE]).format(FULL_DATE_FORMAT)}
                                                </TableCell>
                                                <TableCell className={classes.linkCell}>
                                                    <Link
                                                        to={appRouter.getExpertiseRouteLink(expertise[ExpertisesFields.ID])}>
                                                        <EyeIcon/>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
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
