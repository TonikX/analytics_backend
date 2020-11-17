import React from 'react';
import classNames from "classnames";

import {CKEditorProps} from './types';

import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from "@material-ui/core/InputLabel";
//@ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react';
//@ts-ignore
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import styles from './CKEditor.styles';

class CKEditorComponent extends React.PureComponent<CKEditorProps> {
    editor = null;

    render() {
        const {classes, value, label, onChange, toolbarContainerId, noMargin} = this.props;

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>, editor: any) => {
            onChange(editor.getData());
        }

        return (
            <div className={classNames({[classes.marginBottom30]: !noMargin})}>
                <InputLabel className={classes.label}> {label} </InputLabel>

                <div id={toolbarContainerId} />

                <CKEditor
                    //@ts-ignore
                    editor={ DecoupledEditor }
                    data={value}
                    onInit={(editor: any) => {
                        // Add the toolbar to the container
                        const toolbarContainer = document.querySelector( `#${toolbarContainerId}` );
                        //@ts-ignore
                        toolbarContainer.appendChild( editor.ui.view.toolbar.element );
                        //@ts-ignore
                        window.editor = editor;
                    }}
                    onBlur={handleChange}
                    id={'editor'}
                />
            </div>
        );
    }
}

export default withStyles(styles)(CKEditorComponent);
