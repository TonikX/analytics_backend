import {createStyles, makeStyles} from '@mui/styles';

export const useStyles = makeStyles(() => createStyles({
    root: {
        padding: '40px 50px 20px 50px',
        background: '#fff',
        boxSizing: 'border-box',
        minHeight: '100%',
    },
    form: {
        maxWidth: '435px',
        margin: '0px auto',
    },
    field: {
        marginBottom: '20px !important'
    },
    structuralUnitItem: {
        marginTop: '5px',
        marginRight: '5px',
    },
    structuralUnitsAddButton: {
        marginTop: '10px !important',
    },
    dialog: {
        padding: '40px',
    },
    title: {
        fontSize: '24px !important',
        textAlign: 'center',
    },
    emailHolder: {
        position: 'relative',
    },
    emailIcon: {
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-15px)',
        zIndex: 1000,
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
}));
