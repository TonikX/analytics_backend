import {createStyles, Theme, makeStyles} from "@material-ui/core";

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
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    subtitle: {
        marginBottom: '20px',
        marginTop: '20px'
    },
    submitBtn: {
        width: 'fit-content'
    },
}));