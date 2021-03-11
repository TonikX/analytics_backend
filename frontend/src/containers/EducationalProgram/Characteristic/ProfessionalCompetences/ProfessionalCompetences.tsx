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

import useStylesReusable from './ProfessionalCompetences.style';
import useStyles from '../CompetencesTable/CompetencesTable.style';

import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import {Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export const ProfessionalCompetences: React.FC<CompetenceTableProps> = ({tableData}) => {
    const dispatch = useDispatch();
    const classes = {
        ...useStylesReusable(),
        ...useStyles()
    };
    const canEdit = true; //todo: change

    const createNewGroup = (): void => {
        //dispatch(actions.characteristicCreateGroup({name: 'Новая категория', type: competenceTableType}));
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
        //dispatch(actions.characteristicDeleteGroup({groupId, type: competenceTableType}));
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
                            Наименование сопряженного профессионального стандарта
                        </TableCell>
                        <TableCell className={classes.functionsCell}>
                            Выбранные обобщенные трудовые функции
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((item: any) => {
                        const competences = get(item, 'competence_in_group_of_pk_competences', []);
                        const groupRow = (
                            <TableRow>
                                <TableCell colSpan={5}
                                           align="center"
                                >
                                    {get(item, 'name')}
                                    <Button color="primary"
                                            variant="text"
                                            size="small"
                                    >
                                        <AddIcon/> Добавить компетенцию
                                    </Button>

                                    <IconButton onClick={deleteGroup(item.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );

                        if (competences.length === 0) {
                            return groupRow;
                        }

                        return (
                            <>
                                {groupRow}
                                {competences.map((competenceItem: any) => (
                                    <TableRow key={`competence-${get(competenceItem, 'competence.id')}`}>
                                        <TableCell className={classes.competenceCell}>
                                            {get(competenceItem, 'competence.number')} {get(competenceItem, 'competence.name')}
                                            <Tooltip title="Удалить компетенцию">
                                                <DeleteIcon className={classes.deleteIcon}/>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            {get(competenceItem, 'indicator_of_competence_in_group_of_pk_competences').map((indicatorItem: any) => (
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
                                        <TableCell className={classes.standardCell}>
                                            {get(competenceItem, 'professional_standard.code')} {get(competenceItem, 'professional_standard.title')}
                                        </TableCell>
                                        <TableCell className={classes.functionsCell}>
                                            {get(competenceItem, 'labor_functions')}
                                        </TableCell>
                                        <TableCell className={classes.actions}>
                                            <Tooltip title="Удалить группу">
                                                <IconButton onClick={deleteGroup(item.id)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        );
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
