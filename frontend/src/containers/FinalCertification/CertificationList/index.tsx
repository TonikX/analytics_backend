import React from "react";
import Paper from '@mui/material/Paper';
import {withStyles} from '@mui/styles';

import styles from "./styles";
import connect from './connect';
import {CertificationListProps} from "./types";
import {appRouter} from "../../../service/router-service";
import {Link} from "react-router-dom";
import {CertificationFields} from "../enum";
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
import ArrowDown from "@mui/icons-material/ArrowDropDown";
import classNames from "classnames";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CreateModal from "./CreateModal";
import {RussianCertificationFields} from "../constants";

class FinalCertificationList extends React.Component<CertificationListProps> {

    componentDidMount() {
        this.props.actions.getCertificationList();
    }

    changeSorting = (field: string) => () => {
        const {sortingField} = this.props;
        if (sortingField === field) {
            this.props.actions.setSortingField('');
        } else {
            this.props.actions.setSortingField(field);
        }
        this.props.actions.getCertificationList();
    }

    handleOpenModal = () => {
        this.props.actions.openModal();
    }

    handleChangeSearchQuery = (event: React.ChangeEvent) => {
        this.changeSearch(get(event, 'target.value', ''));
    }

    changeSearch = debounce((value: string): void => {
        this.props.actions.setSearchText(value);
        this.props.actions.setCurrentPage(1);
        this.props.actions.getCertificationList();
    }, 300);

    handleChangePage = (event: any, page: number) => {
        this.props.actions.setCurrentPage(page);
        this.props.actions.getCertificationList();
    }


    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {certificationList, sortingField, certificationCount, currentPage} = this.props;
        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Рабочие программы ГИА

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
                                                {RussianCertificationFields[CertificationFields.ID]}
                                            </Typography>
                                            <ArrowDown onClick={this.changeSorting(CertificationFields.ID)}
                                                       className={classNames(classes.sortingArrow,
                                                           {[classes.selectedFieldArrow]: sortingField === CertificationFields.ID})}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={classes.fieldCell}>
                                            <Typography>
                                                {RussianCertificationFields[CertificationFields.TITLE]}
                                            </Typography>
                                            <ArrowDown onClick={this.changeSorting(CertificationFields.TITLE)}
                                                       className={classNames(classes.sortingArrow,
                                                           {[classes.selectedFieldArrow]: sortingField === CertificationFields.TITLE})}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={classes.fieldCell}>
                                            <Typography>
                                                {RussianCertificationFields[CertificationFields.AUTHORS]}
                                            </Typography>
                                            <ArrowDown onClick={this.changeSorting(CertificationFields.AUTHORS)}
                                                       className={classNames(classes.sortingArrow,
                                                           {[classes.selectedFieldArrow]: sortingField === CertificationFields.AUTHORS})}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {certificationList.map((certification: any) =>
                                    <TableRow key={certification[CertificationFields.ID]}>
                                        <TableCell className={classes.cellStatus}>
                                            {certification[CertificationFields.ID]}
                                      z  </TableCell>
                                        <TableCell className={classes.link}>
                                            <Link target="_blank"
                                                  to={appRouter.getFinalCertificationLink(certification[CertificationFields.ID])}>
                                                {certification[CertificationFields.TITLE]}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {certification[CertificationFields.AUTHORS]}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Scrollbars>
                <div className={classes.footer}>
                    <Pagination count={Math.ceil(certificationCount / 10)}
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

export default connect(withStyles(styles)(FinalCertificationList));