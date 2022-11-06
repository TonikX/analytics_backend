import React from "react";
import {CertificationFields, CertificationSteps} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {CertificationActions, CertificationState} from "../../types";
import Input from "../../components/Input";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {StructuralUnitsActions} from "../../../StructuralUnits/types";
import StructuralUnit from "../../components/StructuralUnit";
import {PracticeFields, PracticeKinds} from "../../../Practice/enum";
import {PRACTICE_KINDS} from "../../../Practice/constants";
import Select from "../../../Practice/components/Select";

interface MainInfoProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
    structuralUnitsList: SelectorListType;
    structuralUnitActions: StructuralUnitsActions;
}

const TITLES = [
    {
        value: 'preparation',
        label: 'Подготовка к защите и защита ВКР',
    },
    {
        value: 'preparation-en',
        label: 'Подготовка к защите и защита ВКР / Master Thesis Research and Defense',
    }
];

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

        const {classes} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {CertificationSteps.MAIN}
                </Typography>
                <div className={classes.columns}>
                    <div className={classes.leftColumn}>
                        <Input fieldName={CertificationFields.DISCIPLINE_CODE}/>
                        <Select fieldName={PracticeFields.TITLE}
                                metaList={TITLES}/>
                        <Input fieldName={CertificationFields.YEAR}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <Input fieldName={CertificationFields.OP_LEADER}/>
                        <Input fieldName={CertificationFields.AUTHORS}/>
                        <StructuralUnit/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(MainInfo));
