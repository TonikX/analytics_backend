import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import actions from '../../actions';

import {CompetenceTableProps} from './types';

import useStyles from './CompetencesTable.style';

export const CompetenceTable: React.FC<CompetenceTableProps> = ({competenceTableType, tableData}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const saveGroupTitle = (title: string): void => {
        dispatch(actions.characteristicSaveGroupTitle({title}));
    };
    const saveGroupCompetence = (competenceId: number): void => {
        dispatch(actions.characteristicSaveCompetence({competenceId}));
    };
    const saveGroupIndicator = (indicatorId: number): void => {
        dispatch(actions.characteristicSaveIndicators({indicatorId}));
    };
    const deleteGroup = (groupId: number): void => {
        dispatch(actions.characteristicDeleteGroup({groupId}));
    };

    return (
        <div className={classes.tableWrap}>
            <Table stickyHeader size='small'>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>
                            Категория компетенций
                        </TableCell>
                        <TableCell>
                            Код и название компетенций
                        </TableCell>
                        <TableCell>
                            Индикаторы
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
        </div>
    )
};
