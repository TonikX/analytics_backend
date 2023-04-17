import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    dialogContent: {
        display: 'flex',
        padding: '48px !important',
        marginTop: '64px !important'
    },
    label: {
        fontSize: '14px',
        marginBottom: 10
    },
    addWorkProgramButton: {
        padding: '5px !important',
        '&:hover': {
            background: 'none'
        }
    },
    leftSide: {
        maxWidth: '300px',
        flex: 'none'
    },
    rightSide: {
        width: '100%',
        paddingLeft: '50px',
        paddingRight: '20px',
        boxSizing: 'border-box'
    },
    semesterField: {
        width: '100px',
        marginBottom: '10px',
        marginRight: '10px',
        '& .MuiInputLabel-outlined': {
            fontSize: '13px'
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '55px !important'
        }
    },
    workProgramList: {
        width: '100%',
        height: '100%'
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    semesterBlock: {
        maxWidth: '600px',
        margin: '30px 0px',
    },
    //@ts-ignore
    root: {
        //@ts-ignore
        zIndex: '10000 !important'
    },
    dialog: {
        boxSizing: 'border-box',
    },
    semesterList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
    },
    workProgramBlock: {
        marginBottom: 30
    },
    addWorkProgramButtonWrap: {
        display: 'flex'
    },
    workProgramItem: {
        display: 'flex',
        marginTop: 5,
        marginBottom: 5,
        '& svg': {
            cursor: 'pointer',
            '&:hover': {
                color: theme.palette.primary.main
            }
        }
    },
    input: {
        width: '550px',
    },
    lastInput: {
        width: '550px',
    },
    selector: {
        width: '290px',
        //@ts-ignore
        zIndex: '10001 !important'
    },
    smallInput: {
        width: '290px'
    },
    actions: {
        padding: '15px 24px 20px'
    },
    marginBottom30: {
        marginBottom: '30px'
    },
    selectorWrap: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '40px !important'
        }
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '30px',
        width: '550px'
    },
    datePicker: {
        width: '100%'
    },
    workProgramBlockItem: {
        padding: 20,
        marginBottom: 40,
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
    },
    smallButton: {
        cursor: 'pointer',
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center'
    },
    iconButton: {
        cursor: "pointer",
        '&:hover': {
            color: theme.palette.primary.main,
        }
    },
    deleteIndicatorIcon: {
        position: 'relative',
        top: '6px',
        cursor: "pointer",
        '&:hover': {
            color: theme.palette.primary.main,
        }
    },
    indicatorItem: {
        marginBottom: '10px',
        '& svg': {
            position: 'relative',
            top: '6px',
        }
    },
    competenceButtons: {
        display: 'flex'
    },
    competenceCell: {
        width: '30%',
        maxWidth: 500
    },
    resultsCell: {
        maxWidth: 400
    },
    disableIcon: {
        cursor: 'auto',
        fill: 'rgba(0, 0, 0, 0.12)'
    },
    tooltip: {
        zIndex: 15000
    }
});