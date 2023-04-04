import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField/TextField";
import {EVALUATION_TOOLS, workProgramSectionFields} from "./enum";
import React from "react";

import {useStyles} from './EditableRow.styles';
import {EditableRowProps} from "../types";
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {ImplementationFormatsEnum} from "../../../WorkProgram/enum";

function EditableRow(props: EditableRowProps) {
    const classes = useStyles();
    const {section, updateRow, semesterNum, implementationFormat} = props;
    const handleChangeField = (field: string) => (e: React.ChangeEvent) => {
        updateRow({
            ...section,
            //@ts-ignore
            [field]: e?.target?.value,
        }, semesterNum);
    };

    const handleEvaluationToolsChange = (e: any) => {
        updateRow({
            ...section,
            //@ts-ignore
            [workProgramSectionFields.EVALUATION_TOOLS]: e?.target?.value,
        }, semesterNum);
    };

    return (
        <TableRow>
            <TableCell className={classes.centerCell}>
                <TextField
                    variant="outlined"
                    size="small"
                    defaultValue={section[workProgramSectionFields.ZE_V_SEM]}
                    className={classes.smallInput}
                    type="number"
                    onChange={handleChangeField(workProgramSectionFields.ZE_V_SEM)}
                />
            </TableCell>
            <TableCell className={classes.centerCell}>
                <TextField
                    variant="outlined"
                    size="small"
                    value={section[workProgramSectionFields.LECTURE_CLASSES]}
                    className={classes.smallInput}
                    type="number"
                    onChange={handleChangeField(workProgramSectionFields.LECTURE_CLASSES)}
                />
            </TableCell>
            <TableCell className={classes.centerCell}>
                <TextField
                    variant="outlined"
                    size="small"
                    defaultValue={section[workProgramSectionFields.LABORATORY]}
                    className={classes.smallInput}
                    type="number"
                    onChange={handleChangeField(workProgramSectionFields.LABORATORY)}
                />
            </TableCell>
            <TableCell className={classes.centerCell}>
                <TextField
                    variant="outlined"
                    size="small"
                    defaultValue={0}
                    className={classes.smallInput}
                    type="number"
                    onChange={handleChangeField(workProgramSectionFields.PRACTICAL_LESSONS)}
                />
            </TableCell>
            <TableCell className={classes.centerCell}>
                <TextField
                    variant="outlined"
                    size="small"
                    defaultValue={section[workProgramSectionFields.CONSULTATIONS]}
                    className={classes.smallInput}
                    type="number"
                    disabled={implementationFormat === ImplementationFormatsEnum.OFFLINE}
                    onChange={handleChangeField(workProgramSectionFields.CONSULTATIONS)}
                />
            </TableCell>
            <TableCell className={classes.centerCell}>
                <Select
                  value={section[workProgramSectionFields.EVALUATION_TOOLS]}
                  placeholder="Оценочное средство"
                  onChange={handleEvaluationToolsChange}
                  fullWidth
                  multiple
                >
                    {EVALUATION_TOOLS.map(item =>
                        <MenuItem value={item.value} key={`group-${item.value}`}>
                            {item.label}
                        </MenuItem>
                    )}
                </Select>
            </TableCell>
        </TableRow>
    );
}

export default EditableRow;
