import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    input: {
        width: '100%',
        marginTop: '30px',
        display: "block",
    },
    content: {
        height: '600px',
    },
    selectorWrap: {
        width: '100%',
        marginTop: '30px',
        display: "block",
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '100px !important'
        }
    },
    columns: {
        display: "flex",
    },
    leftColumn: {
        width: '50%',
    },
    rightColumn: {
        marginLeft: '30px',
        width: '50%',
    },
    generalProvisionsText: {
        marginTop: '20px',
    },
    singleColumn: {
        width: '70%',
    },
    structuralUnit: {
        marginTop: '37px',
    },
    addIcon: {
        marginTop: '10px',
        marginLeft: 'auto',
        flex: 'none',
        marginBottom: '20px',
    },
    list: {
        height: '100%',
    },
    item: {
        borderBottom: '1px solid #ccc',
        padding: '0px 10px',
        display: 'flex',
        alignItems: 'center'
    },
    disableItem: {
        padding: '12px 10px',
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
        marginLeft: 'auto',
        padding: '0px 20px'
    },
    title: {
        width: '50%'
    },
    header: {
        background: theme.palette.primary.main,
        color: '#fff',
        display: 'flex',
        padding: '10px',
        marginTop: '20px'
    }
});
