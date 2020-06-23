import React from 'react';
import get from "lodash/get";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';

import InputsLoader from "../../../../components/InputsLoader/InputsLoader";

import {SecondStepProps} from './types';
import {fields} from "../../enum";
import {specialization} from "../../data";

import connect from './Selector.connect';
import styles from './Selector.styles';

class Selector extends React.PureComponent<SecondStepProps> {
    saveField = (e: React.ChangeEvent) => {
        this.props.actions.saveWorkProgram({
            destination: fields.WORK_PROGRAM_QUALIFICATION,
            value: get(e, 'target.value')
        });
    };

    render() {
        const {classes, isFetching, value} = this.props;

        if (!value) return <></>;

        return (
            <div>
                <InputLabel className={classes.label}> Место дисциплины в структуре образовательной программы высшего образования (ОП ВО) </InputLabel>
                <InputsLoader loading={isFetching}>
                    <FormControl>
                        <Select
                            className={classes.specializationSelector}
                            disabled={isFetching}
                            value={value}
                            // @ts-ignore
                            onChange={this.saveField}
                            variant="outlined"
                        >
                            {specialization.map(item =>
                                <MenuItem value={item.value} key={`group-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </InputsLoader>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Selector));
