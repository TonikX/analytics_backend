import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import get from 'lodash/get';

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import AddCompetenceModal from "../../../../components/AddCompetenceModal";
import AddIndicatorsModal from "../../../../components/AddIndicatorsModal";
import EditableText from "../../../../components/EditableText";

import actions from '../../actions';
import {CompetenceTableType} from "../../enum";

import {CompetenceTableProps} from './types';

import useStyles from './CompetencesTable.style';

export const CompetenceTable: React.FC<CompetenceTableProps> = ({competenceTableType, tableData}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [competenceModalData, changeCompetenceOpenModal] = useState({isOpen: false, groupId: 0});
    const [indicatorModalData, changeIndicatorOpenModal] = useState({isOpen: false, competenceId: 0, competenceIdRelation: 0});
    const [editGroupTitleData, changeEditGroupTitle] = useState({isEdit: false, groupId: 0});

    const createNewGroup = (): void => {
        dispatch(actions.educationalStandardCreateGroup({name: 'Новая категория', type: competenceTableType}));
    };

    const saveCompetence = ({value}: { value: number, label: string }): void => {
        dispatch(actions.educationalStandardSaveCompetence({
            competenceId: value,
            type: competenceTableType,
            groupId: competenceModalData.groupId
        }));
    }

    const deleteCompetence = (competenceId: number) => () => {
        dispatch(actions.educationalStandardDeleteCompetence({
            competenceId,
            type: competenceTableType,
        }));
    }

    const saveIndicator = (indicators: Array<{value: number}>): void => {
        dispatch(actions.educationalStandardSaveIndicator({
            indicatorId: indicators.map(item => item.value),
            competenceId: indicatorModalData.competenceIdRelation,
            type: competenceTableType,
        }));
    }

    const deleteIndicator = (indicatorId: number) => () => {
        dispatch(actions.educationalStandardDeleteIndicator({
            indicatorId,
            type: competenceTableType,
        }));
    }

    const saveGroupTitle = (title: string): void => {
        dispatch(actions.educationalStandardSaveGroupTitle({
            title,
            type: competenceTableType,
            groupId: editGroupTitleData.groupId
        }));

        changeEditGroupTitle({isEdit: false, groupId: 0})
    };

    const deleteGroup = (groupId: number) => (): void => {
        dispatch(actions.educationalStandardDeleteGroup({groupId, type: competenceTableType}));
    };

    const getCompetenceField = (): string => {
        switch (competenceTableType){
            case CompetenceTableType.GENERAL_PROFESSIONAL_COMPETENCES:
                return 'competence_in_group_of_general_prof_competences'
            case CompetenceTableType.KEY_COMPETENCES:
                return 'competence_in_group_of_key_competences';
            case CompetenceTableType.SUPRA_PROFESSIONAL_COMPETENCES:
                return 'competence_in_group_of_over_prof_competences';
            default:
                return '';
        }
    }
    const getIndicatorField = (): string => {
        switch (competenceTableType){
            case CompetenceTableType.GENERAL_PROFESSIONAL_COMPETENCES:
                return 'indicator_of_competence_in_group_of_general_prof_competences'
            case CompetenceTableType.KEY_COMPETENCES:
                return 'indicator_of_competence_in_group_of_key_competences';
            case CompetenceTableType.SUPRA_PROFESSIONAL_COMPETENCES:
                return 'indicator_of_competence_in_group_of_over_prof_competences';
            default:
                return '';
        }
    }

    return (
        <div className={classes.root}>
            <Table stickyHeader size='small'>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.categoryCell}>
                            Категория компетенций
                        </TableCell>
                        <TableCell className={classes.competenceCell}>
                            Код и название компетенции
                        </TableCell>
                        <TableCell>
                            Индикаторы
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData?.map((item: any) => {
                        const competences = get(item, getCompetenceField(), []);
                        const competenceAddButton = (
                            <Button color="primary"
                                    variant="text"
                                    size="small"
                                    className={classes.addSmallButton}
                                    onClick={() => changeCompetenceOpenModal({isOpen: true, groupId: item.id})}
                            >
                                <AddIcon/> Добавить компетенцию
                            </Button>
                        );

                        const groupTitle = (
                            <EditableText value={get(item, 'name')}
                                          isEditMode={editGroupTitleData.isEdit && editGroupTitleData.groupId === item.id}
                                          onClickDone={saveGroupTitle}
                                          onClickCancel={() => changeEditGroupTitle({isEdit: false, groupId: 0})}
                                          onValueClick={() => changeEditGroupTitle({isEdit: true, groupId: item.id})}
                                          fullWidth
                            />
                        );

                        const deleteGroupButton = (
                            <Button
                                color="secondary"
                                variant="text"
                                size="small"
                                className={classes.addSmallButton}
                                onClick={deleteGroup(item.id)}
                            >
                                <DeleteIcon /> Удалить категорию
                            </Button>
                        );

                        if (competences.length === 0){
                            return (
                                <TableRow key={`item-${item.id}`}>
                                    <TableCell className={classes.categoryCell}>
                                        {groupTitle}
                                        {deleteGroupButton}
                                    </TableCell>
                                    <TableCell className={classes.competenceCell}>
                                        {competenceAddButton}
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            )
                        }

                        return competences.map((competenceItem: any, competenceIndex: number) => (
                            <TableRow key={`competence-${get(competenceItem, 'competence.id')}`}>
                                {competenceIndex === 0 &&
                                    <TableCell rowSpan={competences.length} className={classes.categoryCell}>
                                        {groupTitle}
                                        {deleteGroupButton}
                                    </TableCell>
                                }
                                <TableCell className={classes.competenceCell}>
                                    {get(competenceItem, 'competence.number')} {get(competenceItem, 'competence.name')}
                                    <Tooltip title="Удалить компетенцию">
                                        <DeleteIcon className={classes.deleteIcon} onClick={deleteCompetence(competenceItem.id)}/>
                                    </Tooltip>
                                    <br/>
                                    {competenceIndex === competences.length - 1 && competenceAddButton}
                                </TableCell>
                                <TableCell>
                                    {get(competenceItem, getIndicatorField()).map((indicatorItem: any) => (
                                        <div key={indicatorItem.id}>
                                            {get(indicatorItem, 'indicator.number')} {get(indicatorItem, 'indicator.name')}
                                            <Tooltip title="Удалить индикатор">
                                                <DeleteIcon className={classes.deleteIcon}
                                                            onClick={deleteIndicator(indicatorItem.id)}
                                                />
                                            </Tooltip>
                                            <br/>
                                        </div>
                                    ))}
                                    <Button color="primary"
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
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ));
                    })}
                </TableBody>
            </Table>

            <Button className={classes.addButton}
                    onClick={createNewGroup}
                    variant="outlined"
                    size="small"
            >
                Добавить новую категорию
            </Button>

            <AddCompetenceModal closeDialog={() => changeCompetenceOpenModal({isOpen: false, groupId: 0})}
                                isOpen={competenceModalData.isOpen}
                                saveDialog={saveCompetence}
            />
            <AddIndicatorsModal closeDialog={() => changeIndicatorOpenModal({isOpen: false, competenceId: 0, competenceIdRelation: 0})}
                                isOpen={indicatorModalData.isOpen}
                                saveDialog={saveIndicator}
                                competenceId={indicatorModalData.competenceId}
            />
        </div>
    )
};
