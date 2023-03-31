import {WithStyles} from "@mui/material";
import styles from "./Search.styles";

export interface SearchProps extends WithStyles<typeof styles> {
    handleChangeSearchQuery: Function;
}