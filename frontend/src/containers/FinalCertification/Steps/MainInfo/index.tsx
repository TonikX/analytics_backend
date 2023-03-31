import React from "react";
import {CertificationFields, CertificationSteps} from "../../enum";
import connect from "./connect";
import withStyles from "@mui/material/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@mui/material";
import {CertificationActions, CertificationState} from "../../types";
import Input from "../../components/Input";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {StructuralUnitsActions} from "../../../StructuralUnits/types";
import StructuralUnit from "../../components/StructuralUnit";
import Select from "../../../FinalCertification/components/Select";

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import UserSelector from "../../../EmailWidget/UserSelector";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@mui/material/Chip";
import {getUserFullName} from "../../../../common/utils";
import {UserFields} from "../../../../layout/enum";
import {UserType} from "../../../../layout/types";

interface MainInfoProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
    structuralUnitsList: SelectorListType;
    structuralUnitActions: StructuralUnitsActions;
    canAddEditors: boolean,
    isCanEdit: boolean
}

export const GIA_TITLES = [
    {
        value: 'preparation',
        label: 'Подготовка к защите и защита ВКР',
    },
    {
        value: 'preparation-en',
        label: 'Подготовка к защите и защита ВКР / Preparation for Thesis Defense and Thesis Defense',
    }
];

class MainInfo extends React.Component<MainInfoProps> {
    state = {
        addEditorsMode: false
    }

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

    deleteEditor = (userId: number) => () => {
        const {editors} = this.props.fields;
    
        this.props.actions.saveField({
          field: CertificationFields.EDITORS,
          value: editors.reduce((editors: Array<number>, user: UserType) => {
            if (user[UserFields.ID] !== userId) {
              editors.push(user[UserFields.ID]);
            }
            return editors;
          }, [])
        });
      }

    handleAddUser = (user: {value: number; label: string}) => {
        const {editors} = this.props.fields;
        this.props.actions.saveField({
          field: CertificationFields.EDITORS,
          value: [
            ...editors.map((user:UserType) => user[UserFields.ID]),
            user.value
          ]
        });
    
        this.setState({
          addEditorsMode: false
        });
      }

    render() {
        const {classes, canAddEditors, isCanEdit, fields} = this.props;
        const {addEditorsMode} = this.state;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {CertificationSteps.MAIN}
                </Typography>
                <div className={classes.columns}>
                    <div className={classes.leftColumn}>
                        <Input fieldName={CertificationFields.DISCIPLINE_CODE}/>
                        <Select fieldName={CertificationFields.TITLE}
                                metaList={GIA_TITLES}/>
                        <Input fieldName={CertificationFields.YEAR}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <Input fieldName={CertificationFields.OP_LEADER}/>
                        <Input fieldName={CertificationFields.AUTHORS}/>
                        <StructuralUnit/>
                    </div>
                </div>

                <Typography className={classes.editorTitle}>
                    Редакторы:
                </Typography>

                <div className={classes.editorsList}>
                    {fields.editors && fields.editors.map && fields.editors.map((editor: UserType) =>
                    <Chip label={getUserFullName(editor)}
                            onDelete={isCanEdit ? this.deleteEditor(editor[UserFields.ID]) : undefined}
                            className={classes.editorItem}
                    />
                    )}
                </div>

                {addEditorsMode ?
                    <Dialog open
                            fullWidth
                            maxWidth="sm"
                            classes={{
                            paper: classes.dialog
                            }}
                            onClose={() => this.setState({addEditorsMode: false})}
                    >
                    <UserSelector handleChange={this.handleAddUser}
                                    selectorLabel="Выберите редактора"
                                    label="Выберите редактора"
                                    noMargin
                    />
                    </Dialog>
                    :
                    canAddEditors
                    ?
                    <Button onClick={() => this.setState({addEditorsMode: true})}
                            variant="text"
                            className={classes.addEditorButton}
                    >
                        <AddIcon/> Добавить редактора
                    </Button>
                    :
                    <></>
                }
            </div>
        );
    }
}

export default connect(withStyles(styles)(MainInfo));
