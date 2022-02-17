import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
// @ts-ignore
import Scrollbars from "react-custom-scrollbars";

import classNames from 'classnames';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
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
import ProfessionalStandardCreateModal from "../ProfessionalStandards/CreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {ProfessionalStandardsType} from './types';
import {ProfessionalStandardFields} from './enum';
import {ProfessionalStandardsProps} from "./types";

import connect from './ProfessionalStandards.connect';
import styles from './ProfessionalStandarts.styles';
import Pagination from "@material-ui/lab/Pagination";
import {Link} from "react-router-dom";
import {appRouter} from "../../service/router-service";
import {withRouter} from "react-router-dom";

class ProfessionalStandards extends React.Component<ProfessionalStandardsProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getProfessionalStandards();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteProfessionalStandard(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (professionalStandard: ProfessionalStandardsType) => () => {
        this.props.actions.openDialog(professionalStandard);
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
        this.props.actions.getProfessionalStandards();
    }, 300);

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getProfessionalStandards();
    }

    changeSorting = (field: string) => (mode: SortingType) => {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getProfessionalStandards();
    }

    changeRoute = (id: any) => () => {
        //@ts-ignore
        this.props.history.push(appRouter.getProfessionalStandardIDRoute(id))
    }

    render() {
        const {classes, professionalStandards, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Профессиональные стандарты

                    <TextField placeholder="Поиск"
                               variant="outlined"
                               InputProps={{
                                   classes: {
                                       root: classes.searchInput
                                   },
                                   startAdornment: <SearchOutlined/>,
                               }}
                               onChange={this.handleChangeSearchQuery}
                    />
                </Typography>

                <div className={classes.tableWrap}>
                    <div className={classNames(classes.row, classes.header)}>
                        <Typography className={classNames(classes.marginRight, classes.numberCell)}>
                            Номер
                            <SortingButton changeMode={this.changeSorting(ProfessionalStandardFields.NUMBER)}
                                           mode={sortingField === ProfessionalStandardFields.NUMBER ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Название стандарта
                            <SortingButton changeMode={this.changeSorting(ProfessionalStandardFields.TITLE)}
                                           mode={sortingField === ProfessionalStandardFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>


                        <Typography className={classNames(classes.marginRight, classes.codeCell)}>
                            Код ПС
                            <SortingButton changeMode={this.changeSorting(ProfessionalStandardFields.CODE)}
                                           mode={sortingField === ProfessionalStandardFields.CODE ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classes.marginRight}>
                            Профессиональный стандарт
                            <SortingButton changeMode={this.changeSorting(ProfessionalStandardFields.NAME)}
                                           mode={sortingField === ProfessionalStandardFields.NAME ? sortingMode : ''}
                            />
                        </Typography>


                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {professionalStandards.map(professionalStandard =>
                                <div className={classes.row} key={professionalStandard[ProfessionalStandardFields.ID]}
                                >

                                    <Typography
                                        className={classNames(classes.marginRight, classes.numberCell)}> {professionalStandard[ProfessionalStandardFields.NUMBER]} </Typography>
                                    <Typography
                                        className={classNames(classes.marginRight, classes.titleCell)}
                                        onClick={this.changeRoute(professionalStandard[ProfessionalStandardFields.ID])} > {professionalStandard[ProfessionalStandardFields.TITLE]} </Typography>
                                    <Typography
                                        className={classNames(classes.marginRight, classes.codeCell)}> {professionalStandard[ProfessionalStandardFields.CODE]} </Typography>
                                    <Typography
                                        className={classes.marginRight}> {professionalStandard[ProfessionalStandardFields.NAME]} </Typography>

                                    <div className={classes.actions}>
                                        <IconButton
                                            onClick={this.handleClickDelete(professionalStandard[ProfessionalStandardFields.ID])}>
                                            <DeleteIcon/>
                                        </IconButton>
                                        <IconButton onClick={this.handleClickEdit(professionalStandard)}>
                                            <EditIcon/>
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

                <ProfessionalStandardCreateModal/>

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить профессиональный стандарт?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить профессиоанльный стандарт'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(withRouter(ProfessionalStandards)));
