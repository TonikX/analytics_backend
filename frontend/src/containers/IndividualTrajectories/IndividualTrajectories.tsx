import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import classNames from 'classnames';
import {Link} from "react-router-dom";

import Scrollbars from "react-custom-scrollbars";

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Switch from "@material-ui/core/Switch";

import withStyles from '@material-ui/core/styles/withStyles';

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import CustomizeExpansionPanel from "../../components/CustomizeExpansionPanel";
import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";

import {DirectionFields} from "../Direction/enum";
import {EducationalPlanFields} from "../EducationalPlan/enum";
import {IndividualTrajectoryFields} from './enum';

import {appRouter} from "../../service/router-service";

import {getUserFullName} from "../../common/utils";
import {IndividualTrajectoriesProps} from './types';
import Filters from "./Filters";

import connect from './IndividualTrajectories.connect';
import styles from './IndividualTrajectories.styles';

class IndividualTrajectories extends React.Component<IndividualTrajectoriesProps> {
    state = {
        deleteConfirmId: null,
        showFilters: false
    }

    componentDidMount() {
        this.props.actions.getIndividualTrajectories();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteIndividualTrajectories(deleteConfirmId);
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
        this.props.actions.getIndividualTrajectories();
    }, 300);

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getIndividualTrajectories();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getIndividualTrajectories();
    }

    changeShowOnlyMy = () => {
        const {showOnlyMy} = this.props;

        this.props.actions.showOnlyMy(!showOnlyMy);

        this.props.actions.getIndividualTrajectories();
    }

    render() {
        const {classes, individualTrajectories, allCount, currentPage, sortingField, sortingMode, canEdit, showOnlyMy} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <div className={classes.rootHeader}>
                    <Typography className={classes.title}> Индивидуальные образовательные траектории </Typography>

                    <Typography>
                        <Switch checked={showOnlyMy}
                                onChange={this.changeShowOnlyMy}
                                color="primary"
                        />
                        Показать только мои траектории
                    </Typography>

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

                <CustomizeExpansionPanel label="Фильтрация" details={<Filters />}/>

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell>
                                        Направление
                                        <SortingButton changeMode={this.changeSorting(IndividualTrajectoryFields.DIRECTION)}
                                                       mode={sortingField === IndividualTrajectoryFields.DIRECTION ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Номер направления
                                        <SortingButton changeMode={this.changeSorting(IndividualTrajectoryFields.NUMBER)}
                                                       mode={sortingField === IndividualTrajectoryFields.NUMBER ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Учебный план
                                        <SortingButton changeMode={this.changeSorting(IndividualTrajectoryFields.EDUCATION_PLAN)}
                                                       mode={sortingField === IndividualTrajectoryFields.EDUCATION_PLAN ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Год
                                        <SortingButton changeMode={this.changeSorting(IndividualTrajectoryFields.YEAR)}
                                                       mode={sortingField === IndividualTrajectoryFields.YEAR ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Владелец
                                        <SortingButton changeMode={this.changeSorting(IndividualTrajectoryFields.YEAR)}
                                                       mode={sortingField === IndividualTrajectoryFields.YEAR ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    {canEdit && <TableCell />}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {individualTrajectories.map(individualTrajectories => {
                                    const academicPlan = individualTrajectories[IndividualTrajectoryFields.IMPLEMENTATION_OF_ACADEMIC_PLAN];

                                    return (
                                        <TableRow key={individualTrajectories[IndividualTrajectoryFields.ID]}
                                                  className={classNames({[classes.bigRow]: !canEdit})}
                                        >
                                            <TableCell>
                                                {academicPlan[IndividualTrajectoryFields.DIRECTION][DirectionFields.TITLE]}
                                            </TableCell>
                                            <TableCell>
                                                {academicPlan[IndividualTrajectoryFields.DIRECTION][DirectionFields.NUMBER]}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    to={appRouter.getTrajectoryPlanDetailLink(individualTrajectories[IndividualTrajectoryFields.ID])}
                                                    target="_blank"
                                                    className={classes.link}
                                                >
                                                    {academicPlan[IndividualTrajectoryFields.EDUCATION_PLAN][EducationalPlanFields.PROFILE]}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {academicPlan[IndividualTrajectoryFields.YEAR]}
                                            </TableCell>
                                            <TableCell>
                                                {getUserFullName(individualTrajectories[IndividualTrajectoryFields.USER])}
                                            </TableCell>
                                            {canEdit &&
                                                <TableCell>
                                                    <div className={classes.actions}>
                                                        <IconButton
                                                            onClick={this.handleClickDelete(individualTrajectories[IndividualTrajectoryFields.ID])}>
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

export default connect(withStyles(styles)(IndividualTrajectories));
