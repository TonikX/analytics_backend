import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
        paddingBottom: '105px',
        boxSizing: 'border-box',
    },
    comment: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    commentName: {
        fontWeight: 600
    },
    commentDate: {
        fontWeight: 300,
        fontSize: '12'
    },
    commentText: {
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px'
    },
    commentTextFieldWrap: {
        position: 'absolute',
        width: '100%',
        boxSizing: 'border-box',
        padding: 10,
        bottom: 0,
        borderTop: '1px solid #ccc',
        background: '#fff',
    },
    commentTextFieldButtons: {
        marginLeft: 'auto',
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'flex-end'
    }
});