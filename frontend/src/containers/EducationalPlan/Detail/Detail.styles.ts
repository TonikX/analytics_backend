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
        marginRight: '10px',
        width: '100px',
        flex: 'none',
        marginLeft: 'auto'
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
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0 0 0 20px',
        flex: 'none',
        boxSizing: 'border-box',
        borderBottom: '1px solid #ccc',
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
    semesterHeaderList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    semesterHeaderCells: {
        display: 'flex'
    },
    titleCell: {
        width: '40%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        flex: 'none'
    },
    typeCell: {
        width: '200px',
    },
    semesterHoursCell: {
        width: '35px',
        textAlign: 'center',
        flex: 'none'
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
    headerWrap: {
        background: theme.palette.primary.main,
        color: '#fff',
        padding: '10px 0px',
        border: 'none',
    },
    header: {
        width: '100%',
        border: 'none'
    },
    marginRight: {
        marginRight: 20
    },
});