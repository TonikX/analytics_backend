import React, {  useState } from 'react';
import { useHistory } from "react-router-dom";
import get from "lodash/get";
import classNames from "classnames";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FileIcon from "@material-ui/icons/DescriptionOutlined";

import { appRouter } from "../../../../service/router-service";
import { WorkProgramGeneralFields } from "../../../WorkProgram/enum";

import {BlocksOfWorkProgramsFields, ModuleFields} from "../../enum";
import { typeOfWorkProgramInPlan } from "../../data";

import { SelectWorkProgramBlockProps } from './types';

import useStyles from './FacultativeBlockModule.styles';

export default ({blocks, handleDownloadFile, saveWorkPrograms}: SelectWorkProgramBlockProps) => {
    const history = useHistory();
    const classes = useStyles();
    const [facultativeWorkPrograms, setFacultativeWorkProgram] = useState({});

    const semesterHours = get(module, BlocksOfWorkProgramsFields.SEMESTER_UNIT);

    const mappedSemesterHours = semesterHours && semesterHours.split ? semesterHours.split(',') : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const semesterHour = mappedSemesterHours.slice(0, 10);

    const goToWorkProgramPage = (id: number) => () => {
        history.push(appRouter.getWorkProgramLink(id));
    }

    const selectOptionalProgram = (workProgramId: number) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setFacultativeWorkProgram({
            ...facultativeWorkPrograms,
            [workProgramId]: checked
        });
    }

    const handleSaveWorkPrograms = (e: React.MouseEvent) => {
        e.preventDefault();
        // @ts-ignore
        saveWorkPrograms(blocks[ModuleFields.ID], Object.keys(facultativeWorkPrograms).filter((key) => facultativeWorkPrograms[key]));
        setFacultativeWorkProgram({});
    }

    const blocksOfWorkPrograms = blocks[ModuleFields.BLOCKS_OF_WORK_PROGRAMS];

    return (
        <>
            {blocksOfWorkPrograms.map((module, index) => {
                const workPrograms = get(module, BlocksOfWorkProgramsFields.WORK_PROGRAMS);
                const blockType = module[BlocksOfWorkProgramsFields.TYPE];
                const moduleId = module[BlocksOfWorkProgramsFields.ID];
                const changed = module[BlocksOfWorkProgramsFields.CHANGED];

                return (
                    <TableRow key={`module-${moduleId}`}>
                        <TableCell>
                            {workPrograms && workPrograms.map && workPrograms.map((workProgram) =>
                                <div className={classes.displayFlex} key={'wp' + workProgram[WorkProgramGeneralFields.ID]}>
                                    <div className={classes.displayFlex}>
                                        <Typography className={classes.workProgramLink}
                                                    onClick={goToWorkProgramPage(workProgram[WorkProgramGeneralFields.ID])}>
                                            {workProgram[WorkProgramGeneralFields.TITLE]}
                                        </Typography>
                                        {changed ? <></>
                                            :
                                            <Tooltip title={'Выбрать дисциплину по выбору'}>
                                                <Checkbox onChange={selectOptionalProgram(moduleId)}
                                                          checked={get(facultativeWorkPrograms, moduleId, false)}
                                                />
                                            </Tooltip>
                                        }
                                    </div>
                                    <Tooltip title={'Скачать рабочую программу'}>
                                        <FileIcon className={classNames(classes.marginRight10, classes.button)}
                                                  onClick={handleDownloadFile(workProgram[WorkProgramGeneralFields.ID])}
                                        />
                                    </Tooltip>
                                    {Object.keys(facultativeWorkPrograms).length && index === blocksOfWorkPrograms.length - 1 ?
                                        <Tooltip title="Сохранить выбранные факультативы">
                                            <Button variant="contained"
                                                    color="primary"
                                                    onClick={handleSaveWorkPrograms}
                                            >
                                                Сохранить
                                            </Button>
                                        </Tooltip>
                                        :
                                        <></>
                                    }
                                </div>
                            )}
                        </TableCell>
                        {semesterHour.map((semesterHour: string, index: number) =>
                            <TableCell key={'hour' + index} align="center" className={classes.hourCell} > {semesterHour} </TableCell>
                        )}
                        <TableCell>
                            {get(typeOfWorkProgramInPlan.find(item =>
                                item.value === blockType
                            ), 'label', '')}
                        </TableCell>
                    </TableRow>
                )
            })}
        </>
    );
}