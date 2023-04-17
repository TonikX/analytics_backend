import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {CKEditorProps} from './types';
import Tooltip from "@mui/material/Tooltip";
//@ts-ignore
import ClassicEditor from 'ckeditor5-build-classic-mathtype'

// TODO: react 17 раскомментировать
export const CKEditorComponent: React.FC<CKEditorProps> =
    ({ value, onChange, useFormulas, onFocus, readOnly = false, onBlur, toolbarIcons,
        toolbarContainerId = 'toolbar-container', height, width, style }) => {
    // const config = {
    //     extraPlugins: [useFormulas ? 'mathjax' : '', 'embed',  'autoembed', 'font', 'justify', 'openlink'],
    //     embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
    //     mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
    //     openlink_enableReadOnly: true,
    //     allowedContent: true,
    //     height,
    //     width,
    // }

      const config={
        toolbar: {
          items: [
            'heading', 'MathType', 'ChemType',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'imageUpload',
            'mediaEmbed',
            'insertTable',
            'blockQuote',
            'undo',
            'redo'
          ]
        },
      }

      // return <>Текстовый редактор временно недоступен</>

    return (
      <div style={{position: 'relative'}}>
        {readOnly ? <div style={{width: '100%', height: 'calc(100% - 30px)', position: 'absolute', zIndex: 1}} /> : null}
        <CKEditor
            config={config}
            editor={ClassicEditor}
            data={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            // disabled={Boolean(readOnly)}
            onReady={(editor: any) => {
                // CKEDITOR.plugins.addExternal( 'openlink', '/openlink/plugin.js');
                // fix play video from Media Embed
                // CKEDITOR.addCss('.cke_widget_wrapper iframe{z-index:9999;}');
                // editor.editing.view.change((writer: any) => {
                //   writer.setStyle(
                //     "height",
                //     "400px",
                //     editor.editing.view.document.getRoot()
                //   );
                // });
            }}
            // style={style}
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
      </div>
    )
}

export default CKEditorComponent