import {WithStyles} from "@material-ui/core";
import styles from "./styles";
import {PracticeActions} from "../../types";
import {PracticeFields} from "../../enum";
import React, {ReactText} from "react";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleSelector from "../../../../components/SimpleSelector";
import InputsLoader from "../../../../components/InputsLoader";

type SelectOption = {
    label: string;
    value: ReactText;
}

interface SelectProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fieldName: PracticeFields;
    fields: any;
    metaList: Array<SelectOption>;
    label: string;
    getLoading: (fieldName: string) => boolean,
}

class Select extends React.Component<SelectProps> {

    saveSelect = (field: string) => (value: string) => {
        this.props.actions.saveField({field, value})
    }

    render() {
        const {fields, classes, metaList, fieldName, label, getLoading} = this.props;

        return (
            <div style={{marginTop: '30px'}}>
                <InputsLoader loading={getLoading(fieldName)}>
                    <SimpleSelector label={label}
                                    metaList={metaList}
                                    value={fields[fieldName]}
                                    wrapClass={classes.selectorWrap}
                                    noMargin
                                    onChange={this.saveSelect(fieldName)}
                    />
                </InputsLoader>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Select));