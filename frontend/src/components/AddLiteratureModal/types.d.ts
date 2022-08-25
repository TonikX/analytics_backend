import {WithStyles} from "@material-ui/core";
import LiteratureActions from '../../containers/Literature/actions';

import styles from "./styles";
import {LiteratureEbscoType, LiteratureType} from "../../containers/Literature/types";

export interface LiteratureCreateModalProps extends WithStyles<typeof styles> {
    actions: LiteratureActions;
    isOpen: boolean;
    literature: any;
}

export interface AddLiteratureModalProps extends  WithStyles<typeof styles> {
    searchQuery: string;
    isOpen: boolean;
    selectedItems: Array<string>;
    literatureList: Array<LiteratureType>;
    currentPage: number;
    allCount: number;
    literatureActions: LiteratureActions;
    handleClose: () => void;
    handleSave: ({ selectedLiterature, selectedLiteratureEbsco }: { selectedLiterature: Array<LiteratureType>, selectedLiteratureEbsco: Array<LiteratureEbscoType>}) => void;
}