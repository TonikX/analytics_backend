import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    tooltip: {
        fontSize: '14px'
    },
    wrap: {
        padding: '0px 30px 30px',
        boxSizing: 'border-box'
    },
    content: {
        width: '100%',
        alignSelf: 'stretch',
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px 0px',
    },
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'row',
    },
    programInput: {
        width: '200px',
        marginRight: '20px'
    },
    title: {
        fontSize: '24px !important',
        marginBottom: '20px !important',
        display: 'flex',
        alignItems: 'center',
    },
    subTitle: {
        marginBottom: '10px',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center'
    },
    subItem: {},
    specializationSelector: {
        width: '465px'
    },
    stepper: {
        width: '250px',
        height: 'fit-content',
        padding: 0,
        minWidth: '210px',
        marginRight: '15px',
    },
    stepLink: {
        textDecoration: 'none !important',
        color: '#333 !important',
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
        //@ts-ignore
        position: "fixed !important",
        right: '80px',
        bottom: '54px'
    },
    comments: {
        //@ts-ignore
        position: "fixed !important",
        right: '80px',
        bottom: '140px',
        width: '350px',
        height: '35%',
        minHeight: '300px',
        boxShadow: '0px 0px 36px 1px rgb(143 143 143 / 30%)',
        zIndex: 1,
    },
    rotateIcon: {
        transform: 'rotate(360deg)',
        transition: 'transform 300ms'
    },
    headerButtons: {
        marginLeft: 'auto',
        display: "flex",
    },
    commentIcon: {
        position: 'absolute',
        top: '10px',
        left: '-25px',
    },
});
