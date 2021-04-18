import {createStyles, Theme, makeStyles} from "@material-ui/core";

export default makeStyles((theme: Theme) => createStyles({
    standardCell: {
        maxWidth: '15%'
    },
    functionsCell: {
        maxWidth: '15%'
    },
    competenceCell: {
        width: '35%'
    },
    indicatorCell: {
        width: '35%'
    },
    groupTitleCell: {
        textAlign: 'center',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    },
    editableGroupTitleWrap: {
        width: '300px',
    },
    groupRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    groupRowWrap: {
        background: '#9e9e9e2e',
        '& button': {
            padding: '5px'
        },
        '& p': {
            margin: '0px'
        }
    }
}));