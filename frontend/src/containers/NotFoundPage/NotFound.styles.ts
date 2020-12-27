import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    wrap: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: '24px'
    },
    description: {
        textAlign: 'center',
        fontSize: '20px',
        margin: '10px 0px 25px',
        fontWeight: 300
    },
    image: {
        width: '200px',
        margin: 'auto'
    },
    block: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        boxShadow: 'none',
        '& a': {
            textDecoration: 'none',
            color: 'white'
        }
    }
});