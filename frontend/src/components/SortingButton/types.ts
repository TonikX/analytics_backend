import {WithStyles} from '@mui/styles';
import styles from "./SortingButton.styles";

export type SortingType = Types.ASC | Types.DESC | '';

export enum Types {
    ASC = 'asc',
    DESC = 'desc'
}

export interface SortingButtonProps extends WithStyles<typeof styles> {
    mode?: string;
    changeMode: Function;
}
