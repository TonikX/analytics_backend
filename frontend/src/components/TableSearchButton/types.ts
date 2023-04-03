import {WithStyles} from '@mui/styles';
import styles from "./TableSearchButton.styles";

export interface TableSearchButtonProps extends WithStyles<typeof styles> {
    handleSearch: Function;
}
