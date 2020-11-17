import {WithStyles} from "@material-ui/core";
import styles from "./TextField.styles";

export interface TextFieldProps extends WithStyles<typeof styles> {
    onChange: Function;
    label: string;
    noMargin?: boolean;
}