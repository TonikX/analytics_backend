import {WithStyles} from "@material-ui/core";
import {WorkProgramActions} from '../../types';

import styles from "./CreateModal.styles";

type RecommendationItem = {
    id: number;
    item: {
        id: number;
        name: string;
        domain: {
            id: number;
            name: string;
        };
        value: number;
    }
}

export interface RecommendationModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isOpen: boolean;
    handleClose: Function;
    recommendations: RecommendationItem[];
}
