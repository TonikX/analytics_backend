import React, {useEffect, useRef} from 'react';
import {CKEditorProps} from './types';

export const CKEditorComponent: React.FC<CKEditorProps> =
  ({ value, onChange, useFormulas, onFocus, readOnly = false, onBlur, toolbarIcons}) => {
    const editorRef = useRef<any>();
    useEffect(() => {
      let editorInstance: any

      const initEditor = async () => {
        // @ts-ignore
        const editor = window.ClassicEditor
        if (!editor) return;

        editorInstance = await editor
          .create(editorRef.current, {
            initialData: value,
          })

        if (!readOnly) {
          editorInstance.model.document.on('change:data', () => {
            //@ts-ignore
            const data = editorInstance.getData();
            onChange(data);
          });
        }
      }

      initEditor();

      return () => {
        // @ts-ignore
        if (editorInstance) {
          editorInstance.destroy();
        }
      };
    }, []);

  return (
    <div style={{position: "relative"}}>
      {readOnly ? <div style={{width: '100%', height: '100%', position: 'absolute', top: 0,}} /> : null}
      <div ref={editorRef} />
    </div>
  )
  }

export default CKEditorComponent
