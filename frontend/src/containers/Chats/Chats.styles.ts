import {createStyles, makeStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',

    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        display: 'flex',
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

    cellStatus: {
        borderLeft: '5px solid',
        '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'none'
        }
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
    },
    addIcon: {
        marginLeft: 'auto',
    },
    titleButtons: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px',
    },
    mainContainer: {
        display: 'flex',
        '@media (max-width: 1250px)': {
            flexDirection: 'column-reverse',
        }
    },
    copyRpdContainer: {
        margin: '20px 0 40px',
    },
    notificationsContainer: {
        display: 'flex',
        marginTop: '-12px',
        width: '30%',
        height: 'calc(100vh - 300px)',
        '@media (max-width: 1250px)': {
            width: '100%',
            height: 'calc(100vh - 600px)',
            '&>div': {
                '&>div': {
                    '&>div': {
                        padding: '0px 20px 0px 0px'
                    }
                }
            }
        }
    },
    dodProfileContainer: {
        width: '70%',
        '@media (max-width: 1250px)': {
            width: '100%',
        }
    },
    userTitle: {
        fontSize: '16px',
        marginBottom: '20px',
    },
    groupsList: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    group: {
        marginRight: '10px',
        marginBottom: '10px',
    },
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '85vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    membersIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    incomingMessage: {
        justifyContent: 'flex-start',
        textAlign: 'left',
    },
    outgoingMessage: {
        justifyContent: 'flex-end',
        textAlign: 'right',
    },
    chatBubble: {
        width: 'auto',
        padding: '5px 14px',
        background: '#eee',
        margin: '10px 10px',
        borderRadius: '9px',
        position: 'relative',
        animation: 'fadeIn 1s ease-in',
        '&::after': {
            content: '',
            position: 'position',
            top: '50%',
            width: 0,
            height: 0,
            border: '20px solid transparent',
            borderBottom: 0,
            marginTop: '-10px',
        },
    },
    'chatBubble--left': {
        backgroundColor: '#74b9ff',
        color: '#fff',
        '&::after': {
          left: 0,
          borderRightColor: '#eee',
          borderLeft: 0,
          marginLeft: '-20px',
        }
    },
    'chatBubble--right': {
        '&::after': {
          right: 0,
          borderLeftColor: '#74b9ff',
          borderRight: 0,
          marginRight: '-20px',
        }
    },
    whiteColor: {
        color: '#fff'
    },
    blueColor: {
        color: '#3477f5'
    },
    memberItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});