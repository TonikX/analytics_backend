import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
// @ts-ignore
import Scrollbars from "react-custom-scrollbars";

import classNames from 'classnames';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import withStyles from '@material-ui/core/styles/withStyles';

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import CourseCreateModal from "./CreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {CompetenceProps, CompetenceType} from './types';
import {CompetenceFields} from './enum';

import connect from './Competences.connect';
import styles from './Competences.styles';

class Competences extends React.Component<CompetenceProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getCompetences();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteCompetence(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (competence: CompetenceType) => () => {
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
        this.props.actions.getCompetences();
    }, 300);

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getCompetences();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getCompetences();
    }

    render() {
        const {classes, competences, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        // @ts-ignore
        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Компетенции

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
                        <Typography className={classNames(classes.marginRight, classes.numberCell)}>
                            Номер
                            <SortingButton changeMode={this.changeSorting(CompetenceFields.NUMBER)}
                                           mode={sortingField === CompetenceFields.NUMBER ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Название компетенции
                            <SortingButton changeMode={this.changeSorting(CompetenceFields.TITLE)}
                                           mode={sortingField === CompetenceFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {competences.map(competence =>
                                <div className={classes.row} key={competence[CompetenceFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.numberCell)}> {competence[CompetenceFields.NUMBER]} </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}> {competence[CompetenceFields.TITLE]} </Typography>
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(competence[CompetenceFields.ID])}>
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
                    <TablePagination count={allCount}
                                     component="div"
                                     page={currentPage - 1}
                                     rowsPerPageOptions={[]}
                                     onChangePage={this.handleChangePage}
                                     //@ts-ignore
                                     rowsPerPage={10}
                                     onChangeRowsPerPage={()=>{}}
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
                               confirmText={'Вы точно уверены, что хотите удалить компетенцию?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить компетенцию'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(Competences));
