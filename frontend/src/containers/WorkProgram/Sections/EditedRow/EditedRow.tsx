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

import {ImplementationFormatsEnum, workProgramSectionFields} from '../../enum';

import connect from './EditedRow.connect';
import styles from './EditedRow.styles';
import {shallowEqual} from "recompose";

class EditedRow extends React.Component<EditedRowProps, EditedRowState> {
    constructor(props: EditedRowProps) {
        super(props);

        this.state = {
            isEditMode: !props.section.id,
            section: props.section,
        };
    }

    componentDidUpdate(prevProps: Readonly<EditedRowProps>, prevState: Readonly<EditedRowState>, snapshot?: any) {
        const { implementationFormat, section } = this.props

        if (!shallowEqual(prevProps.section, this.props.section)){
            this.setState({
                section: section,
            })
        }
    }

    calculateTotalHours = () => {
        const {section} = this.state;
        const canEditConsultation = this.props.implementationFormat === ImplementationFormatsEnum.ONLINE
        const contactWork = this.calculateContactWork();
        const spo = canEditConsultation ? 0 : parseFloat(section[workProgramSectionFields.SPO]);

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

        this.setState({
            section: {
                ...section,
                [field]: get(e, 'target.value')
            }
        })
    }

    calculateContactWork = () => {
        const {section} = this.state;
        const canEditConsultation = this.props.implementationFormat === ImplementationFormatsEnum.ONLINE

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

    render() {
        const {classes, isCanEdit, implementationFormat} = this.props;
        const {isEditMode, section} = this.state;
        const canEditConsultation = implementationFormat === ImplementationFormatsEnum.ONLINE

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
                                   defaultValue={section[workProgramSectionFields.LECTURE_CLASSES]}
                                   className={classes.smallInput}
                                   type="number"
                                   onChange={this.handleChangeField(workProgramSectionFields.LECTURE_CLASSES)}
                                   disabled={canEditConsultation}
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
                                   disabled={canEditConsultation}
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
                                   disabled={canEditConsultation}
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
                                   disabled={canEditConsultation}
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
                    <>{canEditConsultation ? (parseFloat(section[workProgramSectionFields.CONSULTATIONS]) + parseFloat(contactWork)) || 0 : section.total_hours}</>
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
