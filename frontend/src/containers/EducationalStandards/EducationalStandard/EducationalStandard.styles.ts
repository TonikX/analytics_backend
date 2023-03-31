import {createStyles, makeStyles, Theme} from "@mui/material";

export default makeStyles((theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',
        minHeight: '100%',
        boxSizing: 'border-box',
        display: 'flex',
    },
    stepper: {
        width: '250px',
        height: 'fit-content',
        padding: 0,
        minWidth: '210px'
    },
    content: {
        width: '100%',
        boxSizing: 'border-box',
        paddingLeft: '50px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center'
    },
}))