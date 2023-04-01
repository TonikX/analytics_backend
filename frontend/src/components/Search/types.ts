import {withStyles} from '@mui/styles';
import styles from "./Search.styles";

export interface SearchProps extends WithStyles<typeof styles> {
    handleChangeSearchQuery: Function;
}