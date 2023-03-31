import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import classNames from 'classnames';
import {Link} from "react-router-dom";

import Scrollbars from "react-custom-scrollbars";

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

import withStyles from '@mui/material/styles/withStyles';

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";

import {DirectionFields} from "../Direction/enum";
import {EducationalPlanFields} from "../EducationalPlan/enum";
import {IndividualEducationalPlanFields} from './enum';

import {appRouter} from "../../service/router-service";
import {IndividualEducationalPlansProps} from './types';

import connect from './IndividualEducationalPlans.connect';
import styles from './IndividualEducationalPlans.styles';

class IndividualEducationalPlans extends React.Component<IndividualEducationalPlansProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getIndividualEducationalPlans();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteIndividualEducationalPlans(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleChangeSearchQuery = (event: React.ChangeEvent) => {
        this.changeSearch(get(event, 'target.value', ''));
    }

    changeSearch = debounce((value: string): void => {
        this.props.actions.changeSearchQuery(value);
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getIndividualEducationalPlans();
    }, 300);

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getIndividualEducationalPlans();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getIndividualEducationalPlans();
    }

    render() {
        const {classes, IndividualEducationalPlans, allCount, currentPage, sortingField, sortingMode, canEdit} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <div className={classes.rootHeader}>
                    <Typography className={classes.title}> Индивидуальные учебные планы </Typography>

                    <TextField placeholder="Поиск"
                               variant="outlined"
                               InputProps={{
                                   classes: {
                                       root: classes.searchInput
                                   },
                                   startAdornment: <SearchOutlined />,
                               }}
                               onChange={this.handleChangeSearchQuery}
                               className={classes.searchWrap}
                    />
                </div>

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell>
                                        Направление
                                        <SortingButton changeMode={this.changeSorting(IndividualEducationalPlanFields.DIRECTION)}
                                                       mode={sortingField === IndividualEducationalPlanFields.DIRECTION ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Номер направления
                                        <SortingButton changeMode={this.changeSorting(IndividualEducationalPlanFields.NUMBER)}
                                                       mode={sortingField === IndividualEducationalPlanFields.NUMBER ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Учебный план
                                        <SortingButton changeMode={this.changeSorting(IndividualEducationalPlanFields.EDUCATION_PLAN)}
                                                       mode={sortingField === IndividualEducationalPlanFields.EDUCATION_PLAN ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Год
                                        <SortingButton changeMode={this.changeSorting(IndividualEducationalPlanFields.YEAR)}
                                                       mode={sortingField === IndividualEducationalPlanFields.YEAR ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    {canEdit && <TableCell />}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {IndividualEducationalPlans.map(IndividualEducationalPlans => {
                                    const academicPlan = IndividualEducationalPlans[IndividualEducationalPlanFields.IMPLEMENTATION_OF_ACADEMIC_PLAN];

                                    return (
                                        <TableRow key={IndividualEducationalPlans[IndividualEducationalPlanFields.ID]}
                                                  className={classNames({[classes.bigRow]: !canEdit})}
                                        >
                                            <TableCell>
                                                {academicPlan[IndividualEducationalPlanFields.DIRECTION][DirectionFields.TITLE]}
                                            </TableCell>
                                            <TableCell>
                                                {academicPlan[IndividualEducationalPlanFields.DIRECTION][DirectionFields.NUMBER]}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    to={appRouter.getTrajectoryPlanDetailLink(IndividualEducationalPlans[IndividualEducationalPlanFields.ID])}
                                                    target="_blank"
                                                    className={classes.link}
                                                >
                                                    {academicPlan[IndividualEducationalPlanFields.EDUCATION_PLAN][EducationalPlanFields.PROFILE]}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {academicPlan[IndividualEducationalPlanFields.YEAR]}
                                            </TableCell>
                                            {canEdit &&
                                                <TableCell>
                                                    <div className={classes.actions}>
                                                        <IconButton
                                                            onClick={this.handleClickDelete(IndividualEducationalPlans[IndividualEducationalPlanFields.ID])}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            }
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Scrollbars>

                <div className={classes.footer}>
                    <TablePagination count={allCount}
                                     component="div"
                                     page={currentPage - 1}
                                     rowsPerPageOptions={[]}
                                     onChangePage={this.handleChangePage}
                                     //@ts-ignore
                                     rowsPerPage={10}
                                     onChangeRowsPerPage={()=>{}}
                    />
                </div>

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить индивидуальную образовательную траекторию?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить индивидуальную образовательную траекторию'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(IndividualEducationalPlans));
