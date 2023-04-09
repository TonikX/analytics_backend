import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',
        minHeight: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        '& .ReactVirtualized__Grid': {
            outline: 'none !important'
        }
    },
    title: {
        fontSize: '24px !important',
        display: 'flex !important',
        justifyContent: 'space-between !important'
    },
    subtitle: {
        marginBottom: '20px !important',
        marginTop: '20px !important'
    },
    submitBtn: {
        width: 'fit-content'
    },
    whiteButton: {
        background: 'white !important',
        color: '#000 !important'
    },
}));