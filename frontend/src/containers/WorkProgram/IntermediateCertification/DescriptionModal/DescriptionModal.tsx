import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from "@mui/material/InputLabel";
import Button from '@mui/material/Button';
import {withStyles} from '@mui/styles';
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import {DescriptionModalProps} from './types';

import CKEditor from "../../../../components/CKEditor";

import {
    fields, IntermediateCertificationFields,
} from '../../enum';

import connect from './DescriptionModal.connect';
import styles from './DescriptionModal.styles';
import {appRouter} from "../../../../service/router-service";
import {withRouter} from "../../../../hoc/WithRouter";

const Transition = React.forwardRef(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

class DescriptionModal extends React.PureComponent<DescriptionModalProps> {
    handleClose = () => {
        //@ts-ignore
        this.props.navigate(appRouter.getWorkProgramIntermediateCertificationLink(this.props.workProgramId))
        this.props.actions.closeDialog(fields.SHOW_INTERMEDIATE_CERTIFICATION_DESCRIPTION);
    }

    render() {
        const {isOpen, classes, evaluationTool} = this.props;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    root: classes.root,
                    paper: classes.dialog
                }}
                fullScreen
                //@ts-ignore
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Описание оценочного средства
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent className={classes.dialogContent}>
                    <InputLabel className={classes.label}>Описание</InputLabel>
                    {evaluationTool[IntermediateCertificationFields.DESCRIPTION] ? (
                      <CKEditor
                        value={evaluationTool[IntermediateCertificationFields.DESCRIPTION]}
                        readOnly
                        height="calc(100vh - 280px)"
                        useFormulas
                      />
                    ) : null}
                </DialogContent>

                <DialogActions className={classes.actions}>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
//@ts-ignore
export default connect(withStyles(styles)(withRouter(DescriptionModal)));
