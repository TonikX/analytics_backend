import {WithStyles} from '@mui/styles';
import styles from "./SimpleSelector.styles";
import {ReactText} from "react";

export interface QualificationSelectorProps extends WithStyles<typeof styles> {
    value?: ReactText;
    label: string;
    onChange: Function;
    noMargin?: boolean;
    disabled?: boolean;
    wrapClass: string;
    metaList: Array<{
        label: string;
        value: ReactText;
    }>;
    errorMessage?: ReactText;
    onClickMenuItem?: (value: ReactText) => void
}
