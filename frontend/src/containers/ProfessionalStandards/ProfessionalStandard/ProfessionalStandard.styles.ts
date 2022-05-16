import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles( (theme) => createStyles ({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    titleCell: {
        width: 600
    },
    infoCell: {
        marginTop: '10px',
        width: '100%'
    },
    tableCell: {
        width: '30%',
        boxSizing: 'border-box',
        paddingRight: '10px',
    },
    header: {
        background: theme.palette.primary.main,
        color: '#fff',
    },
    row: {
        width: '100%',
        display: 'flex',
        borderBottom: '1px solid #ccc',
        alignItems: 'center',
        padding: '0 0 0 20px',
        boxSizing: 'border-box',
        minHeight: '50px'
    },
    marginRight: {
        marginRight: 20,
        width: '100%',
    },
    addIcon: {
        float: 'right' ,
        marginTop: '1%'
    },
    field: {
        width: '50%',
        marginBottom: '20px',
    },
    input: {
        width: '550px',
        marginBottom: '30px',
    },
    select: {
        width: '550px',
        marginBottom: '10px',
    },
    subTitle: {
        marginTop: 20,
        fontSize: '20px',
    },
    iconButton: {
        cursor: "pointer",
        '&:hover': {
            color: theme.palette.primary.main,
        }
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '10%',
    },
    buttonActions: {
        float: 'right',
        marginBottom: '10px',
    }
}));