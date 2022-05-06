import React from "react";
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from "./styles";
import connect from './connect';
import {CertificationListProps} from "./types";
import {appRouter} from "../../../service/router-service";
import {Link} from "react-router-dom";
import {CertificationFields} from "../enum";
import Scrollbars from "react-custom-scrollbars";
import {Table} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import get from "lodash/get";
import debounce from "lodash/debounce";
import Pagination from "@material-ui/lab/Pagination";
import ArrowDown from "@material-ui/icons/ArrowDropDown";
import classNames from "classnames";

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
        const {classes, certificationList, sortingField, certificationCount, currentPage} = this.props;
        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Рабочие программы

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
                                                ID
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
                                                Название
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
                                                Авторский состав
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
                                        </TableCell>
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
                </div>
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(FinalCertificationList));