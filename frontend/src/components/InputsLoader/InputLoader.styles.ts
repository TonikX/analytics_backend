import createStyles from "@mui/styles/createStyles";
import {Theme} from '@mui/material/styles/createMuiTheme';

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