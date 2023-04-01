import React from 'react';
import get from "lodash/get";

import {AutoSizer} from "react-virtualized-reactv17";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import withStyles from '@mui/material/styles/withStyles';

import InputsLoader from "../../../../components/InputsLoader/InputsLoader";

import {SpecializationProps} from './types';
import {fields} from "../../enum";
import {specialization} from "../../constants";

import connect from './Specialization.connect';
import styles from './Specialization.styles';

class Specialization extends React.PureComponent<SpecializationProps> {
    saveField = (e: React.ChangeEvent) => {
        this.props.actions.saveWorkProgram({
            destination: fields.WORK_PROGRAM_QUALIFICATION,
            value: get(e, 'target.value')
        });
    };

    render() {
        const {classes, isFetching, value, isCanEdit, disabled} = this.props;

        if (!value) return <></>;

        return (
            <div>
                <InputLabel className={classes.label}> Уровень образовательной программы </InputLabel>
                <InputsLoader loading={isFetching}>
                    <AutoSizer style={{width: '100%', height: '80px'}}>
                        {({width}) => (
                            <FormControl
                                style={{width: width}}>
                                <Select
                                    className={classes.specializationSelector}
                                    disabled={isFetching || !isCanEdit || disabled}
                                    value={value}
                                    // @ts-ignore
                                    onChange={this.saveField}
                                    variant="outlined"
                                    style={{width: width}}
                                >
                                    {specialization.map(item =>
                                        <MenuItem value={item.value} key={`group-${item.value}`}>
                                            {item.label}
                                        </MenuItem>
                                    )}
                                </Select>
                                </FormControl>
                        )}
                    </AutoSizer>
                </InputsLoader>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Specialization));
