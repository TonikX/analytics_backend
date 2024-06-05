import {WithStyles} from '@mui/styles';
import {SelectorListType} from "../../../components/SearchSelector/types";
import {GeneralActions} from "../../../layout/types";
import styles from './UserSelector.styles';

export interface UserSelectorType extends WithStyles<typeof styles> {
    actions: GeneralActions;
    optionsList: SelectorListType;
    noMargin: boolean;
    handleChange: Function;
    selectorLabel: string;
    label: string;
    value: number;
    disabled?: boolean;
}
