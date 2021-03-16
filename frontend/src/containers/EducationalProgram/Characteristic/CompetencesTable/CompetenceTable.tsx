import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import get from 'lodash/get';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

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
        dispatch(actions.characteristicCreateGroup({name: 'Новая категория', type: competenceTableType}));
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

    const deleteGroup = (groupId: number) => (): void => {
        dispatch(actions.characteristicDeleteGroup({groupId, type: competenceTableType}));
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
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((item: any) => {
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

                        const deleteGroupIcon = (
                            <Tooltip title="Удалить группу">
                                <IconButton onClick={deleteGroup(item.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        );

                        if (competences.length === 0){
                            return (
                                <TableRow key={`item-${item.id}`}>
                                    <TableCell className={classes.categoryCell}>
                                        {groupTitle}
                                    </TableCell>
                                    <TableCell className={classes.competenceCell}>
                                        {competenceAddButton}
                                    </TableCell>
                                    <TableCell />
                                    <TableCell className={classes.actions}>
                                        {deleteGroupIcon}
                                    </TableCell>
                                </TableRow>
                            )
                        }

                        return competences.map((competenceItem: any, competenceIndex: number) => (
                            <TableRow key={`competence-${get(competenceItem, 'competence.id')}`}>
                                {competenceIndex === 0 &&
                                    <TableCell rowSpan={competences.length} className={classes.categoryCell}>
                                        {groupTitle}
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
                                        <>
                                            {get(indicatorItem, 'indicator.number')} {get(indicatorItem, 'indicator.name')}
                                            <Tooltip title="Удалить индикатор">
                                                <DeleteIcon className={classes.deleteIcon}
                                                            onClick={deleteIndicator(indicatorItem.id)}
                                                />
                                            </Tooltip>
                                            <br/>
                                        </>
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
                                <TableCell className={classes.actions}>
                                    {deleteGroupIcon}
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
