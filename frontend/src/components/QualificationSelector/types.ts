import {WithStyles} from "@material-ui/core";
import styles from "./QualificationSelector.styles";

export interface QualificationSelectorProps extends WithStyles<typeof styles> {
    value: string;
    onChange: Function;
    noMargin?: boolean;
}