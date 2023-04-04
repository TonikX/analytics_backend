import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
// @ts-ignore
import Scrollbars from "react-custom-scrollbars-2";

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import {withStyles} from '@mui/styles';

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import CreateModal from "./CreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {EducationalProgramProps, DirectionType} from './types';
import {DirectionFields} from './enum';

import connect from './EducationalProgram.connect';
import styles from './EducationalProgram.styles';
import {specialization} from "../WorkProgram/constants";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import classNames from "classnames";

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
        //@ts-ignore
        const {classes} = this.props;
        const {educationalProgram, allCount, currentPage, sortingField, sortingMode, canEdit} = this.props;
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
                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell>
                                        Название
                                        <SortingButton changeMode={this.changeSorting(DirectionFields.TITLE)}
                                                       mode={sortingField === DirectionFields.TITLE ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Номер
                                        <SortingButton changeMode={this.changeSorting(DirectionFields.NUMBER)}
                                                       mode={sortingField === DirectionFields.NUMBER ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Квалификация
                                        <SortingButton changeMode={this.changeSorting(DirectionFields.QUALIFICATION)}
                                                       mode={sortingField === DirectionFields.QUALIFICATION ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Факультет
                                        <SortingButton changeMode={this.changeSorting(DirectionFields.FACULTY)}
                                                       mode={sortingField === DirectionFields.FACULTY ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Форма обучения
                                        <SortingButton changeMode={this.changeSorting(DirectionFields.EDUCATION_FORM)}
                                                       mode={sortingField === DirectionFields.EDUCATION_FORM ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Профиль
                                        <SortingButton changeMode={this.changeSorting(DirectionFields.EDUCATIONAL_PROFILE)}
                                                       mode={sortingField === DirectionFields.EDUCATIONAL_PROFILE ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    {canEdit && <TableCell/>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {educationalProgram.map(direction =>
                                    <TableRow className={classNames({[classes.bigRow]: !canEdit})}
                                              key={direction[DirectionFields.ID]}
                                    >
                                        <TableCell>{direction[DirectionFields.TITLE]}</TableCell>
                                        <TableCell>{direction[DirectionFields.NUMBER]}</TableCell>
                                        <TableCell>
                                            {get(specialization.find(item => item.value === direction[DirectionFields.QUALIFICATION]), 'label', '')}
                                        </TableCell>
                                        <TableCell>{direction[DirectionFields.FACULTY]}</TableCell>
                                        <TableCell>{direction[DirectionFields.EDUCATION_FORM] === 'extramural' ? 'Заочная' : 'Очная'}</TableCell>
                                        <TableCell>{direction[DirectionFields.EDUCATIONAL_PROFILE]} </TableCell>
                                        {canEdit &&
                                            <TableCell>
                                                <div style={{display: 'flex'}}>
                                                    <IconButton
                                                        onClick={this.handleClickDelete(direction[DirectionFields.ID])}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={this.handleClickEdit(direction)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        }
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Scrollbars>

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

                    {canEdit &&
                        <Fab color="secondary"
                             classes={{
                                 root: classes.addIcon
                             }}
                             onClick={this.handleCreate}
                        >
                            <AddIcon/>
                        </Fab>
                    }
                </div>

                {canEdit && <CreateModal />}

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

//@ts-ignore
export default connect(withStyles(styles)(EducationalProgram));
