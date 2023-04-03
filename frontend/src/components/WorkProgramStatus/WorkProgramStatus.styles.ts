import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    status: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px',
    },
    statusPoint: {
        marginRight: '5px',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: 'red'
    },
    cursorPointer: {
        cursor: 'pointer'
    },
    disabledStyle: {

    }
});