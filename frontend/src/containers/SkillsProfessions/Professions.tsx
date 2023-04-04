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

import {withStyles} from '@mui/styles';

import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";

import {ProfessionsProps} from './types';
import {ProfessionsFields} from './enum';

import connect from './Professions.connect';
import styles from './Professions.styles';
import Pagination from "@mui/lab/Pagination";

class Professions extends React.Component<ProfessionsProps> {
    componentDidMount() {
        this.props.actions.getProfessionsList();
    }

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getProfessionsList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getProfessionsList();
    }

    handleChangeSearchQuery = (event: React.ChangeEvent) => {
        this.changeSearch(get(event, 'target.value', ''));
    }

    changeSearch = debounce((value: string): void => {
        this.props.actions.changeSearchQuery(value);
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getProfessionsList();
    }, 300);

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {professionsList, allCount, currentPage, sortingField, sortingMode} = this.props;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Навыки профессий

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
                            <SortingButton changeMode={this.changeSorting(ProfessionsFields.TITLE)}
                                           mode={sortingField === ProfessionsFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Профессии
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {professionsList.map(item =>
                                <>
                                    <div className={classes.listItem} key={item[ProfessionsFields.ID]}>
                                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                            {item[ProfessionsFields.NAME]}
                                        </Typography>
                                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                            {item[ProfessionsFields.PROFESSION_SKILLS].map((item: any) =>
                                                <Chip className={classNames(classes.marginRight)} label={item[ProfessionsFields.TITLE]} />
                                            )}
                                        </Typography>
                                    </div>
                                </>
                            )}
                        </Scrollbars>
                    </div>
                </div>

                <div className={classes.footer}>
                    <Pagination count={allCount}
                                page={currentPage}
                                onChange={this.handleChangePage}
                                color="primary"
                    />
                </div>
            </Paper>
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(Professions));
