import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import get from 'lodash/get';

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";

import actions from '../../actions';

import {CompetenceTableProps} from './types';

import {CompetenceTableType} from "../../enum";
import EditableText from "../../../../components/EditableText/EditableText";

import AddCompetenceModal from "../../../../components/AddCompetenceModal";
import AddIndicatorsModal from "../../../../components/AddIndicatorsModal";

import useStyles from './MinorProfessionalCompetences.style';
import useStylesReusable  from '../CompetencesTable/CompetencesTable.style';
import {appRouter} from "../../../../service/router-service";
import {Link} from "react-router-dom";
import {getEducationalProgramCharacteristicCanEdit} from "../../getters";

export const MinorProfessionalCompetences: React.FC<CompetenceTableProps> = ({tableData}) => {
  const dispatch = useDispatch();
  const classes = {
    ...useStylesReusable(),
    ...useStyles()
  };
  const canEdit = useSelector((state: any) => getEducationalProgramCharacteristicCanEdit(state))

  const competenceTableType = CompetenceTableType.PROFESSIONAL_COMPETENCES;

  const [competenceModalData, changeCompetenceOpenModal] = useState({isOpen: false, groupId: 0});
  const [indicatorModalData, changeIndicatorOpenModal] = useState({isOpen: false, competenceId: 0, competenceIdRelation: 0});
  const [editGroupTitleData, changeEditGroupTitle] = useState({isEdit: false, groupId: 0});
  const [editCompetenceLaborFunctionData, changeEditCompetenceLaborFunction] = useState({isEdit: false, competenceId: 0});

  const createNewGroup = (): void => {
    dispatch(actions.characteristicCreateGroup({name: 'Новая категория', type: competenceTableType, subType: 'min'}));
  };

  const saveCompetence = ({value}: { value: number, label: string }): void => {
    dispatch(actions.characteristicSaveCompetence({
      competenceId: value,
      type: competenceTableType,
      groupId: competenceModalData.groupId
    }));
  }

  const deleteCompetence = (competenceId: number) => () => {
    dispatch(actions.characteristicDeleteCompetence({
      competenceId,
      type: competenceTableType,
    }));
  }

  const saveIndicator = (indicators: Array<{value: number}>): void => {
    dispatch(actions.characteristicSaveIndicator({
      indicatorId: indicators.map(item => item.value),
      competenceId: indicatorModalData.competenceIdRelation,
      type: competenceTableType,
    }));
  }

  const deleteIndicator = (indicatorId: number) => () => {
    dispatch(actions.characteristicDeleteIndicator({
      indicatorId,
      type: competenceTableType,
    }));
  }

  const saveGroupTitle = (title: string): void => {
    dispatch(actions.characteristicSaveGroupTitle({
      title,
      type: competenceTableType,
      groupId: editGroupTitleData.groupId
    }));

    changeEditGroupTitle({isEdit: false, groupId: 0})
  };

  const saveGroupLaborFunctions = (kindOfActivity: string): void => {
    dispatch(actions.characteristicSaveCompetenceKindsOfActivity({
      kindOfActivity,
      type: competenceTableType,
      competenceId: editCompetenceLaborFunctionData.competenceId
    }));

    changeEditCompetenceLaborFunction({isEdit: false, competenceId: 0})
  };

  const deleteGroup = (groupId: number) => (): void => {
    dispatch(actions.characteristicDeleteGroup({groupId, type: competenceTableType}));
  };

  return (
    <div className={classes.root}>
      <Table stickyHeader size='small'>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.competenceCell}>
              Код и название компетенции
            </TableCell>
            <TableCell className={classes.indicatorCell}>
              Код и наименование индикатора достижения компетенции
            </TableCell>
            <TableCell className={classes.standardCell}>
              Наименование трудовой функции
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item: any) => {
            const competences = get(item, 'competence_in_group_of_pk_competences', []);
            const groupRow = (
              <TableRow className={classes.groupRowWrap}>
                <TableCell colSpan={5}
                           align="center"
                >
                  <div className={classes.groupRow}>
                    <div className={classes.editableGroupTitleWrap}>
                      <EditableText value={get(item, 'name')}
                                    isEditMode={editGroupTitleData.isEdit && editGroupTitleData.groupId === item.id}
                                    onClickDone={saveGroupTitle}
                                    onClickCancel={() => changeEditGroupTitle({isEdit: false, groupId: 0})}
                                    onValueClick={() => changeEditGroupTitle({isEdit: true, groupId: item.id})}
                                    fullWidth
                                    disabled={!canEdit}
                      />
                    </div>

                    {canEdit ? <Tooltip title="Удалить группу">
                      <IconButton onClick={deleteGroup(item.id)}>
                        <DeleteIcon/>
                      </IconButton>
                    </Tooltip> : null}
                  </div>
                </TableCell>
              </TableRow>
            );

            const addCompetenceRow = canEdit ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Button color="primary"
                          variant="text"
                          size="small"
                          onClick={() => changeCompetenceOpenModal({isOpen: true, groupId: item.id})}
                  >
                    <AddIcon/> Добавить компетенцию
                  </Button>
                </TableCell>
              </TableRow>
            ) : null;

            if (competences.length === 0) {
              return (
                <>
                  {groupRow}
                  {addCompetenceRow}
                </>
              );
            }

            return (
              <>
                {groupRow}
                {competences.map((competenceItem: any) => (
                  <TableRow key={`competence-${get(competenceItem, 'competence.id')}`}>
                    <TableCell className={classes.competenceCell}>
                      <Link
                        to={appRouter.getCompetenceIndicatorsRouteLink(get(competenceItem, 'competence.id'))}
                        target="_blank"
                        className={classes.link}
                      >
                        {get(competenceItem, 'competence.number')} {get(competenceItem, 'competence.name')}
                      </Link>
                      {canEdit ? <Tooltip title="Удалить компетенцию">
                        <DeleteIcon className={classes.deleteIcon} onClick={deleteCompetence(competenceItem.id)} />
                      </Tooltip> : null}
                      <br/>
                    </TableCell>
                    <TableCell>
                      {get(competenceItem, 'indicator_of_competence_in_group_of_pk_competences').map((indicatorItem: any) => (
                        <>
                          {get(indicatorItem, 'indicator.number')} {get(indicatorItem, 'indicator.name')}
                          {canEdit ? <Tooltip title="Удалить индикатор" onClick={deleteIndicator(indicatorItem.id)}>
                            <DeleteIcon className={classes.deleteIcon}/>
                          </Tooltip> : null}
                          <br/>
                        </>
                      ))}
                      {canEdit ? <Button color="primary"
                              variant="text"
                              size="small"
                              className={classes.addSmallButton}
                              onClick={() => changeIndicatorOpenModal({
                                isOpen: true,
                                competenceId: get(competenceItem, 'competence.id'),
                                competenceIdRelation: competenceItem.id,
                              })}
                      >
                        <AddIcon/> Добавить индикатор
                      </Button> : null}
                    </TableCell>
                    <TableCell className={classes.standardCell}>

                      <EditableText value={get(competenceItem, 'kinds_of_activity_for_miner') || 'трудовая функция'}
                                    isEditMode={editCompetenceLaborFunctionData.isEdit
                                      && editCompetenceLaborFunctionData.competenceId === competenceItem.id
                                    }
                                    onClickDone={saveGroupLaborFunctions}
                                    onClickCancel={() => changeEditCompetenceLaborFunction({isEdit: false, competenceId: 0})}
                                    onValueClick={() => changeEditCompetenceLaborFunction({isEdit: true, competenceId: competenceItem.id})}
                                    fullWidth
                                    disabled={!canEdit}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {addCompetenceRow}
              </>
            );
          })}
        </TableBody>
      </Table>

      {canEdit ? <Button className={classes.addButton}
              onClick={createNewGroup}
              variant="outlined"
              size="small"
      >
        Добавить новую категорию
      </Button> : null}


      <AddCompetenceModal closeDialog={() => changeCompetenceOpenModal({isOpen: false, groupId: 0})}
                          isOpen={competenceModalData.isOpen}
                          saveDialog={saveCompetence}
                          competenceType="ПК"
      />
      <AddIndicatorsModal closeDialog={() => changeIndicatorOpenModal({isOpen: false, competenceId: 0, competenceIdRelation: 0})}
                          isOpen={indicatorModalData.isOpen}
                          saveDialog={saveIndicator}
                          competenceId={indicatorModalData.competenceId}
      />
    </div>
  )
};

export default MinorProfessionalCompetences