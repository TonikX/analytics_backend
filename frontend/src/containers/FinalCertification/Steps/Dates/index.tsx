import React from "react";
import {CertificationFields, CertificationStepsRussian} from "../../enum";
import get from "lodash/get";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {CertificationActions, CertificationState} from "../../types";
import Input from "../../components/Input";

interface DatesProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
}

class Dates extends React.Component<DatesProps> {
    saveField = (field: string) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        this.props.actions.setField({field, value});
    }

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {CertificationStepsRussian.DATES}
                </Typography>
                <div className={classes.leftColumn}>
                    <Input label='Заполнение и согласование задания на ВКР в ИСУ'
                           fieldName={CertificationFields.FILLING_AND_APPROVAL_TIME}/>
                    <Input label='Работа над содержанием ВКР' fieldName={CertificationFields.WORK_ON_VKR_CONTENT_TIME}/>
                    <Input label='Предварительная защита ВКР' fieldName={CertificationFields.PRE_DEFENCE_TIME}/>
                    <Input label='Проверка текста ВКР в системе “Антиплагиат”'
                           fieldName={CertificationFields.ANTI_PLAGIARISM_ANALYSIS_TIME}/>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Dates));