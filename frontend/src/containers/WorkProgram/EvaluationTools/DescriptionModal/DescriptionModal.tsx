import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import {DescriptionModalProps} from './types';
import {EvaluationToolFields} from "../../enum"

import CKEditor from '../../../../components/CKEditor';

import {
    fields,
} from '../../enum';
import {withRouter} from "react-router-dom";
import {appRouter} from "../../../../service/router-service";

import connect from './DescriptionModal.connect';
import styles from './DescriptionModal.styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

class DescriptionModal extends React.PureComponent<DescriptionModalProps> {

    handleClose = () => {
        this.props.history.push(appRouter.getWorkProgramEvaluationToolsLink(this.props.workProgramId))
        this.props.actions.closeDialog(fields.SHOW_EVALUATION_TOOLS_DESCRIPTION);
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
                    <CKEditor
                        value={evaluationTool[EvaluationToolFields.DESCRIPTION]}
                        readOnly
                        height="calc(100vh - 280px)"
                        useFormulas
                    />
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
