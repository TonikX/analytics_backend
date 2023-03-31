import {WithStyles} from "@mui/material";

import styles from "./CreateModal.styles";

export interface EducationalStandardCreateModalProps extends WithStyles<typeof styles> {
    actions: any;
    isOpen: boolean;
    educationalStandard: any;
}