import createStyles from "@mui/styles/createStyles";
import {makeStyles} from "@mui/styles";

export default makeStyles(() => createStyles({
    formInput: {
        display: 'flex',
        flexDirection: 'column',
    },
    formInput_margin: {
        marginBottom: '20px !important',
        width: '500px'
    },
    formControlLabel_margin: {
        marginRight: 'auto !important',
        marginLeft: '15px !important'
    },
    bugModal_deleteFile: {
        display: 'flex',
        alignItems: 'center'
    },
    bugModal_footer: {
        display: 'flex'
    },
    bugModal_deleteFile_icon: {
        marginLeft: '10px',
        cursor: 'pointer'
    }
}));
