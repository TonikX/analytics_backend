export default (theme) => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: `calc(100vh - 64px)`,
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
        marginTop: '15px',
        width: '100%'
    },
    noAccount: {
        marginTop: '15px',
        borderTop: '1px solid #ccc',
    },
    link: {
        textDecoration: 'none'
    },
    tabs: {
        display: 'flex',
        marginBottom: '20px',
        '&>p': {
            cursor: 'pointer',
            width: '50%',
            paddingBottom: '10px',
            textAlign: 'center',
        },
        '& a': {
            width: '50%',
            textDecoration: 'none',
            textAlign: 'center',
            color: theme.palette.primary.main,
            borderBottom: '1px solid #ccc',
        }
    },
    activeTab: {
        color: theme.palette.primary.main,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
    }
});