import {WithStyles} from '@mui/styles';

import styles from "./CreateModal.styles";

export interface EducationalStandardCreateModalProps extends WithStyles<typeof styles> {
    actions: any;
    isOpen: boolean;
    educationalStandard: any;
}
