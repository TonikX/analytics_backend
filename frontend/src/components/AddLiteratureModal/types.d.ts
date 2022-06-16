import {WithStyles} from "@material-ui/core";
import {LiteratureActions} from '../types';

import styles from "./styles";
import {LiteratureType} from "../../containers/Literature/types";

export interface LiteratureCreateModalProps extends WithStyles<typeof styles> {
    actions: LiteratureActions;
    isOpen: boolean;
    literature: any;
}

export interface AddLiteratureModalProps extends  WithStyles<typeof styles> {
    isOpen: boolean;
    selectedItems: Array<string>;
    literatureList: Array<LiteratureType>;
    currentPage: number;
    allCount: number;
    literatureActions: LiteratureActions;
    handleClose: () => void;
    handleSave: (ids: Array<LiteratureType>) => void;
}