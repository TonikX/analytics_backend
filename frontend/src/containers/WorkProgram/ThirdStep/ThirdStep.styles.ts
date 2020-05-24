import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    addIcon: {
        marginTop: '30px',
        marginLeft: 'auto',
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
        marginLeft: 'auto'
    },
    sectionItem: {

    },
    sectionTitle: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        //@ts-ignore
        fontWeight: '500',
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
        height: '50px'
    },
    topicName: {
        width: '40%',
        minWidth: '300px'
    },
    sectionAddTopicIcon: {
        marginLeft: '10px',
        cursor: 'pointer'
    }
});