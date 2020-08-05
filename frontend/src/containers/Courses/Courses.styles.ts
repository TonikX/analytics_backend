import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    courseList: {
        width: '100%',
        height: 'calc(100% - 50px)'
    },
    courseTableWrap: {
        height: 'calc(100% - 60px)'
    },
    course: {
        width: '100%',
        display: 'flex',
        borderBottom: '1px solid #ccc',
        alignItems: 'center',
        padding: '0 0 0 20px',
        boxSizing: 'border-box',
        minHeight: '50px'
    },
    courseTitle: {
        minWidth: 200,
        width: '20%',
        flex: 'none'
    },
    courseLink: {
        minWidth: 200,
        width: 200,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        flex: 'none',
        '&: a': {
            textDecoration: 'none'
        }
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
        marginLeft: 'auto',
        padding: '0px 20px'
    },
    searchInput: {
        height: '40px',
        minHeight: '40px'
    },
    addIcon: {
        marginLeft: 'auto',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
    },
    header: {
        background: theme.palette.primary.main,
        color: '#fff'
    },
    marginRight: {
        marginRight: 20
    },
    coursePlatform: {
        minWidth: 200,
        width: '10%',
        flex: 'none'
    },
    courseDescription: {

    },
});