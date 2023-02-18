import React from "react";
import {PracticeFields, PracticeSteps} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState} from "../../types";
import Input from "../../components/Input";

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import UserSelector from "../../../EmailWidget/UserSelector";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import {getUserFullName} from "../../../../common/utils";
import {UserFields} from "../../../../layout/enum";

import Select from "../../components/Select";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {StructuralUnitsActions} from "../../../StructuralUnits/types";
import {
  LANGUAGES,
  PRACTICE_FORMATS,
  PRACTICE_KINDS,
  PRACTICE_TITLES,
  PRACTICE_TYPES,
  PRACTICE_WAYS,
  QUALIFICATIONS,
} from "../../constants";
import StructuralUnit from "../../components/StructuralUnit";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {UserType} from "../../../../layout/types";

interface GeneralInfoProps extends WithStyles<typeof styles> {
  actions: PracticeActions;
  fields: PracticeState;
  structuralUnitsList: SelectorListType;
  structuralUnitActions: StructuralUnitsActions;
  canAddEditors: boolean,
  isCanEdit: boolean
}

class GeneralInfo extends React.Component<GeneralInfoProps> {

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
    this.props.actions.saveField({field: PracticeFields.STRUCTURAL_UNIT, value})
  }

  deleteEditor = (userId: number) => () => {
    const {editors} = this.props.fields;

    this.props.actions.saveField({
      field: PracticeFields.EDITORS,
      value: editors.reduce((editors: Array<number>, user: UserType) => {
        if (user[UserFields.ID] !== userId) {
          editors.push(user[UserFields.ID]);
        }
        return editors;
      }, [])
    });
  }

  handleAddUser = (user: any) => {
    const {editors} = this.props.fields;
    this.props.actions.saveField({
      field: PracticeFields.EDITORS,
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
    const {classes, fields, canAddEditors, isCanEdit} = this.props;
    const semesterCount = fields[PracticeFields.SEMESTER_COUNT] || 0;
    const semesterColumns = new Array(semesterCount).fill(0);
    const ze = fields[PracticeFields.ZE_V_SEM] || "";
    const zeColumns = ze.split(", ");
    const {addEditorsMode} = this.state;

    return (
      <>
        <div className={classes.contentScroll}>
          <Typography variant='h5'>
            {PracticeSteps.GENERAL}
          </Typography>
          <div className={classes.columns}>
            <div className={classes.leftColumn}>
              <Input fieldName={PracticeFields.PRAC_ISU_ID} disabled/>
              <Select fieldName={PracticeFields.TITLE} metaList={
                PRACTICE_TITLES.map((item) => ({value: item.label, label: item.label}))
              }/>
              <Input fieldName={PracticeFields.YEAR}/>
              <Input fieldName={PracticeFields.OP_LEADER}/>
              <Select fieldName={PracticeFields.LANGUAGE} metaList={LANGUAGES}/>
              <Input fieldName={PracticeFields.AUTHORS}/>
            </div>
            <div className={classes.rightColumn}>
              <Select fieldName={PracticeFields.QUALIFICATION}
                      metaList={QUALIFICATIONS}/>
              <Select fieldName={PracticeFields.KIND_OF_PRACTICE}
                      metaList={PRACTICE_KINDS}/>
              <Select fieldName={PracticeFields.TYPE_OF_PRACTICE}
                      metaList={PRACTICE_TYPES}/>
              <Select fieldName={PracticeFields.WAY_OF_DOING_PRACTICE}
                      metaList={PRACTICE_WAYS}/>
              <Select fieldName={PracticeFields.FORMAT_PRACTICE}
                      metaList={PRACTICE_FORMATS}/>
              <StructuralUnit/>
            </div>
          </div>
          {
            semesterCount > 0 && (
              <TableContainer className={classes.table}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell rowSpan={2} className={classes.headerCell} colSpan={1}>
                        {' '}
                      </TableCell>
                      <TableCell className={classes.headerCell} colSpan={10}>
                        Семестр
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {semesterColumns.map((item, index) =>
                        <TableCell className={classes.headerCell}>{index + 1}</TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.headerCell}>
                        Зачетные единицы
                      </TableCell>
                      {semesterColumns.map((item: any, index: number) =>
                        <TableCell className={classes.cell}>{zeColumns[index]}</TableCell>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )
          }
        </div>

        <div className={classes.editorTitleRow}>
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
      </>
    );
  }
}

export default connect(withStyles(styles)(GeneralInfo));
