import React from 'react';

import {LiteratureModalProps} from './types';
import connect from './LiteratureModal.connect';
import {fields} from '../../enum';
import AddLiteratureModal from "../../../../components/AddLiteratureModal";
import {LiteratureEbscoType, LiteratureType} from "../../../Literature/types";

class LiteratureModal extends React.PureComponent<LiteratureModalProps> {
    handleClose = () => {
        this.props.actions.closeDialog(fields.ADD_NEW_LITERATURE);
    }

    handleSave = ({ selectedLiterature, selectedLiteratureEbsco }: { selectedLiterature: Array<LiteratureType>, selectedLiteratureEbsco: Array<LiteratureEbscoType> }) => {
        this.props.actions.addLiterature({
            selectedLiterature,
            selectedLiteratureEbsco,
        });
    }

    render() {
        const {selectedItems, isOpen} = this.props;

        return (
            <AddLiteratureModal handleClose={this.handleClose}
                                handleSave={this.handleSave}
                                selectedItems={selectedItems}
                                isOpen={isOpen}/>
        )
    }
}

export default connect(LiteratureModal);
