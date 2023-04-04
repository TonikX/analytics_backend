import React from "react";
import {
    CertificationFields,
    CertificationMarkFields,
    CertificationSteps,
    TemplateTextCertificationFields
} from "../../enum";
import connect from "./connect";
import {WithStyles, withStyles} from "@mui/styles";
import styles from "../styles";
import {FormControl, MenuItem, TextField, Typography} from "@mui/material";
import {CertificationActions, CertificationMark, CertificationState, TemplateTextState} from "../../types";
import get from "lodash/get";
import {markTypesRussian} from "../../constants";
import Scrollbars from "react-custom-scrollbars-2";

interface AssessmentProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
    templateText: TemplateTextState;
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
        //@ts-ignore
        const {classes} = this.props;

        const {fields, templateText} = this.props;
        const {activeField} = this.state;

        const professionalProblems = templateText[TemplateTextCertificationFields.PROFESSIONAL_PROBLEMS_MARKS];
        const marks = (fields as any)[activeField] as CertificationMark;

        return (
            <div className={classes.content}>
                <Scrollbars>
                    <Typography variant='h5'>
                        {CertificationSteps.ASSESSMENT}
                    </Typography>
                    <FormControl fullWidth className={classes.markTypeSelect}>
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
                        <div className={classes.leftColumn}>
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
                                       onBlur={this.handleInputBlur(CertificationMarkFields.SATISFACTORILY)}
                                       onChange={this.handleInputChange(CertificationMarkFields.SATISFACTORILY)}
                                       className={classes.input}/>
                        </div>
                        <div className={classes.rightColumn}>
                            <TextField value={marks ? marks[CertificationMarkFields.GOOD] : ''}
                                       label='Оценка "хорошо"'
                                       fullWidth
                                       multiline
                                       rows={5}
                                       variant='outlined'
                                       onBlur={this.handleInputBlur(CertificationMarkFields.GOOD)}
                                       onChange={this.handleInputChange(CertificationMarkFields.GOOD)}
                                       className={classes.input}/>
                            <TextField value={marks ? marks[CertificationMarkFields.UNSATISFACTORY] : ''}
                                       label='Оценка "неудовлетворительно"'
                                       fullWidth
                                       multiline
                                       rows={5}
                                       variant='outlined'
                                       onBlur={this.handleInputBlur(CertificationMarkFields.UNSATISFACTORY)}
                                       onChange={this.handleInputChange(CertificationMarkFields.UNSATISFACTORY)}
                                       className={classes.input}/>
                        </div>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <Typography>
                            Готовность к решению профессиональных задач
                        </Typography>
                        <Typography>
                            отлично - {professionalProblems ? professionalProblems[CertificationMarkFields.GREAT] : ''}
                        </Typography>
                        <Typography>
                            хорошо - {professionalProblems ? professionalProblems[CertificationMarkFields.GOOD] : ''}
                        </Typography>
                        <Typography>
                            удовлетворительно
                            - {professionalProblems ? professionalProblems[CertificationMarkFields.SATISFACTORILY] : ''}
                        </Typography>
                        <Typography>
                            неудовлетворительно
                            - {professionalProblems ? professionalProblems[CertificationMarkFields.UNSATISFACTORY] : ''}
                        </Typography>
                    </div>
                    <Typography style={{marginTop: '30px'}} align="justify">
                        {templateText[TemplateTextCertificationFields.VKR_MARK]}
                    </Typography>
                </Scrollbars>
            </div>
        )
            ;
    }
}

export default connect(withStyles(styles)(Assessment));
