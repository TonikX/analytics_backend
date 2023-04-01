import React from 'react';

import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import withStyles from '@mui/material/styles/withStyles';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import CancelIcon from '@mui/icons-material/CloseOutlined';
import SuccessIcon from '@mui/icons-material/CheckOutlined';

import {EditedRowProps, EditedRowState} from './types';

import {ImplementationFormatsEnum, workProgramSectionFields} from '../../enum';

import connect from './EditedRow.connect';
import styles from './EditedRow.styles';
import {shallowEqualObjects} from "shallow-equal";

class EditedRow extends React.Component<EditedRowProps, EditedRowState> {
    constructor(props: EditedRowProps) {
        super(props);

        this.state = {
            isEditMode: !props.section.id,
            section: props.section,
        };
    }

    componentDidUpdate(prevProps: Readonly<EditedRowProps>, prevState: Readonly<EditedRowState>, snapshot?: any) {
        const { section } = this.props

        if (!shallowEqualObjects(prevProps.section, this.props.section)){
            this.setState({
                section: section,
            })
        }
    }

    calculateTotalHours = () => {
        const {section} = this.state;
        const contactWork = this.calculateContactWork();
        const spo = parseFloat(section[workProgramSectionFields.SPO]);

        return ((contactWork ? parseFloat(contactWork) : 0) + (spo ? spo : 0)).toFixed(2);
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

        this.props.actions.saveSection({
            ...this.state.section,
            [workProgramSectionFields.TOTAL_HOURS] : this.calculateTotalHours(),
            [workProgramSectionFields.CONTACT_WORK] : this.calculateContactWork()
        });

        if (!this.props.section.id){
            this.props.removeNewSection();
        }
    }

    handleClickCancel = () => {
        this.setState({section: this.props.section});
        this.setEditModeFalse();
    }

    handleChangeField = (field: string) => (e: React.ChangeEvent) => {
        const {section} = this.state;
        //@ts-ignore
        const value = e?.target?.value
        const isLecture = workProgramSectionFields.LECTURE_CLASSES === field

        this.setState({
            section: {
                ...section,
                [field]: isLecture ? value.split('.')?.[0] : value
            }
        })
    }

    calculateContactWork = () => {
        const {section} = this.state;
        const canEditConsultation = this.canEditConsultation()
        const isMixed = this.isMixed()

        if (isMixed) {
            return ((
              (parseFloat(section[workProgramSectionFields.LECTURE_CLASSES]) || 0) +
              (parseFloat(section[workProgramSectionFields.PRACTICAL_LESSONS]) || 0) +
              (parseFloat(section[workProgramSectionFields.LABORATORY]) || 0) +
              (parseFloat(section[workProgramSectionFields.CONSULTATIONS]) || 0)
            ) * 1.1).toFixed(2);
        }

        if (canEditConsultation) {
            return ((
              (parseFloat(section[workProgramSectionFields.CONSULTATIONS]) || 0)
            ) * 1.1).toFixed(2);
        } else {
            return ((
              (parseFloat(section[workProgramSectionFields.LECTURE_CLASSES]) || 0) +
              (parseFloat(section[workProgramSectionFields.PRACTICAL_LESSONS]) || 0) +
              (parseFloat(section[workProgramSectionFields.LABORATORY]) || 0)
            ) * 1.1).toFixed(2);
        }
    }

    canEditConsultation = () => this.props.implementationFormat !== ImplementationFormatsEnum.OFFLINE
    canEditOfflineHours = () => this.props.implementationFormat !== ImplementationFormatsEnum.ONLINE
    isMixed = () => this.props.implementationFormat === ImplementationFormatsEnum.MIXED

    render() {
        const {classes, isCanEdit} = this.props;
        const {isEditMode, section} = this.state;
        const canEditConsultation = this.canEditConsultation()
        const canEditOfflineHours = this.canEditOfflineHours()

        const contactWork = this.calculateContactWork();

        return (
            <>
                <TableCell className={classes.centerCell}>
                    <>{section.ordinal_number}</>
                </TableCell>
                <TableCell className={classes.cell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramSectionFields.NAME]}
                                   className={classes.largeInput}
                                   onChange={this.handleChangeField(workProgramSectionFields.NAME)}
                        />
                        :
                        <>{section.name}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>
                    <>{contactWork}</>
                </TableCell>
                <TableCell className={classes.centerCell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   value={section[workProgramSectionFields.LECTURE_CLASSES]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramSectionFields.LECTURE_CLASSES)}
                                   disabled={!canEditOfflineHours}
                        />
                        :
                        <>{section.lecture_classes}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramSectionFields.LABORATORY]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramSectionFields.LABORATORY)}
                                   disabled={!canEditOfflineHours}
                        />
                        :
                        <>{section.laboratory}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramSectionFields.PRACTICAL_LESSONS]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramSectionFields.PRACTICAL_LESSONS)}
                                   disabled={!canEditOfflineHours}
                        />
                        :
                        <>{section.practical_lessons}</>
                    }
                 </TableCell>
                <TableCell className={classes.centerCell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramSectionFields.SPO]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramSectionFields.SPO)}
                        />
                        :
                        <>{section.SRO}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>
                    {isEditMode ?
                        <TextField variant="outlined"
                                   size="small"
                                   defaultValue={section[workProgramSectionFields.CONSULTATIONS]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramSectionFields.CONSULTATIONS)}
                                   disabled={!canEditConsultation}
                        />
                        :
                        <>{section.consultations}</>
                    }
                </TableCell>
                <TableCell className={classes.centerCell}>
                    <>{section.total_hours}</>
                </TableCell>
                {isCanEdit &&
                    <TableCell className={classes.centerCell}>
                        {!isEditMode ?
                            <div className={classes.actions}>
                                <IconButton onClick={this.handleClickDelete}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton onClick={this.setEditModeTrue}>
                                    <EditIcon/>
                                </IconButton>
                            </div>
                            :
                            <div className={classes.actions}>
                                {section.id ?
                                    <IconButton onClick={this.handleClickCancel}>
                                        <CancelIcon/>
                                    </IconButton>
                                    :
                                    <IconButton onClick={this.handleClickDelete}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                                <IconButton onClick={this.handleClickSave}
                                            disabled={!section[workProgramSectionFields.NAME].length}
                                >
                                    <SuccessIcon className={classes.saveIcon}/>
                                </IconButton>
                            </div>
                        }
                    </TableCell>
                }
            </>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(EditedRow));
