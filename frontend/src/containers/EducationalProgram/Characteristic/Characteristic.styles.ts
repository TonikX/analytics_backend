import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
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
    tableWrap: {
        height: 'calc(100% - 60px)',
        maxheight: 'calc(100% - 60px)',
        '& td': {
            padding: '5px 10px !important',
            fontSize: '14px'
        },
        '& p': {
            fontSize: '14px'
        }
    },
    header: {
        background: theme.palette.primary.main,
        '& th': {
            color: '#fff',
            background: theme.palette.primary.main,
            fontWeight: '400',
            fontSize: '14px',
            padding: '0px 10px !important',
            whiteSpace: 'initial'
        },
        '& tr': {
            height: '41px'
        }
    },
    label: {
        fontSize: '14px',
        marginBottom: '10px',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    editorWrap: {
        marginBottom: '30px',
    }
});