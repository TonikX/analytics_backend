import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    root: {
        position: 'relative'
    },
    menu: {
        position: "absolute",
        width: '100%',
        maxHeight: '300px'
    },
    //@ts-ignore
    menuItem: {
        width: '100%',
        cursor: 'pointer',
        //@ts-ignore
        whiteSpace: 'normal !important',
    },
    popper: {
        zIndex: 100000,
    },
    selectedItem: {

    },
});
