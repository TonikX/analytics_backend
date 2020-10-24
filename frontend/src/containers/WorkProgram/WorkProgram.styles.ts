import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    wrap: {
        height: '100%',
        padding: '0px 30px 30px',
        boxSizing: 'border-box'
    },
    content: {
        width: '100%'
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px 0px'
    },
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
        display: 'flex',
        height: 'calc(100% - 54px)',
        boxSizing: 'border-box'
    },
    programInput: {
        width: '200px',
        marginRight: '20px'
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center'
    },
    subTitle: {
        marginBottom: '10px',
        fontSize: '20px'
    },
    subItem: {
        marginBottom: '20px',
        height: 'calc(100% - 100px)'
    },
    specializationSelector: {
        width: '465px'
    },
    stepper: {
        width: '250px',
        height: 'fit-content',
        padding: 0,
        minWidth: '210px'
    },
    step: {
        background: theme.palette.secondary.main
    },
    cloneButton: {
        display: 'flex',
        fontSize: '14px',
        cursor: 'pointer',
        marginLeft: 'auto',
        alignItems: 'center',
        '&:hover': {
            color: theme.palette.primary.main,
            '& svg': {
                color: theme.palette.primary.main,
            }
        }
    },
    commentButton: {
        position: "fixed",
        right: '80px',
        bottom: '54px'
    },
    comments: {
        position: "fixed",
        right: '80px',
        bottom: '100px',
        width: '350px',
        height: '500px',
        boxShadow: '0px 0px 36px 1px rgb(143 143 143 / 30%)'
    },
    rotateIcon: {
        transform: 'rotate(360deg)',
        transition: 'transform 300ms'
    },
    headerButtons: {
        marginLeft: 'auto'
    }
});