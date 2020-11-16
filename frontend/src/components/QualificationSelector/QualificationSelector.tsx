import React from 'react';
import get from "lodash/get";
import classNames from "classnames";

import withStyles from '@material-ui/core/styles/withStyles';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

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
                Квалификация *
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
                        labelWidth={100}
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