import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import {DatePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import IconButton from "@material-ui/core/IconButton";
import withStyles from '@material-ui/core/styles/withStyles';
import DateIcon from "@material-ui/icons/DateRange";

import {DatePickerProps} from './types';
import {FULL_DATE_FORMAT} from "../../common/utils";

import styles from './DatePicker.styles';

const DatePickerComponent = ({label, format, onChange, classes, value, noMargin, views}: DatePickerProps) => {
    const handleChange = (date: MaterialUiPickersDate) => {
        onChange(date);
    };

    return (
        <DatePicker
            value={value.length ? value : moment()}
            onChange={handleChange}
            InputProps={{
                endAdornment: (
                    <IconButton>
                        <DateIcon />
                    </IconButton>
                ),
            }}
            inputVariant="outlined"
            format={format || FULL_DATE_FORMAT}
            label={label}
            views={views ? views : ["date"]}
            className={classNames(classes.datePicker, {[classes.marginBottom30]: !noMargin})}
        />
    );
}

export default withStyles(styles)(DatePickerComponent);
