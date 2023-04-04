import React from 'react';
import {Link} from "react-router-dom";

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
import EyeIcon from '@mui/icons-material/VisibilityOutlined';

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import TrainingEntitiesCreateModal from "./CreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {ProfessionsProps, ProfessionType} from './types';
import {ProfessionsFields} from './enum';

import {appRouter} from "../../service/router-service";

import connect from './Professions.connect';
import styles from './Professions.styles';
import Pagination from "@mui/lab/Pagination";

class Professions extends React.Component<ProfessionsProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getProfessionsList();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteProfession(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (item: ProfessionType) => () => {
        this.props.actions.openDialog(item);
    }

    handleCreate = () => {
        this.props.actions.openDialog();
    }

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getProfessionsList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getProfessionsList();
    }

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {professionsList, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Профессии
                </Typography>

                <div className={classes.tableWrap}>
                    <div className={classNames(classes.listItem, classes.header)}>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Название
                            <SortingButton changeMode={this.changeSorting(ProfessionsFields.TITLE)}
                                           mode={sortingField === ProfessionsFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {professionsList.map(item =>
                                <div className={classes.listItem} key={item[ProfessionsFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {item[ProfessionsFields.TITLE]}
                                    </Typography>
                                    <div className={classes.actions}>
                                        <IconButton>
                                            <Link style={{textDecoration: 'none', height: '23px', color: 'rgba(0, 0, 0, 0.54)'}}
                                                  to={appRouter.getProfessionSkillsRouteLink(item[ProfessionsFields.ID])}>
                                                <EyeIcon />
                                            </Link>
                                        </IconButton>
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
                    <Pagination count={allCount}
                                page={currentPage}
                                //@ts-ignore
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
                               confirmText={'Вы точно уверены, что хотите удалить профессию?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить профессию'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(Professions));
