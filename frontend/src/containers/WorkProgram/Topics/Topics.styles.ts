import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    addIcon: {
        marginTop: '10px',
        marginLeft: 'auto !important',
        flex: 'none',
        marginBottom: '20px',
        width: 'fit-content',
    },
    topicsSection: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    topicsList: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    onlineCourseItem: {
        padding: '5px 35px',
        display: 'flex',
        alignItems: 'center'
    },
    link: {
        textDecoration: 'none'
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
        marginLeft: 'auto',
        padding: '0px 20px',
        '& button': {
            padding: '3px'
        }
    },
    sectionItem: {

    },
    sectionTitle: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        fontWeight: 500,
        color: theme.palette.primary.main,
        display: "flex",
        alignItems: 'center'
    },
    topicsSectionList: {

    },
    topicItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 0 0 20px',
        boxSizing: 'border-box',
        background: '#fff'
    },
    topic: {
        borderBottom: '1px solid #ccc',
        background: '#fff'
    },
    materials: {
        padding: '20px',
        background: '#f6f6f6',
        '& a': {
            color: theme.palette.primary.main
        }
    },
    materialItem: {
        display: 'flex',
        alignItems: 'center'
    },
    materialItemIcon: {
        cursor: 'pointer',
        marginLeft: '5px',
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    addMaterialButton: {
        padding: '0px !important',
        marginTop: '10px',
        '&:hover': {
            background: 'transparent !important'
        }
    },
    topicName: {
        width: '50%',
        minWidth: '300px'
    },
    bigTopicName: {
        width: 'calc(100% - 150px)'
    },
    sectionAddTopicIcon: {
        marginLeft: '10px',
        cursor: 'pointer'
    }
});
