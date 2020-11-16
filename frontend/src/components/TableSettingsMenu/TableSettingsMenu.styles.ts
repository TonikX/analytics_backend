import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    // @ts-ignore
    popper: {
        // @ts-ignore
        zIndex: '10000 !important',
    },
    menuPaper: {
        boxShadow: '0px 0px 20px -2px rgba(160, 159, 159, 0.42)'
    },
    menuLinkItem: {
        '&>a': {
            display: 'flex',
            alignItems: 'center',
            color: 'rgb(51, 51, 51) !important',
            textDecoration: 'none'
        },
        '& svg': {
            marginRight: '10px',
            fill: 'rgba(0, 0, 0, 0.54)'
        },
    }
});