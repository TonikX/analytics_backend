import React, {  useState } from 'react';
import { useHistory } from "react-router-dom";
import get from "lodash/get";
import classNames from "classnames";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FileIcon from "@mui/icons-material/DescriptionOutlined";

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
    const notChangedWPCount = blocksOfWorkPrograms.filter(module => !module[BlocksOfWorkProgramsFields.CHANGED]).length;

    return (
        <>
            {blocksOfWorkPrograms.map((module, index) => {
                const workPrograms = get(module, BlocksOfWorkProgramsFields.WORK_PROGRAMS);
                const blockType = module[BlocksOfWorkProgramsFields.TYPE];
                const moduleId = module[BlocksOfWorkProgramsFields.ID];
                const changed = module[BlocksOfWorkProgramsFields.CHANGED];
                const disabledButton = !Object.keys(facultativeWorkPrograms).length;

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
                                        <Tooltip title={changed ? 'Вы уже выбрали эту дисциплину' : 'Выбрать дисциплину по выбору'}>
                                            <Checkbox onChange={selectOptionalProgram(moduleId)}
                                                      checked={get(facultativeWorkPrograms, moduleId, false) || changed}
                                                      disabled={changed}
                                            />
                                        </Tooltip>
                                    </div>
                                    <Tooltip title={'Скачать рабочую программу'}>
                                        <FileIcon className={classNames(classes.marginRight10, classes.button)}
                                                  onClick={handleDownloadFile(workProgram[WorkProgramGeneralFields.ID])}
                                        />
                                    </Tooltip>

                                    {index === 0 && notChangedWPCount !== 0 ?
                                        <Tooltip title={disabledButton ? "Выберите дисциплины, которые вы хотите факультативно изучать" : "Сохранить выбранные факультативы"}>
                                            <Button variant="contained"
                                                    color={disabledButton ? "default" : "primary"}
                                                    onClick={(e) => !disabledButton && handleSaveWorkPrograms(e)}
                                                    className={disabledButton ? classes.disabled : ''}
                                            >
                                                Сохранить
                                            </Button>
                                        </Tooltip>
                                        : <></>
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