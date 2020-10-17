import {WithStyles} from "@material-ui/core";
import styles from "./Search.styles";

export interface SearchProps extends WithStyles<typeof styles> {
    handleChangeSearchQuery: Function;
}