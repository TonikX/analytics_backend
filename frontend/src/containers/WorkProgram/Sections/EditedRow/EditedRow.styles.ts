import {createStyles, Theme} from "@mui/material";

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
        width: '240px'
    },
    saveIcon: {
        color: 'green'
    },
    actions: {
        display: 'flex',
        '& button': {
            padding: '3px'
        }
    }
});