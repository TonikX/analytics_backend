import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    thirdStep: {
        display: 'flex',
        flexDirection: 'column'
    },
    headerCell: {
        border: '1px solid rgba(224, 224, 224, 1)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    addIcon: {
        marginTop: '30px',
        marginLeft: 'auto'
    },
});