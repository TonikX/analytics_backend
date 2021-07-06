import React, {ReactText} from 'react';
import get from 'lodash/get';
import debounce from "lodash/debounce";
import Scrollbars from "react-custom-scrollbars";

import {AutoSizer} from 'react-virtualized';

import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import withStyles from '@material-ui/core/styles/withStyles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";

import {SearchSelectorProps, SelectorItemType} from './types';

import styles from './SearchSelector.styles';

class SearchSelector extends React.Component<SearchSelectorProps> {
    state = {
        anchorEl: null,
        searchText: ''
    };

    componentDidMount() {
        const {valueLabel} = this.props;

        this.setState({searchText: valueLabel});
    }

    componentDidUpdate(prevProps: SearchSelectorProps) {
        // позволяет сбросить SearchSelector (отправка пустого value и isReset: true)
        if ((this.props.value !== prevProps.value) && this.props.isReset) {
            const {list} = this.props;
            let item = list.find(el => el.value === this.props.value)
            this.setState({searchText: get(item, 'label', false) || this.props.valueLabel})
        }

        if (this.props.valueLabel !== prevProps.valueLabel){
            this.setState({searchText: this.props.valueLabel});
        }
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
    };

    handleOnClickAway = (): void => {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        if (open){
            this.closeMenu();

            if (this.state.searchText?.length === 0){
                this.props.changeItem('');
            } else {
                this.setState({searchText: this.getLabelForValue(this.props.value)});
            }
        }
    };

    setItem = (value: ReactText, label: string) => (e: React.MouseEvent) => {
        this.setState({searchText: label});
        this.props.changeItem(value, label);
    }

    getLabelForValue = (value: ReactText) => {
        const {list} = this.props;
        const findElement = list.find(el => el.value === value);

        return findElement ? findElement.label : '';
    }

    render(): any {
        const {classes, label, list, value, disabled, className, popperPlacement} = this.props;
        const {anchorEl, searchText} = this.state;
        const open = Boolean(anchorEl);

        return (
            <ClickAwayListener onClickAway={this.handleOnClickAway} mouseEvent={'onMouseDown'}>
                <div className={className}>
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
                               disabled={disabled}
                    />
                    <AutoSizer style={{width: '100%'}}>
                        {({width}) => (
                            <Popper open={open}
                                    anchorEl={anchorEl}
                                    transition
                                    placement={popperPlacement || 'bottom'}
                                    disablePortal={false}
                                    className={classes.popper}
                                    style={{width: width}}
                                    // modifiers={{
                                    //     flip: {
                                    //         enabled: false,
                                    //     },
                                    //     preventOverflow: {
                                    //         enabled: false,
                                    //         boundariesElement: 'scrollParent',
                                    //     },
                                    // }}
                            >
                                {({TransitionProps}: any): any => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Paper className={classes.menu} style={{height: list.length * 50}}>
                                            <Scrollbars>
                                                {list.map((item: SelectorItemType) =>
                                                    <MenuItem key={item.value}
                                                              onClick={this.setItem(item.value, item.label)}
                                                              selected={value === item.value}
                                                              className={classes.menuItem}
                                                    >
                                                        {item.label}
                                                    </MenuItem>
                                                )}
                                            </Scrollbars>
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

export default withStyles(styles)(SearchSelector);
