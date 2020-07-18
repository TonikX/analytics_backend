import {WithStyles} from "@material-ui/core";
import styles from "./TableFilter.styles";

export interface TableFilterProps extends WithStyles<typeof styles> {
    handleSelect: Function;
    items: {[key: string]: string};
    isMulti?: boolean;
}