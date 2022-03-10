import {WithStyles} from "@material-ui/core";

import styles from "./CreateModal.styles";

export interface EducationalStandardCreateModalProps extends WithStyles<typeof styles> {
    actions: any;
    isOpen: boolean;
    educationalStandard: any;
}