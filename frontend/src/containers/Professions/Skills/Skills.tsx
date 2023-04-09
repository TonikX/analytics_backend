import React from 'react';
import get from 'lodash/get';

import Scrollbars from "react-custom-scrollbars-2";
import classNames from 'classnames';

import Paper from '@mui/material/Paper';

import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import {withStyles} from '@mui/styles';

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import ConfirmDialog from "../../../components/ConfirmDialog";
import SortingButton from "../../../components/SortingButton";
import CreateModal from "./CreateModal";
import {SortingType} from "../../../components/SortingButton/types";
import {withRouter} from '../../../hoc/WithRouter'

import {SkillsProps, SkillType} from '../types';
import {ProfessionsFields} from '../enum';

import {levels} from '../constants';

import connect from './Skills.connect';
import styles from './Skills.styles';
import Pagination from "@mui/lab/Pagination";

class Skills extends React.Component<SkillsProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getSkills(this.getProfessionId());
        this.props.actions.getProfession(this.getProfessionId());
    }

    getProfessionId = () => get(this, 'props.params.id', 0);

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

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getSkills(this.getProfessionId());
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getSkills(this.getProfessionId());
    }

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {skillList, allCount, currentPage, sortingField, sortingMode, profession} = this.props;
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

//@ts-ignore
export default connect(withStyles(styles)(withRouter(Skills)));
