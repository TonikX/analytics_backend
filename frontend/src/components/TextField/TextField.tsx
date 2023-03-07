import React from 'react';
import debounce from 'lodash/debounce';
import get from "lodash/get";
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from "@material-ui/core/TextField";

import {TextFieldProps} from './types';

import styles from './TextField.styles';

const TextFieldComponent = ({label, noMargin, onChange, classes, defaultValue}: TextFieldProps) => {
  const debounceChange = debounce((value: string): void => {
    onChange(value)
  }, 500)

  const handleChange = (e: React.ChangeEvent) => {
    debounceChange(get(e, 'target.value', ''));
  };

  return (
    <TextField label={label}
               variant="outlined"
               className={classNames({[classes.marginBottom30]: !noMargin})}
               fullWidth
               InputLabelProps={{
                   shrink: true,
               }}
               onChange={handleChange}
               defaultValue={defaultValue}
    />
  );
}

export default withStyles(styles)(TextFieldComponent);
