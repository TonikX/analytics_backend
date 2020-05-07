import React from 'react';

// @ts-ignore
import Link from "react-router-dom/Link";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';

import AddIcon from "@material-ui/icons/Add";

import {FourthStepProps} from './types';
import {workProgramSectionFields, workProgramTopicFields} from "../enum";

import connect from './FourthStep.connect';
import styles from './FourthStep.styles';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import ThemeCreateModal from "./ThemeCreateModal";

class FourthStep extends React.PureComponent<FourthStepProps> {
    state = {
        isOpenCreateModal: false
    };

    handleCreateNewTopic = () => {
        this.setState({isOpenCreateModal: true});
    };

    closeCreateNewTopicModal = () => {
        this.setState({isOpenCreateModal: false});
    };

    handleClickDelete = () => {

    };

    handleClickEdit = () => {

    };

    render() {
        const {classes, sections} = this.props;
        const {isOpenCreateModal} = this.state;

        return (
            <div className={classes.topicsSection}>
                <div className={classes.topicsList}>
                    {sections.map(section =>
                        <Paper className={classes.paper} key={`4-part-section-${section.id}`}>
                            <List>
                                <ListItemText className={classes.headItem} primary={`
                                ${section[workProgramSectionFields.ORDINAL_NUMBER]}. ${section[workProgramSectionFields.NAME]}
                            `} />
                                <Divider />
                                {section[workProgramSectionFields.TOPICS].map(topic =>
                                    <>
                                        <div className={classes.item} key={`4-part-section-${section}-topic-${topic.id}`}>
                                            <div>
                                                <Typography>
                                                    {section[workProgramSectionFields.ORDINAL_NUMBER]}.
                                                    {topic[workProgramTopicFields.NUMBER]}. {topic[workProgramTopicFields.DESCRIPTION]}
                                                </Typography>

                                                <div className={classes.onlineCourseItem}>
                                                    <Typography>Онлайн курс: </Typography>&nbsp;
                                                    <Link to={"/"} className={classes.link}>
                                                        <Typography> название курса </Typography>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className={classes.actions}>
                                                <IconButton onClick={this.handleClickDelete}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton onClick={this.handleClickEdit}>
                                                    <EditIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {section[workProgramSectionFields.TOPICS].length === 0 &&
                                    <div className={classes.item}>
                                        <Typography> В разделе пока нет тем</Typography>
                                    </div>
                                }
                            </List>
                        </Paper>
                    )}
                </div>

                <Button color="primary"
                        variant="outlined"
                        className={classes.addIcon}
                        onClick={this.handleCreateNewTopic}
                >
                    <AddIcon/>
                    Добавить тему
                </Button>

                <ThemeCreateModal isOpen={isOpenCreateModal} handleClose={this.closeCreateNewTopicModal} />
            </div>
        );
    }
}

export default connect(withStyles(styles)(FourthStep));
