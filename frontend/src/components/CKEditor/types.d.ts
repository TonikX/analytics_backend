import {WithStyles} from "@material-ui/core";
import styles from "./CKEditor.styles";

export interface CKEditorProps extends WithStyles<typeof styles> {
    value: string;
    label: string;
    toolbarContainerId: string;
    onChange: Function;
    noMargin?: boolean;
}