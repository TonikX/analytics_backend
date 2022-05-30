import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    wrapperChart: {
        display: 'flex',
        flexDirection: 'column',
        width: 500 + 'px',
        height: 500 + 'px',
        alignItems: 'center'
    },
    btnChart: {
        marginTop: 20 + 'px'
    }
});