import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    row: {

    },
    centerCell: {
        textAlign: 'center',
        background: '#fff',
        border: '1px solid rgba(224, 224, 224, 1)'
    },
    cell: {
        background: '#fff'
    },
    smallInput: {
        width: '70px'
    },
    largeInput: {
        width: '300px'
    },
    saveIcon: {
        color: 'green'
    },
    actions: {
        display: 'flex'
    }
});