import React from "react";
import Paper from '@mui/material/Paper';
import {withStyles} from '@mui/styles';

import styles from "./PracticeList.styles";
import connect from './PracticeList.connect';
import {PracticeListProps} from "./types";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import CreateModal from "./CreateModal";
import {appRouter} from "../../../service/router-service";
import {Link} from "react-router-dom";
import {PracticeFields} from "../enum";
import Scrollbars from "react-custom-scrollbars-2";
import {Table} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import get from "lodash/get";
import debounce from "lodash/debounce";
import Pagination from "@mui/lab/Pagination";
import classNames from "classnames";
import ArrowDown from "@mui/icons-material/ArrowDropDown";
import {RussianPracticeFields} from "../constants";

class PracticeList extends React.Component<PracticeListProps> {

    componentDidMount() {
        this.props.actions.getPracticeList();
    }

    handleOpenModal = () => {
        this.props.actions.openModal();
    }

    changeSorting = (field: string) => () => {
        const {sortingField} = this.props;
        if (sortingField === field) {
            this.props.actions.setSortingField('');
        } else {
            this.props.actions.setSortingField(field);
        }
        this.props.actions.getPracticeList();
    }

    handleChangeSearchQuery = (event: React.ChangeEvent) => {
        this.changeSearch(get(event, 'target.value', ''));
    }

    changeSearch = debounce((value: string): void => {
        this.props.actions.setSearchText(value);
        this.props.actions.setCurrentPage(1);
        this.props.actions.getPracticeList();
    }, 300);

    handleChangePage = (event: any, page: number) => {
        this.props.actions.setCurrentPage(page);
        this.props.actions.getPracticeList();
    }


    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {practiceList, sortingField, practiceCount, currentPage} = this.props;
        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Рабочие программы практики

                    <TextField placeholder="Поиск"
                               variant="outlined"
                               className={classes.searchInput}
                               InputProps={{
                                   classes: {
                                       root: classes.searchInput
                                   },
                                   startAdornment: <SearchOutlined/>,
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
                                        <div className={classes.fieldCell}>
                                            <Typography>
                                                {RussianPracticeFields[PracticeFields.ID]}
                                            </Typography>
                                            <ArrowDown onClick={this.changeSorting(PracticeFields.ID)}
                                                       className={classNames(classes.sortingArrow,
                                                           {[classes.selectedFieldArrow]: sortingField === PracticeFields.ID})}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={classes.fieldCell}>
                                            <Typography>
                                                {RussianPracticeFields[PracticeFields.TITLE]}
                                            </Typography>
                                            <ArrowDown onClick={this.changeSorting(PracticeFields.TITLE)}
                                                       className={classNames(classes.sortingArrow,
                                                           {[classes.selectedFieldArrow]: sortingField === PracticeFields.TITLE})}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={classes.fieldCell}>
                                            <Typography>
                                                {RussianPracticeFields[PracticeFields.AUTHORS]}
                                            </Typography>
                                            <ArrowDown onClick={this.changeSorting(PracticeFields.AUTHORS)}
                                                       className={classNames(classes.sortingArrow,
                                                           {[classes.selectedFieldArrow]: sortingField === PracticeFields.AUTHORS})}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {practiceList.map((practice: any) =>
                                    <TableRow key={practice[PracticeFields.ID]}>
                                        <TableCell className={classes.cellStatus}>
                                            {practice[PracticeFields.ID]}
                                        </TableCell>
                                        <TableCell className={classes.link}>
                                            <Link target="_blank"
                                                  to={appRouter.getPracticeLink(practice[PracticeFields.ID])}>
                                                {practice[PracticeFields.TITLE]}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {practice[PracticeFields.AUTHORS]}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Scrollbars>
                <div className={classes.footer}>
                    <Pagination count={Math.ceil(practiceCount / 10)}
                                page={currentPage}
                                onChange={this.handleChangePage}
                                color="primary"
                    />

                    <Fab color="secondary"
                         classes={{
                             root: classes.addIcon
                         }}
                         onClick={this.handleOpenModal}
                    >
                        <AddIcon/>
                    </Fab>
                    <CreateModal/>
                </div>
            </Paper>
        )
    }
}

// @ts-ignore
export default connect(withStyles(styles)(PracticeList));