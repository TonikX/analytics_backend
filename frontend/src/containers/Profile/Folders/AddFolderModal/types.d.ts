import {WithStyles} from '@mui/styles';
import {FolderActions} from '../types';

import styles from "./AddFolderModal.styles";

export interface AddFolderModalProps extends WithStyles<typeof styles> {
    actions: FolderActions;
    isOpen: boolean;
}
