import React, {  useState } from 'react';
import { useHistory } from "react-router-dom";
import get from "lodash/get";
import classNames from "classnames";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FileIcon from "@material-ui/icons/DescriptionOutlined";

import { appRouter } from "../../../../service/router-service";
import { WorkProgramGeneralFields } from "../../../WorkProgram/enum";

import { BlocksOfWorkProgramsFields } from "../../enum";
import { typeOfWorkProgramInPlan } from "../../data";

import { SelectWorkProgramBlockProps } from './types';

import useStyles from './OptionalWorkProgramsBlock.styles';

export default ({module, handleDownloadFile, isMultiSelect, saveWorkPrograms}: SelectWorkProgramBlockProps) => {
    const history = useHistory();
    const classes = useStyles();
    const [optionalModules, setOptionalModules] = useState({});

    const semesterHours = get(module, BlocksOfWorkProgramsFields.SEMESTER_UNIT);
    const workPrograms = get(module, BlocksOfWorkProgramsFields.WORK_PROGRAMS);
    const blockType = module[BlocksOfWorkProgramsFields.TYPE];
    const moduleId = module[BlocksOfWorkProgramsFields.ID];

    const mappedSemesterHours = semesterHours && semesterHours.split ? semesterHours.split(',') : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const semesterHour = mappedSemesterHours.slice(0, 10);

    const goToWorkProgramPage = (id: number) => () => {
        history.push(appRouter.getWorkProgramLink(id));
    }

    const selectOptionalProgram = (workProgramId: number) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setOptionalModules({
            ...isMultiSelect ? optionalModules : {},
            [workProgramId]: checked
        });
    }

    const handleSaveWorkPrograms = (workProgramId: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        saveWorkPrograms(moduleId, workProgramId)
    }

    const SelectComponent = isMultiSelect ? Checkbox : Radio;

    return (
        <TableRow>
            <TableCell>
                {workPrograms && workPrograms.map && workPrograms.map((workProgram, index) =>
                    <div className={classes.displayFlex} key={'wp' + workProgram[WorkProgramGeneralFields.ID]}>
                        <div className={classes.displayFlex}>
                            <Typography className={classes.workProgramLink}
                                        onClick={goToWorkProgramPage(workProgram[WorkProgramGeneralFields.ID])}>
                                {workProgram[WorkProgramGeneralFields.TITLE]}
                            </Typography>
                            <Tooltip title={'Выбрать дисциплину по выбору'}>
                              <SelectComponent onChange={selectOptionalProgram(workProgram[WorkProgramGeneralFields.ID])}
                                     checked={get(optionalModules, workProgram[WorkProgramGeneralFields.ID], false)}
                              />
                            </Tooltip>
                        </div>
                        <Tooltip title={'Скачать рабочую программу'}>
                            <FileIcon className={classNames(classes.marginRight10, classes.button)}
                                      onClick={handleDownloadFile(workProgram[WorkProgramGeneralFields.ID])}
                            />
                        </Tooltip>
                        {Object.keys(optionalModules).length && !isMultiSelect && get(optionalModules, workProgram[WorkProgramGeneralFields.ID], false) ?
                            <Tooltip title="Включить в учебный план эту программу">
                                <Button variant="contained"
                                        color="primary"
                                        onClick={handleSaveWorkPrograms(workProgram[WorkProgramGeneralFields.ID])}
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
    );
}