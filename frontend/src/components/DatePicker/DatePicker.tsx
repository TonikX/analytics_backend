import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import DatePicker from '@mui/lab/DatePicker';
import IconButton from "@mui/material/IconButton";
import {withStyles} from '@mui/styles';
import DateIcon from "@mui/icons-material/DateRange";

import {DatePickerProps} from './types';
import {FULL_DATE_FORMAT} from "../../common/utils";

import styles from './DatePicker.styles';

const DatePickerComponent = ({label, format, onChange, classes, value, noMargin, views, minDate, maxDate}: DatePickerProps) => {
    const handleChange = (date: any) => {
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
            minDate={minDate}
            maxDate={maxDate}
        />
    );
}

export default withStyles(styles)(DatePickerComponent);
