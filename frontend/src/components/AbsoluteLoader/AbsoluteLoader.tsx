import React from 'react';
import className from 'classnames';

import withStyles from '@mui/material/styles/withStyles';
import CircularProgress from "@mui/material/CircularProgress";
import {WithStyles} from '@mui/material';

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
