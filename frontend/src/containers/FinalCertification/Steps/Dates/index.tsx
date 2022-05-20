import React from "react";
import {CertificationFields, CertificationStepsRussian, TemplateTextCertificationFields} from "../../enum";
import get from "lodash/get";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {CertificationActions, CertificationState, TemplateTextState} from "../../types";
import Input from "../../components/Input";
import ReadonlyRow from "./ReadonlyRow";
import Scrollbars from "react-custom-scrollbars";

interface DatesProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
    templateText: TemplateTextState,
}

class Dates extends React.Component<DatesProps> {
    saveField = (field: string) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        this.props.actions.setField({field, value});
    }

    render() {

        const {classes, templateText} = this.props;

        return (
            <div className={classes.content}>
                <Scrollbars>
                    <Typography variant='h5'>
                        {CertificationStepsRussian.DATES}
                    </Typography>

                    <div className={classes.singleColumn}>
                        <ReadonlyRow
                            label='Выбор и согласование темы и руководителя ВКР (заполнение заявления в ИСУ)'
                            value={templateText[TemplateTextCertificationFields.VKR_THEME_CHOICE_TIME]}/>
                        <ReadonlyRow label='Корректировка / уточнение темы ВКР'
                                     value={templateText[TemplateTextCertificationFields.CORRECTION_THEME_TIME]}/>
                        <Input fieldName={CertificationFields.FILLING_AND_APPROVAL_TIME}/>
                        <Input fieldName={CertificationFields.WORK_ON_VKR_CONTENT_TIME}/>
                        <Input fieldName={CertificationFields.PRE_DEFENCE_TIME}/>
                        <Input fieldName={CertificationFields.ANTI_PLAGIARISM_ANALYSIS_TIME}/>
                        <ReadonlyRow label='Загрузка итоговой работы в ИСУ'
                                     value={templateText[TemplateTextCertificationFields.UPLOAD_TO_ISU_TIME]}/>
                        <ReadonlyRow label='Предоставление отзыва руководителем ВКР'
                                     value={templateText[TemplateTextCertificationFields.MANAGER_FEEDBACK_TIME]}/>
                        <ReadonlyRow label='Подтверждение ознакомления с отзывом руководителя на ВКР в ИСУ'
                                     value={templateText[TemplateTextCertificationFields.MANAGER_FEEDBACK_ACCEPTION_TIME]}/>
                        <ReadonlyRow label='Представление материалов в ГЭК'
                                     value={templateText[TemplateTextCertificationFields.PRESENTATION_OF_MATERIALS_TIME]}/>
                        <ReadonlyRow label='Защита ВКР'
                                     value={templateText[TemplateTextCertificationFields.VKR_DEFENCE_TIME]}/>
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Dates));