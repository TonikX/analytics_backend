import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    tableHeading: {
        background: theme.palette.primary.main,
        color: 'white',
    },
    tableHeight: {
        height: '1px', // dirty hack for td > div 100% height
    },
    table: {
        '& td': {
            border: '1px solid rgba(224, 224, 224, 1)',
        },
    },
    rowWithPadding: {
        paddingLeft: '50px !important',
    },
    noPaddingCells: {
        padding: '0 !important',
    },
    competenceHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    competenceTableHeading: {
        border: '1px solid rgba(224, 224, 224, 1)',
    },
    competenceHeaderCell: {
        flexGrow: 1,
    },
    competenceCellHolder: {
        display: 'flex',
        height: '100%',
        '& > div:not(:last-of-type)': {
            position: 'relative',
            '&::after': {
                content: "''",
                display: 'block',
                position: 'absolute',
                width: '1px',
                top: 0,
                bottom: 0,
                right: 0,
                background: 'rgba(224, 224, 224, 1)'
            },
        }
    },
    sectionRow: {
        border: '1px solid rgba(224, 224, 224, 1)',
        '& td': {
            borderRight: '0 !important',
            borderLeft: '0 !important'
        },
    },
    selected: {
        '& td': {
            padding: '0 !important',
        },
    },
    moduleName: {
        padding: '0 10px !important',
    },
    competenceCell: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    noPaddingCell: {
        padding: '0 !important',
    },
    headerCell: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '10px',
        border: '1px solid rgba(224, 224, 224, 1)',
    },
    intersection: {
        textAlign: 'center',
    },
    noIntersection: {
        color: 'rgba(0,0,0,.25)',
        textAlign: 'center',
    },
}));
