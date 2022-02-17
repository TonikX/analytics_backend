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

    codeCell: {
        marginTop: '10px',
        width: '100%'

    },
    actions: {
       float: 'right'
    },

}));