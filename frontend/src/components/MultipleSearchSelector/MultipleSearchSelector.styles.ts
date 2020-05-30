import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        position: 'relative'
    },
    menu: {
        position: "absolute",
        width: '100%'
    },
    menuItem: {
        width: '100%',
        cursor: 'pointer'
    },
    popper: {
        zIndex: 100000,
    },
    selectedItem: {

    }
});