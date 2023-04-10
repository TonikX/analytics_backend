export interface CKEditorProps {
    value: string;
    // label: string;
    toolbarContainerId?: string;
    onChange?: any;
    onFocus?: any;
    onBlur?: any;
    noMargin?: boolean;
    useFormulas?: boolean;
    toolbarIcons?: Array;
    readOnly?: boolean;
    height?: string | number;
    width?: string | number;
    style?: any;
}