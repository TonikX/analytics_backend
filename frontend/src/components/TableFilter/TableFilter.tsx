import React from 'react';
import classNames from 'classnames';

import {withStyles} from '@mui/styles';
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";

import FilterIcon from "@mui/icons-material/FilterList";

import {TableFilterProps} from './types';

import styles from './TableFilter.styles';

class TableFilter extends React.Component<TableFilterProps>{
    state = {
        anchorEl: null,
        selectedItems: [],
        enableFilter: false
    };

    openPopup = (event: any) => {
        this.setState({anchorEl: event.currentTarget});
    }

    closePopup = () => {
        this.setState({anchorEl: null});
    }

    handleApply = () => {
        this.props.handleSelect(this.state.selectedItems);
        this.closePopup()
        this.isFilterEnable();
    }

    isFilterEnable = () => {
        const {selectedItems} = this.state;

        if (selectedItems.length > 0){
            this.setState({enableFilter: true});
        } else {
            this.setState({enableFilter: false});
        }
    }

    handleCheck = (key: string) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const {isMulti} = this.props;
        const {selectedItems} = this.state;

        if (isMulti){
            this.setState({selectedItems: checked ? [...selectedItems, key] : [...selectedItems.filter(item => item !== key)]});
        } else {
            this.setState({selectedItems: checked ? [key] : []});
        }
    }

    render() {
        const {classes, items} = this.props;
        const {anchorEl, selectedItems, enableFilter} = this.state;

        const isOpenSearchPopper = Boolean(anchorEl);

        return <ClickAwayListener onClickAway={this.closePopup} mouseEvent={'onMouseDown'}>
            <div>
                <IconButton className={classes.button}
                            onClick={this.openPopup}
                >
                    <FilterIcon className={classNames({
                        [classes.icon]: !enableFilter,
                        [classes.selectedIcon]: enableFilter
                    })}/>
                </IconButton>
                <Popper open={isOpenSearchPopper} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper classes={{root: classes.paper}}>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        {Object.keys(items).map(key =>
                                            <FormControlLabel
                                                control={<Checkbox checked={Boolean(selectedItems.find(item => item === key))} onChange={this.handleCheck(key)} />}
                                                label={items[key]}
                                            />
                                        )}
                                    </FormGroup>
                                </FormControl>
                                <div className={classes.buttonWrap}>
                                    <Button color="primary"
                                            onClick={this.handleApply}
                                    >
                                        Применить
                                    </Button>
                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        </ClickAwayListener>;
    }
}

export default withStyles(styles)(TableFilter);
