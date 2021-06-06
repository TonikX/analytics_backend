import {WithStyles} from "@material-ui/core";
import styles from "./SearchSelector.styles";
import {ReactText} from "react";
import {PopperPlacementType} from "@material-ui/core/Popper/Popper";

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
}

export type SelectorListType = Array<SelectorItemType>;

export type SelectorItemType = {
    label: string;
    value: ReactText;
}