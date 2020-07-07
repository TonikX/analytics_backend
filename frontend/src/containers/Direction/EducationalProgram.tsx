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

import {EducationalProgramProps, DirectionType} from './types';
import {DirectionFields} from './enum';

import connect from './EducationalProgram.connect';
import styles from './EducationalProgram.styles';
import {specialization} from "../WorkProgram/data";

class EducationalProgram extends React.Component<EducationalProgramProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getDirections();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteDirection(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (competence: DirectionType) => () => {
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
        this.props.actions.getDirections();
    }, 300);

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getDirections();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getDirections();
    }

    render() {
        const {classes, educationalProgram, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Направления
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
                            Название
                            <SortingButton changeMode={this.changeSorting(DirectionFields.TITLE)}
                                           mode={sortingField === DirectionFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.numberCell)}>
                            Номер
                            <SortingButton changeMode={this.changeSorting(DirectionFields.NUMBER)}
                                           mode={sortingField === DirectionFields.NUMBER ? sortingMode : ''}
                            />
                        </Typography>

                        <Typography className={classNames(classes.marginRight, classes.qualificationCell)}>
                            Квалификация
                            <SortingButton changeMode={this.changeSorting(DirectionFields.QUALIFICATION)}
                                           mode={sortingField === DirectionFields.QUALIFICATION ? sortingMode : ''}
                            />
                        </Typography>

                        <Typography className={classNames(classes.marginRight, classes.facultyCell)}>
                            Факультет
                            <SortingButton changeMode={this.changeSorting(DirectionFields.FACULTY)}
                                           mode={sortingField === DirectionFields.FACULTY ? sortingMode : ''}
                            />
                        </Typography>

                        <Typography className={classNames(classes.marginRight, classes.educationFormCell)}>
                            Форма обучения
                            <SortingButton changeMode={this.changeSorting(DirectionFields.EDUCATION_FORM)}
                                           mode={sortingField === DirectionFields.EDUCATION_FORM ? sortingMode : ''}
                            />
                        </Typography>

                        <Typography className={classNames(classes.marginRight, classes.profileCell)}>
                            Профиль
                            <SortingButton changeMode={this.changeSorting(DirectionFields.EDUCATIONAL_PROFILE)}
                                           mode={sortingField === DirectionFields.EDUCATIONAL_PROFILE ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {educationalProgram.map(competence =>
                                <div className={classes.row} key={competence[DirectionFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}> {competence[DirectionFields.TITLE]} </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.numberCell)}> {competence[DirectionFields.NUMBER]} </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.qualificationCell)}>
                                        {get(specialization.find(item => item.value === competence[DirectionFields.QUALIFICATION]), 'label', '')}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.facultyCell)}> {competence[DirectionFields.FACULTY]} </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.educationFormCell)}>
                                        {competence[DirectionFields.EDUCATION_FORM] === 'extramural' ? 'Заочная' : 'Очная'}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.profileCell)}> {competence[DirectionFields.EDUCATIONAL_PROFILE]} </Typography>
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(competence[DirectionFields.ID])}>
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
                               confirmText={'Вы точно уверены, что хотите удалить направление?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить направление'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(EducationalProgram));
