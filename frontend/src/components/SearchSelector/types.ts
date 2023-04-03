import {WithStyles} from '@mui/styles';
import styles from "./SearchSelector.styles";
import {ReactText} from "react";
import {PopperPlacementType} from "@mui/material/Popper/Popper";

export interface SearchSelectorProps extends WithStyles<typeof styles> {
    changeSearchText: Function;
    changeItem: Function;
    label: string;
    value: string|number;
    valueLabel: string;
    list: SelectorListType;
    className?: string;
    disabled?: boolean;
    isReset?: boolean;
    popperPlacement?: PopperPlacementType;
    errorMessage?: string;
}

export type SelectorListType = Array<SelectorItemType>;

export type SelectorItemType = {
    label: string;
    value: ReactText;
}
