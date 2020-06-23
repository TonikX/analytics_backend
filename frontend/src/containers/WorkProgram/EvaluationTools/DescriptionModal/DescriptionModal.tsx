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

//@ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react';
//@ts-ignore
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import {
    fields,
} from '../../enum';

import connect from './DescriptionModal.connect';
import styles from './DescriptionModal.styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

class DescriptionModal extends React.PureComponent<DescriptionModalProps> {

    handleClose = () => {
        this.props.actions.closeDialog(fields.SHOW_EVALUATION_TOOLS_DESCRIPTION);
    }

    render() {
        const {isOpen, classes, description} = this.props;

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
                    <div id="toolbar-container"></div>
                    <CKEditor
                        //@ts-ignore
                        editor={ DecoupledEditor  }
                        //@ts-ignore
                        data={description}
                        //@ts-ignore
                        onInit={ editor => {
                            // Add the toolbar to the container
                            const toolbarContainer = document.querySelector('#toolbar-container');
                            //@ts-ignore
                            toolbarContainer.appendChild( editor.ui.view.toolbar.element );

                            //@ts-ignore
                            window.editor = editor;
                            editor.isReadOnly = true;
                        }}
                        readOnly
                        id={'editor'}
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

export default connect(withStyles(styles)(DescriptionModal));
