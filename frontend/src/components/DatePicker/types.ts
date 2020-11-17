import {DatePickerView} from "@material-ui/pickers";
import {WithStyles} from "@material-ui/core";
import styles from "./DatePicker.styles";

export interface DatePickerProps extends WithStyles<typeof styles> {
    onChange: Function;
    label: string;
    noMargin?: boolean;
    format?: string;
    views?: Array<DatePickerView>;
    value: string;
}