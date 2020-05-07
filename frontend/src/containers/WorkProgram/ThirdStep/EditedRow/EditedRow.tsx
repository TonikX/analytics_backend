import React from 'react';
import get from "lodash/get";

import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import CancelIcon from '@material-ui/icons/CloseOutlined';
import SuccessIcon from '@material-ui/icons/CheckOutlined';

import {EditedRowProps, EditedRowState} from './types';

import {workProgramFields} from '../../enum';

import connect from './EditedRow.connect';
import styles from './EditedRow.styles';

class EditedRow extends React.Component<EditedRowProps, EditedRowState> {
    constructor(props: EditedRowProps) {
        super(props);

        this.state = {
            isEditMode: !props.section.id,
            section: props.section
        };
    }


    setEditModeTrue = () => {
        this.setState({isEditMode: true});
    }

    setEditModeFalse = () => {
        this.setState({isEditMode: false});
    }

    handleClickDelete = () => {
        if (this.props.section.id){
            this.props.actions.deleteSection(this.props.section.id);
        } else {
            this.props.removeNewSection();
        }
    }

    handleClickSave = () => {
        this.setEditModeFalse();

        this.props.actions.saveSection(this.state.section);
    }

    handleClickCancel = () => {
        this.setState({section: this.props.section});
        this.setEditModeFalse();
    }

    handleChangeField = (field: string) => (e: React.ChangeEvent) => {
        const {section} = this.state;

        this.setState({
            section: {
                ...section,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {classes} = this.props;
        const {isEditMode, section} = this.state;

        return (
            <>
                <TableCell className={classes.centerCell}>
                    <>{section.ordinal_number}</>
                </TableCell>
                <TableCell className={classes.cell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramFields.NAME]}
                                   className={classes.largeInput}
                                   onChange={this.handleChangeField(workProgramFields.NAME)}
                        />
                        :
                        <>{section.name}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramFields.CONTACT_WORK]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramFields.CONTACT_WORK)}
                        />
                        :
                        <>{section.contact_work}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramFields.LECTURE_CLASSES]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramFields.LECTURE_CLASSES)}
                        />
                        :
                        <>{section.lecture_classes}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramFields.LABORATORY]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramFields.LABORATORY)}
                        />
                        :
                        <>{section.laboratory}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>

                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramFields.PRACTICAL_LESSONS]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramFields.PRACTICAL_LESSONS)}
                        />
                        :
                        <>{section.practical_lessons}</>
                    }
                 </TableCell>
                <TableCell className={classes.centerCell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramFields.SPO]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramFields.SPO)}
                        />
                        :
                        <>{section.SRO}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramFields.TOTAL_HOURS]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramFields.TOTAL_HOURS)}
                        />
                        :
                        <>{section.total_hours}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>
                {!isEditMode ?
                    <>
                        <IconButton onClick={this.setEditModeTrue}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={this.handleClickDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                        :
                        <>
                            {section.id ?
                                <IconButton onClick={this.handleClickCancel}>
                                    <CancelIcon/>
                                </IconButton>
                                :
                                <IconButton onClick={this.handleClickDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                            <IconButton onClick={this.handleClickSave}>
                                <SuccessIcon className={classes.saveIcon} />
                            </IconButton>
                        </>
                    }

                </TableCell>
            </>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(EditedRow));
