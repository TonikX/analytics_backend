import React from "react";
import {CertificationFields, CertificationMarkFields, CertificationStepsRussian} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {FormControl, MenuItem, TextField, Typography, WithStyles} from "@material-ui/core";
import {CertificationActions, CertificationMark, CertificationState} from "../../types";
import get from "lodash/get";
import {markTypesRussian} from "../../constants";

interface AssessmentProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
}

class Assessment extends React.Component<AssessmentProps> {

    state = {
        activeField: CertificationFields.CONTENT_CORRESPONDENCE_MARKS,
    }

    handleSelectChange = (e: React.ChangeEvent<any>) => {
        const field = get(e, 'target.value');
        this.setState({
            ...this.state,
            activeField: field,
        })
    }

    handleInputChange = (markType: CertificationMarkFields) => (e: React.ChangeEvent<any>) => {
        const value = get(e, 'target.value');
        const field = this.state.activeField;

        this.props.actions.setMarkCriteria({field, markType, value});
    }

    handleInputBlur = (markType: CertificationMarkFields) => (e: React.ChangeEvent<any>) => {
        const value = get(e, 'target.value');
        const field = this.state.activeField;

        this.props.actions.saveMarkCriteria({
            field,
            markType,
            value,
        })
    }

    render() {

        const {classes, fields} = this.props;
        const {activeField} = this.state;

        const marks = (fields as any)[activeField] as CertificationMark;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {CertificationStepsRussian.ASSESSMENT}
                </Typography>
                <FormControl fullWidth className={classes.select}>
                    <TextField
                            value={activeField}
                            label='Вид оценки'
                            variant='outlined'
                            select
                            onChange={this.handleSelectChange}>
                        {
                            markTypesRussian.map(type => (
                                    <MenuItem value={type.field}>{type.value}</MenuItem>
                                )
                            )
                        }
                    </TextField>
                </FormControl>
                <div className={classes.columns}>
                    <div>
                        <TextField value={marks ? marks[CertificationMarkFields.GREAT] : ''}
                                   label='Оценка "отлично"'
                                   fullWidth
                                   multiline
                                   rows={5}
                                   variant='outlined'
                                   onBlur={this.handleInputBlur(CertificationMarkFields.GREAT)}
                                   onChange={this.handleInputChange(CertificationMarkFields.GREAT)}
                                   className={classes.input}/>
                        <TextField value={marks ? marks[CertificationMarkFields.SATISFACTORILY] : ''}
                                   label='Оценка "удовлетворительно"'
                                   fullWidth
                                   multiline
                                   rows={5}
                                   variant='outlined'
                                   onBlur={this.handleInputBlur(CertificationMarkFields.GREAT)}
                                   onChange={this.handleInputChange(CertificationMarkFields.GREAT)}
                                   className={classes.input}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <TextField value={marks ? marks[CertificationMarkFields.GOOD] : ''}
                                   label='Оценка "хорошо"'
                                   fullWidth
                                   multiline
                                   rows={5}
                                   variant='outlined'
                                   onBlur={this.handleInputBlur(CertificationMarkFields.GREAT)}
                                   onChange={this.handleInputChange(CertificationMarkFields.GREAT)}
                                   className={classes.input}/>
                        <TextField value={marks ? marks[CertificationMarkFields.UNSATISFACTORY] : ''}
                                   label='Оценка "неудовлетворительно"'
                                   fullWidth
                                   multiline
                                   rows={5}
                                   variant='outlined'
                                   onBlur={this.handleInputBlur(CertificationMarkFields.GREAT)}
                                   onChange={this.handleInputChange(CertificationMarkFields.GREAT)}
                                   className={classes.input}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Assessment));
