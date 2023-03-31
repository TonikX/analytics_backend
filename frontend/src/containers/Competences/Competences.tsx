import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import {Link} from "react-router-dom";
// @ts-ignore
import Scrollbars from "react-custom-scrollbars-2";

import classNames from 'classnames';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import withStyles from '@mui/material/styles/withStyles';

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";

import {appRouter} from "../../service/router-service";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import CourseCreateModal from "./CreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {CompetenceProps, CompetenceType} from './types';
import {CompetenceFields} from './enum';

import connect from './Competences.connect';
import styles from './Competences.styles';
import Pagination from "@mui/lab/Pagination";

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

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
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
                                    <Typography className={classNames(classes.marginRight, classes.titleCell, classes.link)}>
                                        <Link to={appRouter.getCompetenceIndicatorsRouteLink(competence[CompetenceFields.ID])}>
                                            {competence[CompetenceFields.TITLE]}
                                        </Link>
                                    </Typography>
                                    <div className={classes.actions}>
                                        <IconButton>
                                            <Link style={{textDecoration: 'none', height: '23px', color: 'rgba(0, 0, 0, 0.54)'}}
                                                  to={appRouter.getCompetenceIndicatorsRouteLink(competence[CompetenceFields.ID])}>
                                                <EyeIcon />
                                            </Link>
                                        </IconButton>
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
