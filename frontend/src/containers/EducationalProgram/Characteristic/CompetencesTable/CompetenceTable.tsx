import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import get from 'lodash/get';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";

import actions from '../../actions';

import {CompetenceTableProps} from './types';

import useStyles from './CompetencesTable.style';
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import {CompetenceTableType} from "../../enum";
import {Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export const CompetenceTable: React.FC<CompetenceTableProps> = ({competenceTableType, tableData}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const canEdit = true; //todo: change

    const createNewGroup = (): void => {
        dispatch(actions.characteristicCreateGroup({name: 'Новая категория', type: competenceTableType}));
    };
    const saveGroupTitle = (title: string): void => {
        // dispatch(actions.characteristicSaveGroupTitle({title}));
    };
    const saveGroupCompetence = (competenceId: number): void => {
        // dispatch(actions.characteristicSaveCompetence({competenceId}));
    };
    const saveGroupIndicator = (indicatorId: number): void => {
        // dispatch(actions.characteristicSaveIndicators({indicatorId}));
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
        }
    }

    return (
        <div className={classes.root}>
            <Table stickyHeader size='small'>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>
                            Категория компетенций
                        </TableCell>
                        <TableCell>
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

                        if (competences.length === 0){
                            return (
                                <TableRow key={`item-${item.id}`}>
                                    <TableCell>
                                        {get(item, 'name')}
                                    </TableCell>
                                    <TableCell />
                                    <TableCell />
                                    <TableCell className={classes.actions}>
                                        <IconButton onClick={deleteGroup(item.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        }

                        return competences.map((competenceItem: any, competenceIndex: number) => (
                            <TableRow key={`competence-${get(competenceItem, 'competence.id')}`}>
                                {competenceIndex === 0 &&
                                    <TableCell rowSpan={competences.length}>
                                        {get(item, 'name')}
                                    </TableCell>
                                }
                                <TableCell>
                                    {get(competenceItem, 'competence.number')} {get(competenceItem, 'competence.name')}
                                    <Tooltip title="Удалить компетенцию">
                                        <DeleteIcon className={classes.deleteIcon}/>
                                    </Tooltip>
                                    <br/>
                                    {competenceIndex === competences.length - 1 &&
                                        <Button color="primary"
                                                variant="text"
                                                size="small"
                                                className={classes.addSmallButton}
                                        >
                                            <AddIcon/> Добавить компетенцию
                                        </Button>
                                    }
                                </TableCell>
                                <TableCell>
                                    {get(competenceItem, getIndicatorField()).map((indicatorItem: any) => (
                                        <>
                                            {get(indicatorItem, 'indicator.number')} {get(indicatorItem, 'indicator.name')}
                                            <Tooltip title="Удалить индикатор">
                                                <DeleteIcon className={classes.deleteIcon}/>
                                            </Tooltip>
                                            <br/>
                                        </>
                                    ))}
                                    <Button color="primary"
                                            variant="text"
                                            size="small"
                                            className={classes.addSmallButton}
                                    >
                                        <AddIcon/> Добавить индикатор
                                    </Button>
                                </TableCell>
                                <TableCell className={classes.actions}>
                                    <Tooltip title="Удалить группу">
                                        <IconButton onClick={deleteGroup(item.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
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
        </div>
    )
};
