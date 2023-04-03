import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    icon: {
        color: '#9f9f9f'
    },
    selectedIcon: {
        color: '#fff'
    },
    button: {
        width: 40,
        height: 40
    },
    paper: {
        padding: '10px',
    },
    buttonWrap: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});