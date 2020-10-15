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

import {ExpertisesProps} from './types';
import {ExpertisesFields} from './enum';

import connect from './Expertises.connect';
import styles from './Expertises.styles';

class Expertises extends React.Component<ExpertisesProps> {
    componentDidMount() {
        this.props.actions.getExpertisesList();
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getExpertisesList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getExpertisesList();
    }

    handleChangeSearchQuery = (event: React.ChangeEvent) => {
        this.changeSearch(get(event, 'target.value', ''));
    }

    changeSearch = debounce((value: string): void => {
        this.props.actions.changeSearchQuery(value);
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getExpertisesList();
    }, 300);

    render() {
        const {classes, expertisesList, allCount, currentPage, sortingField, sortingMode} = this.props;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Экспертиза

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
                            Рабочая программа
                            <SortingButton changeMode={this.changeSorting(ExpertisesFields.TITLE)}
                                           mode={sortingField === ExpertisesFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Образовательная программа
                            <SortingButton changeMode={this.changeSorting(ExpertisesFields.TITLE)}
                                           mode={sortingField === ExpertisesFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Статус
                            <SortingButton changeMode={this.changeSorting(ExpertisesFields.TITLE)}
                                           mode={sortingField === ExpertisesFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {expertisesList.map(item =>
                                <>
                                    <div className={classes.listItem} key={item[ExpertisesFields.ID]}>
                                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                            {item[ExpertisesFields.NAME]}
                                        </Typography>
                                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                            {item[ExpertisesFields.EXPERTISE_SKILLS].map((item: any) =>
                                                <Chip className={classNames(classes.marginRight)} label={item[ExpertisesFields.TITLE]} />
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

export default connect(withStyles(styles)(Expertises));
