import React from 'react';
import { CKEditor } from 'ckeditor4-react';

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {CKEditorProps} from './types';
import Tooltip from "@mui/material/Tooltip";

export const CKEditorComponent: React.FC<CKEditorProps> =
  ({ value, onChange, useFormulas, onFocus, readOnly = false, onBlur, toolbarIcons,
     toolbarContainerId = 'toolbar-container', height, width, style }) => {
    const config = {
      // extraPlugins: [useFormulas ? 'mathjax' : '', 'embed',  'autoembed', 'font', 'justify', 'openlink'],
      extraPlugins: [useFormulas ? 'mathjax' : ''],
      embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
      mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
      openlink_enableReadOnly: true,
      allowedContent: true,
      height,
      width,
    }

    return (
      <>
        <CKEditor
          config={config}
          initData={value}
          onChange={(event) => onChange?.(event.editor.getData())}
          onBlur={(event) => onBlur?.(event.editor.getData())}
          onFocus={onFocus}
          readOnly={readOnly}
          onBeforeLoad={(CKEDITOR: any) => {
            CKEDITOR.plugins.addExternal( 'openlink', '/openlink/plugin.js');
            // fix play video from Media Embed
            CKEDITOR.addCss('.cke_widget_wrapper iframe{z-index:9999;}');
          }}
          style={style}
        />
        <div style={{marginTop: '10px'}}>
          <Tooltip title={
            <div style={{fontSize: '14px'}}>
              Если у Вас не загрузился редактор содержания оценочного средства, вероятно, у Вашего провайдера заблокирован доступ к серверам, на которых располагаются данные библиотеки, отвечающей за редактор. Вам необходимо сменить сеть.
            </div>
          }>
            <ErrorOutlineIcon style={{ color: '#ec1946' }} />
          </Tooltip>
        </div>
      </>
    )
  }

export default CKEditorComponent
