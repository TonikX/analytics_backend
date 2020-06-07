import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    content: {
        marginLeft: '10px',
        width: '100%'
    },
    root: {
        padding: '50px',
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
        display: 'flex',
        height: '100%',
        boxSizing: 'border-box'
    },
    programInput: {
        width: '200px',
        marginRight: '20px'
    },
    title: {
        fontSize: '24px',
        marginBottom: '50px',
    },
    subTitle: {
        marginBottom: '10px',
        fontSize: '20px'
    },
    subItem: {
        marginBottom: '20px',
        height: '80%'
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
    }
});