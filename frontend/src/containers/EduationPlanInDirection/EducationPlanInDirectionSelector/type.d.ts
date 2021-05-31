import {WithStyles} from "@material-ui/core";
import {SelectorListType} from "../../../components/SearchSelector/types";
import {EducationalPlanInDirectionActions} from "../types";
import styles from './EducationPlanInDirectionSelector.styles';

export interface EducationPlanInDirectionSelectorType extends WithStyles<typeof styles>  {
    actions: EducationalPlanInDirectionActions;
    optionsList: SelectorListType;
    noMargin: boolean;
    handleChange: Function;
}