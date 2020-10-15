import React from 'react';
import get from 'lodash/get';

import Scrollbars from "react-custom-scrollbars";
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import withStyles from '@material-ui/core/styles/withStyles';

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";

import ConfirmDialog from "../../../components/ConfirmDialog";
import SortingButton from "../../../components/SortingButton";
import CreateModal from "./CreateModal";
import {SortingType} from "../../../components/SortingButton/types";

import {SkillsProps, SkillType} from '../types';
import {ProfessionsFields} from '../enum';

import {levels} from '../constants';

import connect from './Skills.connect';
import styles from './Skills.styles';

class Skills extends React.Component<SkillsProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getSkills(this.getProfessionId());
        this.props.actions.getProfession(this.getProfessionId());
    }

    getProfessionId = () => get(this, 'props.match.params.id', 0);

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteSkill({
            [ProfessionsFields.ID]: deleteConfirmId,
            [ProfessionsFields.PROFESSION]: this.getProfessionId()
        });
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (item: SkillType) => () => {
        this.props.actions.openDialog({
            ...item,
            [ProfessionsFields.PROFESSION]: this.getProfessionId()
        });
    }

    handleCreate = () => {
        this.props.actions.openDialog({
            [ProfessionsFields.PROFESSION]: this.getProfessionId()
        });
    }

    changeFilter = () => {
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getSkills(this.getProfessionId());
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getSkills(this.getProfessionId());
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getSkills(this.getProfessionId());
    }

    render() {
        const {classes, skillList, allCount, currentPage, sortingField, sortingMode, profession} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Навыки профессии «{get(profession, ProfessionsFields.TITLE, '')}»
                </Typography>

                <div className={classes.tableWrap}>
                    <div className={classNames(classes.listItem, classes.header)}>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Навык
                            <SortingButton changeMode={this.changeSorting(ProfessionsFields.NAME)}
                                           mode={sortingField === ProfessionsFields.NAME ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.roleCell)}>
                            Уровень
                            <SortingButton changeMode={this.changeSorting(ProfessionsFields.LEVEL)}
                                           mode={sortingField === ProfessionsFields.LEVEL ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {skillList.map(item =>
                                <div className={classes.listItem} key={item[ProfessionsFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {item[ProfessionsFields.ITEM][ProfessionsFields.NAME]}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.roleCell)}>
                                        {get(levels, item[ProfessionsFields.LEVEL])}
                                    </Typography>
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(item[ProfessionsFields.ID])}>
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

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить навык?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить навык'}
                               confirmButtonText={'Удалить'}
                />

                <CreateModal />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(Skills));
