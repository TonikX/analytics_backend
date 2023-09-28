import createStyles from "@mui/styles/createStyles";
import {makeStyles} from "@mui/styles";

export default makeStyles(() => createStyles({
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
    statusPointBlock: {
        display: 'flex',
        alignItems: 'center'
    },
    statusPointTooltip: {
        display: 'flex',
        flexDirection: 'column'
    },
    disabledStyle: {

    }
}));
