import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';

import Scrollbars from "react-custom-scrollbars";

import classNames from 'classnames';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
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
import SubjectAreaCreateModal from "./SubjectAreaCreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {SubjectAreaProps, SubjectAreaType} from './types';
import {SubjectAreaFields} from './enum';

import connect from './SubjectArea.connect';
import styles from './SubjectArea.styles';
import Pagination from "@material-ui/lab/Pagination";

class SubjectArea extends React.Component<SubjectAreaProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getSubjectArea();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteSubjectArea(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (item: SubjectAreaType) => () => {
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
        this.props.actions.getSubjectArea();
    }, 300);

    handleChangePage = (event: any | null, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getSubjectArea();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getSubjectArea();
    }

    render() {
        const {classes, subjectArea, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Предметная область

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
                            Название
                            <SortingButton changeMode={this.changeSorting(SubjectAreaFields.TITLE)}
                                           mode={sortingField === SubjectAreaFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {subjectArea.map(item =>
                                <div className={classes.listItem} key={item[SubjectAreaFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.courseTitle)}>
                                        {item[SubjectAreaFields.TITLE]}
                                    </Typography>
                                    {/*<div className={classes.actions}>*/}
                                    {/*    <IconButton onClick={this.handleClickDelete(item[SubjectAreaFields.ID])}>*/}
                                    {/*        <DeleteIcon />*/}
                                    {/*    </IconButton>*/}
                                    {/*    <IconButton onClick={this.handleClickEdit(item)}>*/}
                                    {/*        <EditIcon />*/}
                                    {/*    </IconButton>*/}
                                    {/*</div>*/}
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

                    {/*<Fab color="secondary"*/}
                    {/*     classes={{*/}
                    {/*         root: classes.addIcon*/}
                    {/*     }}*/}
                    {/*     onClick={this.handleCreate}*/}
                    {/*>*/}
                    {/*    <AddIcon/>*/}
                    {/*</Fab>*/}
                </div>

                {/*<SubjectAreaCreateModal />*/}

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить предметную область?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить предметную область'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(SubjectArea));
