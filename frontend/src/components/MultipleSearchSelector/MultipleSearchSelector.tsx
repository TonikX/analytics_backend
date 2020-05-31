import React, {ReactText} from 'react';
import get from 'lodash/get';
import debounce from "lodash/debounce";

import {AutoSizer} from 'react-virtualized';

import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import withStyles from '@material-ui/core/styles/withStyles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";

import {MultipleSearchSelectorProps, SelectorItemType} from './types';

import styles from './MultipleSearchSelector.styles';

class MultipleSearchSelector extends React.Component<MultipleSearchSelectorProps> {
    state = {
        anchorEl: null,
        searchText: ''
    };

    componentDidMount() {
        this.setState({searchText: this.props.value});
    }

    changeSearchText = (event: React.ChangeEvent) => {
        const value = get(event, 'currentTarget.value', '');

        this.setState({searchText: value});
        this.changeSearch(value);
    };

    changeSearch = debounce((value: string) => {
        this.props.changeSearchText(value);
    }, 300);

    openMenu = (event: any) => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    closeMenu = (): void => {
        this.setState({
            anchorEl: null,
        });

        this.props.changeSearchText('');
    };

    handleOnClickAway = (): void => {
        this.closeMenu();
        this.setState({searchText: this.getLabelForValue(this.props.value)});
    };

    setItem = (value: ReactText) => (e: React.MouseEvent) => {
        this.props.changeItem(value);
        this.setState({searchText: this.getLabelForValue(value)});
    }

    getLabelForValue = (value: ReactText) => {
        const {list} = this.props;
        const findElement = list.find(el => el.value === value);

        return findElement ? findElement.label : '';
    }

    render(): any {
        const {classes, label, list, value} = this.props;
        const {anchorEl, searchText} = this.state;
        const open = Boolean(anchorEl);

        return (
            <ClickAwayListener onClickAway={this.handleOnClickAway} mouseEvent={'onMouseDown'}>
                <div>
                    <TextField onChange={this.changeSearchText}
                               label={label}
                               variant='outlined'
                               fullWidth
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               onFocus={this.openMenu}
                               onBlur={this.closeMenu}
                               value={searchText}
                    />
                    <AutoSizer style={{width: '100%'}}>
                        {({width}) => (
                            <Popper open={open}
                                    anchorEl={anchorEl}
                                    transition
                                    placement={'bottom'}
                                    className={classes.popper}
                                    style={{width: width}}
                            >
                                {({TransitionProps}: any): any => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Paper className={classes.menu}>
                                            {list.map((item: SelectorItemType) =>
                                                <MenuItem onClick={this.setItem(item.value)}
                                                          selected={value === item.value}
                                                >
                                                    {item.label}
                                                </MenuItem>
                                            )}
                                        </Paper>
                                    </Fade>
                                )}
                            </Popper>
                        )}
                    </AutoSizer>
                </div>
            </ClickAwayListener>
        )
    }
}

export default withStyles(styles)(MultipleSearchSelector);
