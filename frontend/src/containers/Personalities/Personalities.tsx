import React from "react";
import { PersonalitiesProps } from "./types";
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import connect from './Personalities.connect'
import styles from './Personalities.styles'
import { withStyles } from "@material-ui/styles";
import { Paper, TextField, Typography } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { PersonalitiesTable } from "./PersonalitiesTable/PersonalitiesTable";
import Pagination from "@material-ui/lab/Pagination";

class Personalities extends React.Component<PersonalitiesProps> {
    componentDidMount() {
        this.props.actions.getPersonalities()
    }

    handleChangeSearchQuery = (event: React.ChangeEvent): void => {
        this.changeSearch(get(event, 'target.value', ''));
    }

    changeSearch = debounce((value: string): void => {
        this.props.actions.changeSearchQuery(value);
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getPersonalities();
      }, 300);

    handleChangePage = (event: any, page: number): void => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getPersonalities();
    }


    render() {
        const {classes, personalities, allCount, currentPage, sortingField, sortingMode} = this.props
        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                Персоналии
                <div className={classes.searchWrapper}>
                <TextField
                        placeholder="Поиск по ФИО"
                        variant="outlined"
                        InputProps={{
                            classes: {
                                root: classes.searchInput
                            },
                            startAdornment: <SearchOutlined/>
                        }}
                        onChange={this.handleChangeSearchQuery}
                    />
                </div>
                </Typography>
                
                <PersonalitiesTable personalities={personalities}/>
            
                <div className={classes.footer}>
                <Pagination count={Math.ceil(allCount / 10)}
                      page={currentPage}
                      onChange={this.handleChangePage}
                      color="primary"
          />
        </div>
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(Personalities))