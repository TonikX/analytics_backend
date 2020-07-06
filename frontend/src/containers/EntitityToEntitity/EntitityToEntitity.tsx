import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';

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
import TrainingEntitiesCreateModal from "./TrainingEntitiesCreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {EntityToEntityProps, EntityToEntityType} from './types';
import {EntityToEntityFields} from './enum';

import connect from './EntitityToEntitity.connect';
import styles from './EntitityToEntitity.styles';
import {SubjectAreaFields} from "../SubjectArea/enum";

class EntitityToEntitity extends React.Component<EntityToEntityProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getEntityToEntityList();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteEntityToEntity(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (item: EntityToEntityType) => () => {
        this.props.actions.openDialog(item);
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
        this.props.actions.getEntityToEntityList();
    }, 300);

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getEntityToEntityList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getEntityToEntityList();
    }

    render() {
        const {classes, trainingEntities, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Связи

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
                    <div className={classNames(classes.listItem, classes.header)}>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Сущность 1
                            <SortingButton changeMode={this.changeSorting(EntityToEntityFields.TITLE)}
                                           mode={sortingField === EntityToEntityFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>

                        <Typography className={classNames(classes.marginRight)}>
                            Сущность 2
                            <SortingButton changeMode={this.changeSorting(EntityToEntityFields.SUBJECT_AREA)}
                                           mode={sortingField === EntityToEntityFields.SUBJECT_AREA ? sortingMode : ''}
                            />
                        </Typography>

                        <Typography className={classNames(classes.marginRight)}>
                            Связь
                            <SortingButton changeMode={this.changeSorting(EntityToEntityFields.SUBJECT_AREA)}
                                           mode={sortingField === EntityToEntityFields.SUBJECT_AREA ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {trainingEntities.map(item =>
                                <div className={classes.listItem} key={item[EntityToEntityFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {item[EntityToEntityFields.TITLE]}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight)}>
                                        {item[EntityToEntityFields.SUBJECT_AREA][SubjectAreaFields.TITLE]}
                                    </Typography>
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(item[EntityToEntityFields.ID])}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={this.handleClickEdit(item)}>
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

                <TrainingEntitiesCreateModal />

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить учебную сущность?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить учебную сущность'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(EntitityToEntitity));
