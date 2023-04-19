import {WithStyles} from '@mui/styles';
import {SelectorListType} from "../../../components/SearchSelector/types";
import {EducationalPlanInDirectionActions} from "../types";
import styles from './EducationPlanInDirectionSelector.styles';

export interface EducationPlanInDirectionSelectorType extends WithStyles<typeof styles>  {
    actions: EducationalPlanInDirectionActions;
    optionsList: SelectorListType;
    noMargin: boolean;
    handleChange: Function;
    className?: any;
    isReset?: boolean;
    label?: string;
    disabled?: boolean;
}

export interface EducationPlanInDirectionSelectorType2 extends WithStyles<typeof styles>  {
    actions: EducationalPlanInDirectionActions;
    optionsList: SelectorListType;
    noMargin: boolean;
    handleChange: Function;
    value: string;
    className?: any;
    isReset?: boolean;
}
