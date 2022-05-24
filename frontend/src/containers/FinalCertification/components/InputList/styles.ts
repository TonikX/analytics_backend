import {createStyles} from "@material-ui/core";

export default () => createStyles({
    root: {
        width: '100%',
    },
    input: {
        width: '100%',
        marginTop: '20px',
        display: "block",
    },
    item: {
        borderBottom: '1px solid #ccc',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        display: "flex",
        alignItems: 'center'
    },
});