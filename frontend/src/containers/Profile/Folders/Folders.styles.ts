import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        background: '#fff',
        minHeight: 'calc(100% - 64px)',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    tabs: {
        borderRight: '1px solid #ccc'
    },
    tabsWrap: {
        display: 'flex'
    },
    tab: {
        display: 'block',
        textAlign: 'left'
    },
    description: {
        marginBottom: '10px'
    },
    workPrograms: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '10px',
    },
    workProgramLink: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    workProgram: {
        marginBottom: '10px',
        marginRight: '10px',
        padding: '15px',
        border: '1px solid #ccc',
        '&:hover': {
            background: '#f6f6f6'
        }
    },
    rating: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .react-stars': {
            outline: 'none !important',
            height: '32px'
        }
    },
    deleteIcon: {
        position: 'relative',
        top: '5px',
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    addIcon: {
        marginLeft: 'auto',
    },
});