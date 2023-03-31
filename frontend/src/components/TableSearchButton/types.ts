import {WithStyles} from "@mui/material";
import styles from "./TableSearchButton.styles";

export interface TableSearchButtonProps extends WithStyles<typeof styles> {
    handleSearch: Function;
}