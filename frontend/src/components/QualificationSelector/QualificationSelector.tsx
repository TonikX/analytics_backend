import React from 'react';
import get from "lodash/get";
import classNames from "classnames";

import {withStyles} from '@mui/styles';
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import {specialization} from "../../containers/WorkProgram/constants";
import {QualificationSelectorProps} from './types';

import styles from './QualificationSelector.styles';

const Selector = ({classes, value, onChange, noMargin}: QualificationSelectorProps) => {
    const handleChange = (e: React.ChangeEvent<any>) => {
        onChange(get(e, 'target.value'))
    }

    return (
        <FormControl className={classNames(classes.selectorWrap, {[classes.marginBottom30]: !noMargin})}>
            <InputLabel shrink id="section-label">
                Уровень образования *
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
            >
                {specialization.map(item =>
                    <MenuItem value={item.value} key={`group-${item.value}`}>
                        {item.label}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

export default withStyles(styles)(Selector);
