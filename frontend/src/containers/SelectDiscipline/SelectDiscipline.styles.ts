import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',
        minHeight: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        '& .ReactVirtualized__Grid': {
            outline: 'none !important'
        }
    },
    title: {
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    row: {
        display: 'flex',
        alignItems: 'center'
    },
    slider: {
        maxWidth: '300px',
        margin: '0px 20px'
    },
    whiteButton: {
        background: 'white !important'
    },
    keywordListItem: {
        cursor: 'pointer',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    keywordTitle: {
        lineHeight: 1.2,
        paddingBottom: '5px',
        paddingTop: '5px'
    },
    iconButton: {
        width: '30px',
        height: '30px',
        marginRight: '10px'
    },
    subtitle: {
        marginBottom: '20px',
        marginTop: '20px'
    },
    allKeywordsList: {
        width: '50%',
        height: '100%',
        borderRight: '1px solid #ccc',
        padding: '30px',
        boxSizing: 'border-box'
    },
    selectedKeywordsList: {
        width: '50%',
        padding: '30px',
        boxSizing: 'border-box'
    },
    keywordsLists: {
        height: '400px',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '20px',
        maxWidth: '1000px'
    },
    addIcon: {
        color: theme.palette.primary.main,
    },
    removeIcon: {
        color: theme.palette.secondary.main,
    },
    getWPButton: {
        width: 'fit-content'
    },
    wp: {
        display: 'flex',
        alignItems: 'center',
        height: '30px',
        cursor: 'pointer',
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.primary.main,
        },
        textDecoration: 'none'
    },
    wpCode: {
        width: '110px',
        fontWeight: 'bold'
    },
    searchKeysButton: {
        minHeight: '34px',
        marginTop: '20px'
    },
    sliderWrap: {
        width: '42%',
        padding: '0px 50px',
    }
});