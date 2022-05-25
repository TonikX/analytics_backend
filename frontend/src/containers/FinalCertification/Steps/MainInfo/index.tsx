import React from "react";
import {CertificationFields, CertificationSteps} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {CertificationActions, CertificationState} from "../../types";
import Input from "../../components/Input";
import SearchSelector from "../../../../components/SearchSelector/SearchSelector";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {StructuralUnitsActions} from "../../../StructuralUnits/types";
import {RussianCertificationFields} from "../../constants";

interface MainInfoProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
    structuralUnitsList: SelectorListType;
    structuralUnitActions: StructuralUnitsActions;
}

class MainInfo extends React.Component<MainInfoProps> {

    componentDidMount() {
        this.props.structuralUnitActions.getStructuralUnits();
    }

    handleChangeStructuralUnitSearchText = (search: string) => {
        this.props.structuralUnitActions.changeSearchQuery(search);
        this.props.structuralUnitActions.getStructuralUnits();
    }

    changeStructuralUnit = (value: string) => {
        this.props.actions.saveField({field: CertificationFields.STRUCTURAL_UNIT, value})
    }

    render() {

        const {classes, structuralUnitsList, fields} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {CertificationSteps.MAIN}
                </Typography>
                <div className={classes.columns}>
                    <div className={classes.leftColumn}>
                        <Input fieldName={CertificationFields.DISCIPLINE_CODE}/>
                        <Input fieldName={CertificationFields.TITLE}/>
                        <Input fieldName={CertificationFields.YEAR}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <Input fieldName={CertificationFields.OP_LEADER}/>
                        <Input fieldName={CertificationFields.AUTHORS}/>
                        <SearchSelector label={RussianCertificationFields[CertificationFields.STRUCTURAL_UNIT]}
                                        changeSearchText={this.handleChangeStructuralUnitSearchText}
                                        list={structuralUnitsList}
                                        className={classes.structuralUnit}
                                        changeItem={this.changeStructuralUnit}
                                        value={String(fields[CertificationFields.STRUCTURAL_UNIT]?.id)}
                                        valueLabel={fields[CertificationFields.STRUCTURAL_UNIT]?.title ?? ''}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(MainInfo));