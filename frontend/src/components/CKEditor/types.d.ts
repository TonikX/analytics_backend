export interface CKEditorProps {
    value: string;
    // label: string;
    toolbarContainerId?: string;
    onChange?: Function;
    onFocus?: Function;
    onBlur?: Function;
    noMargin?: boolean;
    useFormulas?: boolean;
    toolbarIcons?: Array;
    readOnly?: boolean;
    height?: string | number;
    width?: string | number;
    style?: any;
}