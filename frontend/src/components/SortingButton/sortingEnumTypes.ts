import {WithStyles} from "@material-ui/core";
import styles from "./SortingButton.styles";

export type SortingType = SortingEnumTypes.ASC | SortingEnumTypes.DESC | '';

export enum SortingEnumTypes {
    ASC = 'asc',
    DESC = 'desc'
}

export interface SortingButtonProps extends WithStyles<typeof styles> {
    mode?: string;
    changeMode: Function;
}