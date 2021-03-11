import {createStyles, Theme, makeStyles} from "@material-ui/core";

export default makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& td': {
            padding: '5px 10px !important',
            fontSize: '14px'
        },
        '& p': {
            fontSize: '14px'
        }
    },
    tableHead: {
        background: theme.palette.primary.main,
        '& th': {
            color: '#fff',
            background: theme.palette.primary.main,
            fontWeight: '400',
            fontSize: '14px',
            padding: '5px 10px !important',
            whiteSpace: 'nowrap'
        }
    },
    addButton: {
        marginLeft: 'auto',
        marginTop: '20px'
    }
}));