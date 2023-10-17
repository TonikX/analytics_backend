import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    titleWrap: {
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
    },
    buttonGroup: {
        marginLeft: 'auto'
    },
    title: {
        fontSize: '24px !important',
        marginRight: '10px !important',
        '& a': {
            textDecoration: 'none',
            color: theme.palette.primary.main
        }
    },
    tablePanel: {
      padding: '25px 0 !important',
    },
    addIcon: {
        marginLeft: 'auto',
    },
    addExpertButton: {
        width: 'fit-content',
        marginLeft: 'auto'
    },
    header: {
        '& th': {
            height: '41px',
            background: theme.palette.primary.main,
            color: '#fff',
        }
    },
    deleteCell: {
        width: '100px'
    }
});
