import {createStyles} from '@material-ui/core';
import {Theme} from '@material-ui/core/styles/createMuiTheme';

export default (theme: Theme) => createStyles({
    loaderWrap: {
        position: "relative",
        display: "flex",
        alignItems: "center"
    },
    loader: {
        position: "absolute",
        right: '20px',
        top: '12px'
    }
});