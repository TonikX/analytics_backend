import {WithStyles} from "@material-ui/core";
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