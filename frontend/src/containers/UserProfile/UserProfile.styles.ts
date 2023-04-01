import {createStyles, makeStyles} from '@mui/styles';
import {PRIMARY} from '../../layout/themeMaterialUi';

export const useStyles = makeStyles(() => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        background: '#fff',
        minHeight: 'calc(100% - 44px)',
        display: 'flex',
        flexDirection: 'column'
    },
    rootHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        alignItems: 'baseline'
    },
    copyRpdContainer: {
        margin: '20px 0 40px',
    },
    link: {
        '& a': {
            textDecoration: 'none',
            color: PRIMARY
        }
    },
    title: {
        fontSize: '24px',
    },
    userTitle: {
        fontSize: '16px',
        marginBottom: '40px'
    },
    itemTitle: {
        fontSize: '16px',
        marginBottom: '4px'
    },
    userGroups: {
        maxWidth: '600px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    userGroup: {
        margin: '5px 5px 5px 0'
    },
    tableWrap: {
        height: 'calc(100% - 60px)',
        maxheight: 'calc(100% - 60px)',
        '& td': {
            padding: '5px 10px !important',
            fontSize: '14px'
        },
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
    },
}));
