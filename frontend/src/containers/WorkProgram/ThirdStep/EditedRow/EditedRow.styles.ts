import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    row: {

    },
    centerCell: {
        textAlign: 'center',
        background: '#fff'
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
    }
});