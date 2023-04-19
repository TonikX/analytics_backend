import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    error: {
        color: theme.palette.error.main
    },
    tableWrap: {
        '& td': {
            padding: '5px 10px !important',
            fontSize: '14px'
        },
        '& p': {
            fontSize: '14px'
        },
        marginBottom: '30px'
    },
    tableHeader: {
        background: theme.palette.primary.main,
        '& th': {
            color: '#fff',
            background: theme.palette.primary.main,
            fontWeight: '400',
            fontSize: '14px',
            padding: '0px 10px !important',
            height: '40px',
            whiteSpace: 'nowrap'
        }
    },
});