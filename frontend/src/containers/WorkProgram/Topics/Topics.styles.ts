import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    addIcon: {
        marginTop: '10px',
        marginLeft: 'auto',
        flex: 'none',
        marginBottom: '20px',
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
    topic: {
        display: 'flex',
        borderBottom: '1px solid #ccc',
        alignItems: 'center',
        padding: '0 0 0 20px',
        boxSizing: 'border-box',
        background: '#fff'
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