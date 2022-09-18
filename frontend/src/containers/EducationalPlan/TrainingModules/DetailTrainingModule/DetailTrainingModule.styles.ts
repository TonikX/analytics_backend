import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
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
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'row',
    },
    headerTextHoursCount: {
        border: 'none',
        textAlign: 'center'
    },
    textItem: {
        marginBottom: '10px'
    },
    header: {
        background: theme.palette.primary.main,
        '& th': {
            color: '#fff',
            background: theme.palette.primary.main,
            fontWeight: '400',
            fontSize: '14px',
            padding: '0px 10px !important',
        }
    },
    title: {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& p': {
            fontSize: '24px',
        }
    },
    content: {
        width: '100%',
        alignSelf: 'stretch',
    },
    editors: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    wrap: {
        padding: '0px 30px 30px',
        boxSizing: 'border-box',
        marginTop: '30px',
    },
    editorsTitle: {
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: '32px',
        marginRight: '10px',
        marginBottom: '10px',
    },
    editorsItem: {
        marginLeft: '5px',
        marginBottom: '10px',
    },
    editorsAdd: {
        marginLeft: '10px',
        height: '32px',
    },
    hourCell: {
        width: '30px'
    },
    displayFlex: {
        display: 'flex'
    },
    subTitle: {
        marginBottom: '10px',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    workProgramLink: {
        cursor: 'pointer'
    },
    actions: {
        textAlign: 'end',
        width: '112px',
        '& svg': {
            cursor: 'pointer'
        }
    },
    deleteIcon: {
        marginRight: 5
    },
    dialog: {
        padding: '40px',
    },
    stepper: {
        width: '250px',
        height: 'fit-content',
        padding: 0,
        minWidth: '210px',
        marginRight: '15px',
    },
});
