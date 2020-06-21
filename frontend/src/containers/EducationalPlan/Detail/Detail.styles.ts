import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        padding: '50px',
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    moduleWorkProgramWrap: {
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    moduleWorkProgramWrapActions: {
        display: 'flex',
        marginRight: '10px'
    },
    title: {
        fontSize: '24px',
        marginBottom: '50px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    list: {
        width: '100%',
        height: 'calc(100% - 50px)'
    },
    tableWrap: {
        height: 'calc(100% - 200px)'
    },
    row: {
        width: '100%',
        display: 'flex',
        borderBottom: '1px solid #ccc',
        alignItems: 'center',
        padding: '0 0 0 20px',
        boxSizing: 'border-box',
        minHeight: '50px'
    },
    moduleWorkProgramList: {
        width: '100%',
    },
    workProgramRow: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 0 0 20px',
        boxSizing: 'border-box',
        minHeight: '50px'
    },
    blockRow: {
        background: '#eeeeee',
        '&: div': {
            fontWeight: '500'
        }
    },
    addProgramIcon: {
        marginLeft: '10px',
        cursor: 'pointer'
    },
    moduleRow: {
        color: theme.palette.primary.main,
        fontWeight: 500,
    },
    numberCell: {
        width: 200,
        flex: 'none'
    },
    dateCell: {
        width: 210,
        flex: 'none'
    },
    titleCell: {
        width: '50%',
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
        marginLeft: 'auto',
        padding: '0px 20px'
    },
    searchInput: {
        height: '40px'
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
    // @ts-ignore
    popper: {
        // @ts-ignore
        zIndex: '10000 !important',
    },
    menuPaper: {
        boxShadow: '0px 0px 20px -2px rgba(160, 159, 159, 0.42)'
    },
    menuIcon: {
        marginRight: '10px',
        fill: 'rgba(0, 0, 0, 0.54)'
    },
    menuLink: {
        color: 'rgb(51, 51, 51) !important',
        textDecoration: 'none'
    }
});