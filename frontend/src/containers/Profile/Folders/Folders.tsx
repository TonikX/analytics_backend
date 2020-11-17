import React from 'react';

import withStyles from "@material-ui/core/styles/withStyles";

import connect from './Folders.connect';
import styles from './Folders.styles';

import {FoldersProps} from './types';

class Folders extends React.PureComponent<FoldersProps> {
    componentDidMount() {
        this.props.actions.getFolders();
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                FoldersFoldersFolders
            </div>
        );
    }
}

export default connect(withStyles(styles)(Folders));
