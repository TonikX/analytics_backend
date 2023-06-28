import {WithStyles} from '@mui/styles';
import styles from "./DatePicker.styles";

export interface DatePickerProps extends WithStyles<typeof styles> {
    onChange: Function;
    label: string;
    noMargin?: boolean;
    format?: string;
    views?: Array<any>;
    value?: string;
    minDate?: string;
    maxDate?: string;
}
