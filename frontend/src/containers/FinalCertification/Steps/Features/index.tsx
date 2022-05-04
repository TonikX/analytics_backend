import React from "react";
import {CertificationFields, CertificationStepsRussian} from "../../enum";
import get from "lodash/get";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {CertificationActions, CertificationState} from "../../types";
import Input from "../../components/Input";

interface FeaturesProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
}

class Features extends React.Component<FeaturesProps> {
    saveField = (field: string) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        this.props.actions.setField({field, value});
    }

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {CertificationStepsRussian.FEATURES}
                </Typography>
                <Input label='Предзащита' fieldName={CertificationFields.PRELIMINARY_DEFENSE}/>
                <Input label='Антиплагиат' fieldName={CertificationFields.ANTI_PLAGIARISM}/>
                <Input label='Опциональные требования к оформлению ВКР' fieldName={CertificationFields.STRUCTURE_ELEMENTS_OPTIONAL}/>
                <Input label='Дополнительные требования к оформлению ВКР' fieldName={CertificationFields.PRELIMINARY_DEFENSE}/>
                <Input label='Требования к содержанию ВКР' fieldName={CertificationFields.CONTENT_REQUIREMENTS}/>
                <Input label='Требования к представлению ВКР' fieldName={CertificationFields.DEFENCE_PRESENTATION_REQUIREMENTS}/>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Features));