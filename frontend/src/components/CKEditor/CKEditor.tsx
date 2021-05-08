import React from 'react';
import get from 'lodash/get'
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
//@ts-ignore
import Editor from 'ckeditor5-custom-build'

import {CKEditorProps} from './types';

export const CKEditorComponent: React.FC<CKEditorProps> = 
    ({ value, onChange, useFormulas, onFocus, readOnly = false, onBlur, toolbarIcons, toolbarContainerId = 'toolbar-container' }) => {
    const config = {
        toolbar: get(toolbarIcons, 'length', 0)
                    ? toolbarIcons 
                    : ['heading','|', 'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', 
                        '|', 'bold', 'italic', 'underline', 'strikethrough', '|', 'alignment', '|', 
                        'numberedList', 'bulletedList', '|', 'indent', 'outdent', '|', 
                        useFormulas ? 'MathType' : '', useFormulas ? 'ChemType' : '', 'link', 
                        'blockQuote',  'imageInsert', 'insertTable', 'mediaEmbed', '|', 'undo', 'redo'
                    ]
    }
    return (
        <>
            <div id={toolbarContainerId} />
            <CKEditor
                config={config}
                editor={ Editor }
                data={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onReady={(editor: any) => {
                    const toolbarContainer = document.querySelector(`#${toolbarContainerId}`);
                    toolbarContainer?.appendChild( editor.ui.view.toolbar.element );
                    if (useFormulas) {
                        toolbarContainer?.getElementsByClassName('ck-button')[54].setAttribute('disabled', 'true')
                    } else {
                        toolbarContainer?.getElementsByClassName('ck-button')[52].setAttribute('disabled', 'true')
                    }
                    //@ts-ignore
                    window.editor = editor;
                    editor.isReadOnly = readOnly;
                    
                }}
                readOnly={readOnly}
            />
        </>
    )
}

export default CKEditorComponent