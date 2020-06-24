import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    secondStep: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    headerCell: {
        border: '1px solid rgba(224, 224, 224, 1)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    addIcon: {
        marginTop: '30px',
        marginLeft: 'auto',
        flex: 'none',
    },
    table: {
        height: '100%',
        flex: 1,
        '& th': {
            padding: '3px 10px !important'
        },
        '& td': {
            padding: '3px 10px !important'
        }
    }
});