import React from "react";
import {CertificationFields, CertificationSteps, TemplateTextCertificationFields} from "../../enum";
import get from "lodash/get";
import connect from "./connect";
import {WithStyles, withStyles} from "@mui/styles";
import styles from "../styles";
import {Typography} from "@mui/material";
import {CertificationActions, CertificationState, TemplateTextState} from "../../types";
import Input from "../../components/Input";
import ReadonlyRow from "./ReadonlyRow";
import Scrollbars from "react-custom-scrollbars-2";
import QuestionIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip/Tooltip";

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

        //@ts-ignore
        const {classes} = this.props;
        const {templateText} = this.props;

        return (
            <div className={classes.content}>
                <Scrollbars>
                    <Typography variant='h5'>
                        {CertificationSteps.DATES}
                    </Typography>
                    <Typography>
                        Предварительная защита ВКР является формой промежуточной аттестации по преддипломной практике.
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
                        <div className={classes.inputWrapperRelative}>
                            <Input fieldName={CertificationFields.ANTI_PLAGIARISM_ANALYSIS_TIME}/>
                            <Tooltip
                                title="Заполняется при наличии особенностей проверки в системе Антиплагиат на ОП (процент оригинальности/заимстований отличный от ЛНА, особенности организации и пр.)">
                                <QuestionIcon color="secondary" className={classes.tooltipIconAbsolute}/>
                            </Tooltip>
                        </div>
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
// @ts-ignore
export default connect(withStyles(styles)(Dates));
