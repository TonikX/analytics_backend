import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    icon: {
        color: '#9f9f9f'
    },
    selectedIcon: {
        color: '#fff'
    },
    button: {
        width: 40,
        height: 40
    },
    paper: {
        padding: '10px',
        alignItems: 'center',
        display: 'flex'
    },
    searchInput: {
        height: '40px',
        marginRight: '10px'
    }
});