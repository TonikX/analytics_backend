import createStyles from "@mui/styles/createStyles";

export default () => createStyles({
    //@ts-ignore
    root: {
        //@ts-ignore
        zIndex: '10000 !important'
    },
    dialogContent: {
        padding: '10px 24px 20px 24px !important',
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
});