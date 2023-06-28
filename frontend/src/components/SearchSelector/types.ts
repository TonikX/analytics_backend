import {WithStyles} from '@mui/styles';
import styles from "./SearchSelector.styles";
import {ReactText} from "react";

export interface SearchSelectorProps extends WithStyles<typeof styles> {
    changeSearchText: Function;
    changeItem: Function;
    label: string;
    value?: string|number;
    valueLabel: string;
    list: SelectorListType;
    className?: string;
    disabled?: boolean;
    isReset?: boolean;
    popperPlacement?: any; // возможно в новой версии нету этого
    errorMessage?: string;
    cleanLabelAfterSelect?: boolean;
}

export type SelectorListType = Array<SelectorItemType>;

export type SelectorItemType = {
    label: string;
    value: ReactText;
}
