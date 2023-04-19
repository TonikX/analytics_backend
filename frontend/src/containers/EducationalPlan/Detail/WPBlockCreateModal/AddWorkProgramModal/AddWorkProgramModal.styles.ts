import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    //@ts-ignore
    root: {
        //@ts-ignore
        zIndex: '10000 !important'
    },
    dialog: {
        boxSizing: 'border-box',
        '& .MuiDialogContent-root': {
            padding: '20px 24px !important'
        }
    },
    actions: {
        padding: '15px 24px 20px'
    },
    marginBottom30: {
        marginBottom: '30px',
        width: '100%'
    },
    search: {
        padding: '15px 24px 20px'
    }
    
});