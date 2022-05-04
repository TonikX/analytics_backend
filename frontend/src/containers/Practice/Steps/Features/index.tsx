import React from "react";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import get from "lodash/get";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState} from "../../types";
import Input from "../../components/Input";
import {PRACTICE_FORMATS, PRACTICE_WAYS} from "../../constants";
import Select from "../../components/Select";

interface FeaturesProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
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
                    {PracticeStepsRussian.FEATURES}
                </Typography>
                <Select label='Способ прохождения практики' fieldName={PracticeFields.WAY_OF_DOING_PRACTICE}
                        metaList={PRACTICE_WAYS}/>
                <Select label='Формат прохождения практики' fieldName={PracticeFields.FORMAT_PRACTICE}
                        metaList={PRACTICE_FORMATS}/>
                <Input label='Особенности содержания и прохождения практики'
                       fieldName={PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP}/>
                <Input label='Дополнительные отчётные материалы'
                       fieldName={PracticeFields.ADDITIONAL_REPORTING_MATERIALS}
                       multiline
                       rows={2}/>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Features));