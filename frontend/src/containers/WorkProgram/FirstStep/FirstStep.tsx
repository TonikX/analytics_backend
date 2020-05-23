import React from 'react';
import get from 'lodash/get';

import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

import InputsLoader from '../../../components/InputsLoader';
import Selector from './Selector';

import {FirstStepProps} from './types';
import {fields} from "../enum";

import connect from './FirstStep.connect';
import styles from './FirstStep.styles';

class FirstStep extends React.Component<FirstStepProps> {
    state = {
        code: '',
        title: '',
    };

    componentDidUpdate(prevProps: Readonly<FirstStepProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.title !== this.props.title || prevProps.code !== this.props.code){
            this.setState({
                title: this.props.title,
                code: this.props.code,
            })
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        this.props.actions.saveWorkProgram({
            destination: field,
            value: get(e, 'target.value')
        });
    };

    changeCode = (e: React.ChangeEvent) => {
        this.setState({
            code: get(e, 'target.value')
        })
    }

    changeTitle = (e: React.ChangeEvent) => {
        this.setState({
            title: get(e, 'target.value')
        })
    }

    render() {
        const {classes, fetchingTitle, fetchingCode} = this.props;
        const {title, code} = this.state;

        return (
            <>
                <InputsLoader loading={fetchingCode}>
                    <TextField type="number"
                               variant="outlined"
                               label="Код программы"
                               className={classes.input}
                               value={code}
                               onBlur={this.saveField(fields.WORK_PROGRAM_CODE)}
                               onChange={this.changeCode}
                               disabled={fetchingCode}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                </InputsLoader>
                <InputsLoader loading={fetchingTitle}>
                    <TextField variant="outlined"
                               label="Название дисциплины"
                               value={title}
                               className={classes.input}
                               onBlur={this.saveField(fields.WORK_PROGRAM_TITLE)}
                               onChange={this.changeTitle}
                               disabled={fetchingTitle}
                    />
                </InputsLoader>

                <Selector />
            </>
        );
    }
}

export default connect(withStyles(styles)(FirstStep));
