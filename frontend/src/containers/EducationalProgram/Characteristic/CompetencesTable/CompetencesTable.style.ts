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
            whiteSpace: 'pre-wrap'
        }
    },
    addButton: {
        marginLeft: 'auto',
        marginTop: '20px'
    },
    actions: {
        marginLeft: 'auto',
    },
    deleteIcon: {
        marginLeft: '5px',
        cursor: 'pointer',
        position: 'relative',
        top: '5px',
        '&:hover': {
            color: theme.palette.primary.main,
        }
    },
    addSmallButton: {
        marginTop: '10px',
        fontSize: '12px',
        padding: '0px 0px !important',
        '&:hover': {
            background: 'transparent',
        }
    },
    categoryCell: {
        width: '200px'
    },
    competenceCell: {
        width: '50%'
    }
}));