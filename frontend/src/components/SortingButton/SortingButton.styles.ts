import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import {makeStyles} from "@mui/styles";

export default makeStyles((theme: Theme) => createStyles({
    iconsContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
    },
    topIcon: {
        marginBottom: -8,
        color: '#9f9f9f'
    },
    bottomIcon: {
        marginTop: -8,
        color: '#9f9f9f'
    },
    selectedSort: {
        color: '#fff'
    },
    button: {
        marginLeft: 20,
        width: 40,
        height: 40
    }
}));