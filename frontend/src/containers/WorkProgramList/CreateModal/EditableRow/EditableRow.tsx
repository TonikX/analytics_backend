import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField/TextField";
import {workProgramSectionFields} from "./enum";
import React from "react";

import {useStyles} from './EditableRow.styles';
import {EditableRowProps} from "../types";

function EditableRow(props: EditableRowProps) {
    const classes = useStyles();
    const {section, updateRow, semesterNum} = props;
    const handleChangeField = (field: string) => (e: React.ChangeEvent) => {
        updateRow({
            ...section,
            //@ts-ignore
            [field]: e?.target?.value,
        }, semesterNum);
    };
    return (
        <TableRow>
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
                    defaultValue={section[workProgramSectionFields.SPO]}
                    className={classes.smallInput}
                    type="number"
                    onChange={handleChangeField(workProgramSectionFields.SPO)}
                />
            </TableCell>
        </TableRow>
    );
}

export default EditableRow;
