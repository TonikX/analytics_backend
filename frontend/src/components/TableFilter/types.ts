import {withStyles} from '@mui/styles';
import styles from "./TableFilter.styles";

export interface TableFilterProps extends WithStyles<typeof styles> {
    handleSelect: Function;
    items: {[key: string]: string};
    isMulti?: boolean;
}