import {createStyles} from "@material-ui/core";

export default () => createStyles({
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
        paddingBottom: '105px',
        boxSizing: 'border-box',
    },
    commentList: {
        height: 'calc(100% - 200px)'
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
        width: '100%',
        boxSizing: 'border-box',
        borderTop: '1px solid #ccc',
        background: '#fff',
    },
    commentTextFieldButtons: {
        marginLeft: 'auto',
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    commentButton: {
        position: "fixed",
        right: '80px',
        bottom: '54px'
    },
    comments: {
        position: "fixed",
        right: '80px',
        bottom: '110px',
        width: '350px',
        height: '500px',
        boxShadow: '0px 0px 36px 1px rgb(143 143 143 / 30%)',
        zIndex: 1,
    },
    rotateIcon: {
        transform: 'rotate(360deg)',
        transition: 'transform 300ms'
    },
});