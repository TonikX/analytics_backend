import React from 'react';
import Scrollbars from "react-custom-scrollbars-2";

import get from "lodash/get";
import debounce from "lodash/debounce";
import classNames from 'classnames';

import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/lab/Pagination";
import {withStyles} from '@mui/styles';

import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";

import {RolesProps} from './types';
import {RolesFields} from './enum';

import connect from './Roles.connect';
import styles from './Roles.styles';

class Roles extends React.Component<RolesProps> {
    componentDidMount() {
        this.props.actions.getRolesList();
    }

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getRolesList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getRolesList();
    }

    handleChangeSearchQuery = (event: React.ChangeEvent) => {
        this.changeSearch(get(event, 'target.value', ''));
    }

    changeSearch = debounce((value: string): void => {
        this.props.actions.changeSearchQuery(value);
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getRolesList();
    }, 300);

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {rolesList, allCount, currentPage, sortingField, sortingMode} = this.props;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Навыки ролей

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
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Навык
                            <SortingButton changeMode={this.changeSorting(RolesFields.TITLE)}
                                           mode={sortingField === RolesFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Роль
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {rolesList.map(item =>
                                <>
                                    <div className={classes.listItem} key={item[RolesFields.ID]}>
                                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                            {item[RolesFields.NAME]}
                                        </Typography>
                                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                            {item[RolesFields.ROLE_SKILLS].map((item: any) =>
                                                <Chip className={classNames(classes.marginRight)} label={item[RolesFields.TITLE]} />
                                            )}
                                        </Typography>
                                    </div>
                                </>
                            )}
                        </Scrollbars>
                    </div>
                </div>

                <div className={classes.footer}>
                    <Pagination count={Math.ceil(allCount / 10)}
                                page={currentPage}
                      //@ts-ignore
                                onChange={this.handleChangePage}
                                color="primary"
                    />
                </div>
            </Paper>
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(Roles));
