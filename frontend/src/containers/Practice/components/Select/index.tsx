import {WithStyles} from "@material-ui/core";
import styles from "./styles";
import {PracticeActions} from "../../types";
import {PracticeFields} from "../../enum";
import React, {ReactText} from "react";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleSelector from "../../../../components/SimpleSelector";

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
}

class Select extends React.Component<SelectProps> {

    saveSelect = (field: string) => (value: string) => {
        this.props.actions.saveField({field, value})
    }

    render() {
        const {fields, classes, metaList, fieldName, label} = this.props;

        return (
            <SimpleSelector label={label}
                            metaList={metaList}
                            value={fields[fieldName]}
                            wrapClass={classes.selectorWrap}
                            onChange={this.saveSelect(PracticeFields.LANGUAGE)}
            />
        );
    }
}

export default connect(withStyles(styles)(Select));