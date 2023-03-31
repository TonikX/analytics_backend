import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';

import Scrollbars from "react-custom-scrollbars";

import classNames from 'classnames';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import withStyles from '@mui/material/styles/withStyles';

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import LiteratureCreateModal from "./LiteratureCreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {LiteratureProps, LiteratureType} from './types';
import {literatureFields} from './enum';

import connect from './Literature.connect';
import styles from './Literature.styles';
import Pagination from "@material-ui/lab/Pagination";

class Literature extends React.Component<LiteratureProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getLiterature();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteLiterature(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (item: LiteratureType) => () => {
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
        this.props.actions.getLiterature();
    }, 300);

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getLiterature();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getLiterature();
    }

    render() {
        const {classes, literature, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Учебно-методическое обеспечение дисциплин

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
                        <Typography className={classNames(classes.marginRight, classes.courseTitle)}>
                            Литература
                            <SortingButton changeMode={this.changeSorting(literatureFields.DESCRIPTION)}
                                           mode={sortingField === literatureFields.DESCRIPTION ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {literature.map(course =>
                                <div className={classes.listItem} key={course[literatureFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.courseTitle)}> {course[literatureFields.DESCRIPTION]} </Typography>
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(course[literatureFields.ID])}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={this.handleClickEdit(course)}>
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

                <LiteratureCreateModal />

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить источник?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить источник'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(Literature));
