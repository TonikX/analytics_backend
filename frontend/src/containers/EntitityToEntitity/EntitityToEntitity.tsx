import React from 'react';
import get from 'lodash/get';

import Scrollbars from "react-custom-scrollbars";

import classNames from 'classnames';

import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import withStyles from '@mui/material/styles/withStyles';

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import TrainingEntitiesCreateModal from "./TrainingEntitiesCreateModal";
import {SortingType} from "../../components/SortingButton/types";
import TableSearchButton from "../../components/TableSearchButton";
import TableFilter from "../../components/TableFilter";

import {EntityToEntityProps, EntityToEntityType} from './types';
import {EntityToEntityFields} from './enum';
import {TrainingEntitiesFields} from "../TrainingEntities/enum";

import {relations} from './constants';

import connect from './EntitityToEntitity.connect';
import styles from './EntitityToEntitity.styles';
import Pagination from "@mui/lab/Pagination";

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

    handleChangeSearchItem1 = (searchQuery: string) => {
        this.props.actions.changeSearchQuery({[EntityToEntityFields.ITEM1] : searchQuery});
        this.changeFilter();
    }

    handleChangeSearchItem2 = (searchQuery: string) => {
        this.props.actions.changeSearchQuery({[EntityToEntityFields.ITEM2] : searchQuery});
        this.changeFilter();
    }

    changeFilter = () => {
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getEntityToEntityList();
    }

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getEntityToEntityList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getEntityToEntityList();
    }

    handleSelectFilter = (items: Array<any>) => {
        this.props.actions.changeSearchQuery({[EntityToEntityFields.RELATION] : get(items, 0, '')});
        this.changeFilter();
    }

    render() {
        const {classes, trainingEntities, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Связи
                </Typography>

                <div className={classes.tableWrap}>
                    <div className={classNames(classes.listItem, classes.header)}>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Сущность 1
                            <SortingButton changeMode={this.changeSorting(EntityToEntityFields.ITEM1)}
                                           mode={sortingField === EntityToEntityFields.ITEM1 ? sortingMode : ''}
                            />
                            <TableSearchButton handleSearch={this.handleChangeSearchItem1} />
                        </Typography>

                        <Typography className={classNames(classes.marginRight, classes.relationCell)}>
                            Связь
                            <SortingButton changeMode={this.changeSorting(EntityToEntityFields.RELATION)}
                                           mode={sortingField === EntityToEntityFields.RELATION ? sortingMode : ''}
                            />
                            <TableFilter items={relations} handleSelect={this.handleSelectFilter} />
                        </Typography>

                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Сущность 2
                            <SortingButton changeMode={this.changeSorting(EntityToEntityFields.ITEM2)}
                                           mode={sortingField === EntityToEntityFields.ITEM2 ? sortingMode : ''}
                            />
                            <TableSearchButton handleSearch={this.handleChangeSearchItem2} />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {trainingEntities.map(item =>
                                <div className={classes.listItem} key={item[EntityToEntityFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {item[EntityToEntityFields.ITEM1][TrainingEntitiesFields.TITLE]}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.relationCell)}>
                                        {get(relations, item[EntityToEntityFields.RELATION])}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {item[EntityToEntityFields.ITEM2][TrainingEntitiesFields.TITLE]}
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
                    <Pagination count={Math.ceil(allCount / 10)}
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
