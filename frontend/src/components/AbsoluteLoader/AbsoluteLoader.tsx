import React from 'react';
import className from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from "@material-ui/core/CircularProgress";
import {WithStyles} from '@material-ui/core';

import styles from './AbsoluteLoader.styles';

interface AbsoluteLoaderProps extends WithStyles<typeof styles> {
    isFetching: boolean
}

const AbsoluteLoader = ({classes, isFetching}: AbsoluteLoaderProps) => {
    return (
        <div className={className(classes.loaderContainer, {
            [classes.showLoader]: isFetching,
            [classes.hideLoader]: !isFetching
        })}>
            {isFetching && <CircularProgress />}
        </div>
    );
};

export default withStyles(styles)(AbsoluteLoader);
