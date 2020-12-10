export default (theme) => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh'
    },
    form: {
        borderRadius: 0,
        boxShadow: 'none',
        background: 'white',
        margin: 'auto',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        padding: '50px'
    },
    textField: {
        marginBottom: '15px'
    },
    button: {
        marginTop: '15px'
    },
    noAccount: {
        marginTop: '15px'
    },
    link: {
        color: theme.palette.primary.main
    }
});