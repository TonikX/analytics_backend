import {createStyles, Theme, makeStyles} from "@material-ui/core";

export default makeStyles((theme: Theme) => createStyles({
    standardCell: {
        maxWidth: '15%'
    },
    functionsCell: {
        maxWidth: '15%'
    },
    competenceCell: {
        width: '30%'
    },
    indicatorCell: {
        width: '30%'
    },
    groupTitleCell: {
        textAlign: 'center',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    }
}));