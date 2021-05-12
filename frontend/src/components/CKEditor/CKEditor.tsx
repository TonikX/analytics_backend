import React from 'react';
import get from 'lodash/get'
//@ts-ignore
import CKEditor from 'ckeditor4-react'

import {CKEditorProps} from './types';

export const CKEditorComponent: React.FC<CKEditorProps> = 
    ({ value, onChange, useFormulas, onFocus, readOnly = false, onBlur, toolbarIcons, 
        toolbarContainerId = 'toolbar-container', height, width }) => {
    const config = {
        extraPlugins: [useFormulas ? 'mathjax' : '', 'embed',  'autoembed', 'font', 'justify'],
        embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
        mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
        height,
        width,
    }
    return (
            <CKEditor
                config={config}
                data={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                readOnly={readOnly}
            />
    )
}

export default CKEditorComponent