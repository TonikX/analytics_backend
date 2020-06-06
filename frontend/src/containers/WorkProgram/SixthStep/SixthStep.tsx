import React from 'react';
import Scrollbars from "react-custom-scrollbars";

import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";

import {SixthStepProps} from './types';
import {fields, PrerequisiteFields} from "../enum";

import CreateModal from "./CreateModal";
import {PrerequisiteType} from "../types";

import connect from './SixthStep.connect';
import styles from './SixthStep.styles';

class SixthStep extends React.PureComponent<SixthStepProps> {
    handleCreateNew = () => {
        this.props.actions.openDialog({dialogType: fields.ADD_NEW_PREREQUISITES, data: {}});
    };

    handleClickDelete = (id: number) => () => {
        this.props.actions.deletePrerequisite(id);
    };

    handleClickEdit = (prerequisite: PrerequisiteType) => () => {
        this.props.actions.openDialog({dialogType: fields.ADD_NEW_PREREQUISITES, data: prerequisite});
    };

    render() {
        const {classes, prerequisitesList} = this.props;

        return (
            <div className={classes.root}>
                <Scrollbars>
                    <div className={classes.list}>
                        {prerequisitesList.map((prerequisite) => (
                            <div className={classes.item}>
                                <Typography className={classes.title}>
                                    {prerequisite[PrerequisiteFields.MASTER_LEVEL]}
                                </Typography>

                                <div className={classes.actions}>
                                    <IconButton onClick={this.handleClickDelete(prerequisite[PrerequisiteFields.ID])}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={this.handleClickEdit(prerequisite)}>
                                        <EditIcon />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </Scrollbars>

                <Fab color="secondary"
                     className={classes.addIcon}
                     onClick={this.handleCreateNew}
                >
                    <AddIcon/>
                </Fab>

                <CreateModal />
            </div>
        );
    }
}

export default connect(withStyles(styles)(SixthStep));
