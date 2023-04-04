import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
// @ts-ignore
import Scrollbars from "react-custom-scrollbars-2";

import classNames from 'classnames';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import {withStyles} from '@mui/styles';

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import CourseCreateModal from "./CreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {IndicatorProps, IndicatorType} from './types';
import {IndicatorsFields} from './enum';
import {CompetenceFields} from "../Competences/enum";

import connect from './Indicators.connect';
import styles from './Indicators.styles';
import Pagination from "@mui/lab/Pagination";

class Indicators extends React.Component<IndicatorProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getIndicators();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteIndicator(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (competence: IndicatorType) => () => {
        this.props.actions.openDialog(competence);
    }

    handleCreate = () => {
        this.props.actions.openDialog();
    }

    handleChangeSearchQuery = (event: React.ChangeEvent) => {
        this.changeSearch(get(event, 'target.value', ''));
    }

    changeSearch = debounce((value: string): void => {
        this.props.actions.changeSearchQuery(value);
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getIndicators();
    }, 300);

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getIndicators();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getIndicators();
    }

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {indicators, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Индикаторы

                    <TextField placeholder="Поиск"
                               variant="outlined"
                               InputProps={{
                                   classes: {
                                       root: classes.searchInput
                                   },
                                   startAdornment: <SearchOutlined />,
                               }}
                               onChange={this.handleChangeSearchQuery}
                    />
                </Typography>

                <div className={classes.tableWrap}>
                    <div className={classNames(classes.row, classes.header)}>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Индикатор
                            <SortingButton changeMode={this.changeSorting(IndicatorsFields.NUMBER)}
                                           mode={sortingField === IndicatorsFields.NUMBER ? sortingMode : ''}
                            />
                        </Typography>

                        <Typography className={classNames(classes.marginRight, classes.competenceCell)}>
                            Компетенция
                            <SortingButton changeMode={this.changeSorting(IndicatorsFields.COMPETENCE)}
                                           mode={sortingField === IndicatorsFields.COMPETENCE ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {indicators.map(competence =>
                                <div className={classes.row} key={competence[IndicatorsFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {competence[IndicatorsFields.NUMBER]} {competence[IndicatorsFields.TITLE]}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.competenceCell)}>
                                        {competence[IndicatorsFields.COMPETENCE][CompetenceFields.NUMBER]} {competence[IndicatorsFields.COMPETENCE][CompetenceFields.TITLE]}
                                    </Typography>
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(competence[IndicatorsFields.ID])}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={this.handleClickEdit(competence)}>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            )}
                        </Scrollbars>
                    </div>
                </div>

                <div className={classes.footer}>
                    <Pagination count={allCount}
                                page={currentPage}
                                onChange={this.handleChangePage}
                                color="primary"
                    />

                    <Fab color="secondary"
                         classes={{
                             root: classes.addIcon
                         }}
                         onClick={this.handleCreate}
                    >
                        <AddIcon/>
                    </Fab>
                </div>

                <CourseCreateModal />

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить индикатор?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить индикатор'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(Indicators));
