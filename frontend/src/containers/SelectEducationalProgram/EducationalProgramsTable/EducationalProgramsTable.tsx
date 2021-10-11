import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import {getEducationPlanInDirectionFullName as getEduPlan} from '../../EduationPlanInDirection/getters';
import {EducationProgramFields} from '../../EducationalProgram/enum';
import {rootState} from "../../../store/reducers";

import {getSelectedEducationalPrograms} from "../getters";
import actions from '../actions';

import {EducationalProgramsTableProps} from './types';

import {useStyles} from './EducationalProgramsTable.style';

export const EducationalProgramsTable: React.FC<EducationalProgramsTableProps> = ({educationalPrograms}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedPrograms = useSelector((state: rootState) => getSelectedEducationalPrograms(state));

    const selectProgram = (id: number): void => dispatch(actions.selectProgram(id));
    const unselectProgram = (id: number): void => dispatch(actions.unselectProgram(id));
    const savePrograms = () => dispatch(actions.savePrograms());

    const rows = educationalPrograms.map((p: any) => (
        <TableRow key={p[EducationProgramFields.ID]}>
            <TableCell>
                {p.title}
            </TableCell>
            <TableCell>
                {p.year}
            </TableCell>
            <TableCell>
                {p.metrics.toFixed(2)}
            </TableCell>
            <TableCell>
                <Tooltip title="Вы можете выбрать программы и сохранить индивидуальную траекторию">
                    <Checkbox checked={Boolean(selectedPrograms.find(id => id === p.id))}
                              onChange={((event, checked) =>
                                  checked ? selectProgram(p.id) : unselectProgram(p.id)
                              )}
                    />
                </Tooltip>
            </TableCell>
        </TableRow>
    ))

    return (
        <>
            <div className={classes.subtitle}>
                <Typography> 3. Образовательные программы </Typography>
                {selectedPrograms.length > 0 &&
                    <Button color="primary"
                            variant="contained"
                            onClick={savePrograms}
                    >
                        Сохранить выбранные программы
                    </Button>
                }
            </div>
            <div className={classes.tableWrap}>
                <Table stickyHeader size='small'>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>
                                Учебный план
                            </TableCell>
                            <TableCell>
                                Год начала
                            </TableCell>
                            <TableCell>
                                Метрика
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
