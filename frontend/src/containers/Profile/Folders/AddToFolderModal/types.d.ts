import {WithStyles} from '@mui/styles';
import {FolderActions, FolderType} from '../types';

import styles from "./AddToFolderModal.styles";

export interface AddToFolderModalProps extends WithStyles<typeof styles> {
    actions: FolderActions;
    isOpen: boolean;
    folders: Array<FolderType>;
}