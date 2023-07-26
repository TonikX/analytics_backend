import React from 'react';
import get from "lodash/get";
import classNames from "classnames";

import {withStyles} from '@mui/styles';
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import {QualificationSelectorProps} from './types';

import styles from './SimpleSelector.styles';
import {FormHelperText} from "@mui/material";

const Selector = ({classes, label, value, onChange, noMargin, wrapClass, metaList, errorMessage, disabled, onClickMenuItem}: QualificationSelectorProps) => {
    const handleChange = (e: any) => {
        onChange(get(e, 'target.value'))
    }

    return (
        <FormControl className={classNames(wrapClass, {[classes.marginBottom30]: !noMargin})} error={!!errorMessage}>
            <InputLabel shrink id="section-label">
                {label}
            </InputLabel>
            <Select
                variant="outlined"
                onChange={handleChange}
                value={value}
                fullWidth
                displayEmpty
                input={
                    <OutlinedInput
                        notched
                        id="section-label"
                    />
                }
                disabled={disabled}
            >
                {metaList.map(item =>
                    <MenuItem value={item.value} key={item.value} onClick={() => onClickMenuItem?.(item.value)}>
                        {item.label}
                    </MenuItem>
                )}
            </Select>
            {
                errorMessage && <FormHelperText>{errorMessage}</FormHelperText>
            }
        </FormControl>
    );
}

export default withStyles(styles)(Selector);
