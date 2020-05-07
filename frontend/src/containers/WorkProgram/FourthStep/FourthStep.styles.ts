import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    addIcon: {
        marginTop: '-15px',
        marginLeft: 'auto',
    },
    topicsSection: {
        display: 'flex',
        flexDirection: 'column'
    },
    topicsList: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        marginLeft: '25px',
        marginBottom: '25px',
        width: '700px',
    },
    headItem: {
        padding: '5px 20px',
        '& span': {
            fontWeight: "bold"
        }
    },
    item: {
        padding: '5px 20px',
        display: 'flex',
        justifyContent: "space-between"
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
        height: 'fit-content'
    }
});