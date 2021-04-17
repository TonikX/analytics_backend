import React, {  useState } from 'react';
import { useHistory } from "react-router-dom";
import get from "lodash/get";

import { BlocksOfWorkProgramsType } from "../../types";
import {BlocksOfWorkProgramsFields, ModuleFields} from "../../enum";
import {typeOfWorkProgramInPlan} from "../../data";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {WorkProgramGeneralFields} from "../../../WorkProgram/enum";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Radio from "@material-ui/core/Radio";
import FileIcon from "@material-ui/icons/DescriptionOutlined";
import classNames from "classnames";
import {appRouter} from "../../../../service/router-service";

import useStyles from './OptionalWorkProgramBlock.styles';

export default ({module, handleDownloadFile}: {module: BlocksOfWorkProgramsType, handleDownloadFile: Function}) => {
    const history = useHistory();
    const classes = useStyles();
    const [optionalModules, setOptionalModules] = useState({});

    const semesterHours = get(module, BlocksOfWorkProgramsFields.SEMESTER_UNIT);
    const workPrograms = get(module, BlocksOfWorkProgramsFields.WORK_PROGRAMS);
    const blockType = module[BlocksOfWorkProgramsFields.TYPE];
    const moduleId = module[ModuleFields.ID];

    const mappedSemesterHours = semesterHours && semesterHours.split ? semesterHours.split(',') : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const semesterHour = mappedSemesterHours.slice(0, 10);

    const goToWorkProgramPage = (id: number) => () => {
        history.push(appRouter.getWorkProgramLink(id));
    }

    const selectOptionalProgram = (workProgramId: number, moduleId: number) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setOptionalModules({
            [moduleId]: {
                [workProgramId]: checked
            }
        });
    }

    return (
        <TableRow>
            <TableCell>
                {workPrograms && workPrograms.map && workPrograms.map(workProgram =>
                    <div className={classes.displayFlex} key={'wp' + workProgram[WorkProgramGeneralFields.ID]}>
                        <div className={classes.displayFlex}>
                            <Typography className={classes.workProgramLink}
                                        onClick={goToWorkProgramPage(workProgram[WorkProgramGeneralFields.ID])}>
                                {workProgram[WorkProgramGeneralFields.TITLE]}
                            </Typography>
                            <Tooltip title={'Выбрать дисциплину по выбору'}>
                              <Radio onChange={selectOptionalProgram(workProgram[WorkProgramGeneralFields.ID], moduleId)}
                                     checked={get(optionalModules, [moduleId, workProgram[WorkProgramGeneralFields.ID]], false)}
                              />
                            </Tooltip>
                        </div>
                        <Tooltip title={'Скачать рабочую программу'}>
                            <FileIcon className={classNames(classes.marginRight10, classes.button)}
                                      onClick={handleDownloadFile(workProgram[WorkProgramGeneralFields.ID])}
                            />
                        </Tooltip>
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