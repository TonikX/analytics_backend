import React from 'react'
import {Link} from "react-router-dom";
import { useDispatch } from 'react-redux'

import { useStyles } from './PersonalitiesTable.styles'

import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Scrollbars from "react-custom-scrollbars";
import {PersonalityFields} from '../enum';
import { PersonalitiesTableProps } from './types'
import { groupType } from '../types';

export const PersonalitiesTable: React.FC<PersonalitiesTableProps> = ({personalities}) => {
    const classes = useStyles()

    const getGroups = (groups: Array<groupType>) => {
         return groups.map(group => <div className={classes.role}>{group?.name}</div>)
    }
    return(
        <Scrollbars>
            <div className={classes.tableWrap}>
                <Table stickyHeader>
                    <TableHead className={classes.header}>
                        <TableRow>
                            <TableCell>
                                <Typography component="div">
                                    ФИО
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography component="div">
                                    Группы
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {personalities.map(personality => {
                            if (personality[PersonalityFields.FIRST_NAME] != '') {
                            return (
                            <TableRow key={personality[PersonalityFields.ID]}>
                                <TableCell className={classes.link}>
                                    <Link target='_blank' to={`/personality/${personality[PersonalityFields.ID]}`}>
                                        {personality[PersonalityFields.FIRST_NAME]} {personality[PersonalityFields.LAST_NAME]}
                                    </Link>
                                </TableCell>
                                <TableCell >
                                    <div className={classes.groups}>{getGroups(personality[PersonalityFields.GROUPS])}</div>
                                </TableCell>
                            </TableRow>
                            )}}
                        )}
                    </TableBody>
                </Table>
            </div>
        </Scrollbars>
    )
}