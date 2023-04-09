import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";
import {PRIMARY} from "../../layout/themeMaterialUi";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',
        minHeight: '100%',
        background: '#fff',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: '24px !important',
        lineHeight: '39px !important',
        marginBottom: '20px',
        display: 'flex',
    },
    header: {
        background: `${theme.palette.primary.main} !important`,
        '& th': {
            color: '#fff !important',
            background: `${theme.palette.primary.main} !important`,
            fontWeight: '400',
            fontSize: '14px',
            padding: '0px 10px !important',
            whiteSpace: 'nowrap'
        }
    },
    tableWrap: {
        '& td': {
            padding: '5px 10px !important',
            fontSize: '14px'
        },
        '& p': {
            fontSize: '14px'
        }
    },
    link: {
        '& a': {
            textDecoration: 'none',
            color: PRIMARY
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
        minHeight: 'calc(100vh - 300px)',
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
    row: {
        display: 'flex',
        gap: '10px'
    }
}));
