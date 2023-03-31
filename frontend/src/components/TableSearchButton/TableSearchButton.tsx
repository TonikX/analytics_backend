import React from 'react';
import classNames from 'classnames';
import get from "lodash/get";

import withStyles from '@mui/material/styles/withStyles';
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SearchIcon from "@material-ui/icons/Search";

import {TableSearchButtonProps} from './types';

import styles from './TableSearchButton.styles';

class TableSearchButton extends React.Component<TableSearchButtonProps>{
    state = {
        anchorEl: null,
        searchText: '',
        enableSearch: false
    };

    openSearchPopup = (event: any) => {
        this.setState({anchorEl: event.currentTarget});
    }

    closeSearchPopup = () => {
        this.setState({anchorEl: null});
    }

    handleChangeSearchQuery = (event: React.ChangeEvent) => {
        this.setState({searchText: get(event, 'target.value', '')})
    }

    handleSearch = () => {
        this.props.handleSearch(this.state.searchText);
        this.closeSearchPopup()
        this.isSearchEnable();
    }

    isSearchEnable = () => {
        const {searchText} = this.state;

        if (searchText.length > 0){
            this.setState({enableSearch: true});
        } else {
            this.setState({enableSearch: false});
        }
    }

    render() {
        const {classes} = this.props;
        const {anchorEl, searchText, enableSearch} = this.state;

        const isOpenSearchPopper = Boolean(anchorEl);

        return <ClickAwayListener onClickAway={this.closeSearchPopup} mouseEvent={'onMouseDown'}>
            <div>
                <IconButton className={classes.button}
                            onClick={this.openSearchPopup}
                >
                    <SearchIcon className={classNames({
                        [classes.icon]: !enableSearch,
                        [classes.selectedIcon]: enableSearch
                    })}/>
                </IconButton>
                <Popper open={isOpenSearchPopper} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper classes={{root: classes.paper}}>
                                <TextField placeholder="Поиск"
                                           variant="outlined"
                                           InputProps={{
                                               classes: {
                                                   root: classes.searchInput
                                               },
                                               startAdornment: <SearchOutlined />,
                                           }}
                                           onChange={this.handleChangeSearchQuery}
                                           value={searchText}
                                />
                                <Button color="primary"
                                        onClick={this.handleSearch}
                                >
                                    Найти
                                </Button>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        </ClickAwayListener>;
    }
}

export default withStyles(styles)(TableSearchButton);
