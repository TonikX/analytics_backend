import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    //@ts-ignore
    root: {
        //@ts-ignore
        zIndex: '10000 !important'
    },
    dialog: {
        boxSizing: 'border-box',
    },
    actions: {
        padding: '15px 24px 20px'
    },
    marginBottom30: {
        marginBottom: '30px',
        width: '100%'
    },
    //@ts-ignore
    selector: {
        //@ts-ignore
        zIndex: '10001 !important'
    },
    selectorWrap: {
        width: '550px',
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '90px !important'
        }
    },
});