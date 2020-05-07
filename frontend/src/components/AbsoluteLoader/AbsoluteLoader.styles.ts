import {createStyles} from '@material-ui/core';
import {Theme} from '@material-ui/core/styles/createMuiTheme';

export default (theme: Theme) => createStyles({
    loaderContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
    },
    showLoader: {
        zIndex: 1000,
        backgroundColor: '#ffffff8f',
        transition: '0.4s all ease-out',
    },
    hideLoader: {
        zIndex: -20,
        backgroundColor: 'none',
        transition: '0.2s all ease-out'
    },
});
