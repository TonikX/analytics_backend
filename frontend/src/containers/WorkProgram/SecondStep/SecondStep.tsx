import React from 'react';
import get from "lodash/get";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import withStyles from '@material-ui/core/styles/withStyles';

import InputsLoader from "../../../components/InputsLoader/InputsLoader";

import {SecondStepProps} from './types';
import {fields} from "../enum";
import {specialization} from "../data";

import connect from './SecondStep.connect';
import styles from './SecondStep.styles';

class SecondStep extends React.PureComponent<SecondStepProps> {
    saveField = (e: React.ChangeEvent) => {
        this.props.actions.saveWorkProgram({
            destination: fields.WORK_PROGRAM_QUALIFICATION,
            value: get(e, 'target.value')
        });
    };

    render() {
        const {classes, isFetching, value} = this.props;

        return (
            <InputsLoader loading={isFetching}>
                <FormControl>
                    <Select
                        placeholder="Место дисциплины"
                        className={classes.specializationSelector}
                        variant="outlined"
                        disabled={isFetching}
                        value={value}
                        // @ts-ignore
                        onChange={this.saveField}
                    >
                        {specialization.map(item =>
                            <MenuItem value={item.value} key={`group-${item.value}`}>
                                {item.label}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </InputsLoader>
        );
    }
}

export default connect(withStyles(styles)(SecondStep));
