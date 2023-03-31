import {createStyles, Theme} from "@mui/material";

export default (theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        borderRadius: '0px',
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
            whiteSpace: 'nowrap'
        }
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
    actions: {
        display: 'flex',
        height: 'fit-content',
        marginLeft: 'auto',
        padding: '0px 20px'
    },
    searchWrapper: {},
    searchInput: {
        height: '40px',
        minHeight: '40px'
    },
    filterBtn: {
        width: '150px',
        height: '40px',
        marginRight: '20px',
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        textDecoration: 'uppercase',
        fontSize: '15px',
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
    accordionSummary: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        // '&$root': {
        //     // // этот margin
        //     // margin: 0,
        //     height: '48px',
        //   },

        //   '&$expanded': {
        //     // этот margin
        //     height: '48px',
        //   },
    }
});