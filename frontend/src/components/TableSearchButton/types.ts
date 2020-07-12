import {WithStyles} from "@material-ui/core";
import styles from "./TableSearchButton.styles";

export interface TableSearchButtonProps extends WithStyles<typeof styles> {
    handleSearch: Function;
}