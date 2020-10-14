import React from 'react';
import Scrollbars from "react-custom-scrollbars";

import get from "lodash/get";
import debounce from "lodash/debounce";
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import TextField from "@material-ui/core/TextField";

import withStyles from '@material-ui/core/styles/withStyles';

import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";

import {ProfessionsProps} from './types';
import {ProfessionsFields} from './enum';

import connect from './Professions.connect';
import styles from './Professions.styles';

class Professions extends React.Component<ProfessionsProps> {
    componentDidMount() {
        this.props.actions.getProfessionsList();
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
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
        const {classes, professionsList, allCount, currentPage, sortingField, sortingMode} = this.props;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Навыки - профессии

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
                    <TablePagination count={allCount}
                                     component="div"
                                     page={currentPage - 1}
                                     rowsPerPageOptions={[]}
                                     onChangePage={this.handleChangePage}
                                     //@ts-ignore
                                     rowsPerPage={10}
                                     onChangeRowsPerPage={()=>{}}
                    />
                </div>
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(Professions));
