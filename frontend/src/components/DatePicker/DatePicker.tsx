import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import {withStyles} from '@mui/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {DatePickerProps} from './types';
import {FULL_DATE_FORMAT} from "../../common/utils";

import styles from './DatePicker.styles';

const DatePickerComponent = ({label, format, onChange, classes, value, noMargin, views, minDate, maxDate}: DatePickerProps) => {
    const handleChange = (date: any) => {
        onChange(date);
    };

    return (
        <DatePicker
            value={value ? moment(value) : undefined}
            onChange={handleChange}
            format={format || FULL_DATE_FORMAT}
            label={label}
            views={views ? views : ["date"]}
            className={classNames(classes.datePicker, {[classes.marginBottom30]: !noMargin})}
            minDate={minDate ? moment(minDate) : undefined}
            maxDate={maxDate ? moment(maxDate) : undefined}
        />
    );
}

export default withStyles(styles)(DatePickerComponent);
