import React from 'react';

import Scrollbars from "react-custom-scrollbars";

// @ts-ignore
import Link from "react-router-dom/Link";

import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";

import {FourthStepProps} from './types';
import {fields, workProgramSectionFields, workProgramTopicFields} from "../enum";
import {CourseFields} from "../../Courses/enum";

import ThemeCreateModal from "./ThemeCreateModal";

import connect from './ThirdStep.connect';
import styles from './ThirdStep.styles';

class ThirdStep extends React.PureComponent<FourthStepProps> {
    handleCreateNewTopic = () => {
        this.props.actions.openDialog({dialogType: fields.CREATE_NEW_TOPIC_DIALOG, data: {}});
    };

    handleCreateNewTopicOnSection = (sectionId: number) => () => {
        this.props.actions.openDialog({dialogType: fields.CREATE_NEW_TOPIC_DIALOG, data: {[workProgramTopicFields.SECTION]: sectionId}});
    };

    handleClickDelete = (id: string) => () => {
        this.props.actions.deleteTopic(id);
    };

    handleClickEdit = (topic: any) => () => {
        this.props.actions.openDialog({dialogType: fields.CREATE_NEW_TOPIC_DIALOG, data: topic});
    };

    render() {
        const {classes, sections} = this.props;
        return (
            <div className={classes.topicsSection}>
                <Scrollbars>
                    <div className={classes.topicsList}>
                    {sections.map(section => (
                        <div className={classes.sectionItem}>
                            <Typography className={classes.sectionTitle}>
                                {section[workProgramSectionFields.ORDINAL_NUMBER]}. {section[workProgramSectionFields.NAME]}

                                <AddCircleIcon className={classes.sectionAddTopicIcon}
                                               onClick={this.handleCreateNewTopicOnSection(section[workProgramSectionFields.ID])}
                                />
                            </Typography>

                            <div className={classes.topicsSectionList}>
                                {section[workProgramSectionFields.TOPICS].length === 0 &&
                                    <div>
                                        <div className={classes.topic}>
                                            <Typography className={classes.topicName}>
                                                В этом разделе пока не создано тем
                                            </Typography>
                                        </div>
                                    </div>
                                }
                                {section[workProgramSectionFields.TOPICS].map(topic =>
                                    <div className={classes.topic}>
                                        <DragIndicatorIcon style={{cursor: "pointer"}}/>

                                        <Typography className={classes.topicName}>
                                            {section[workProgramSectionFields.ORDINAL_NUMBER]}.
                                            {topic[workProgramTopicFields.NUMBER]}. {topic[workProgramTopicFields.DESCRIPTION]}
                                        </Typography>

                                        <div className={classes.onlineCourseItem}>
                                            {topic[workProgramTopicFields.COURSE] && <>
                                                <Typography>Онлайн курс: </Typography>&nbsp;
                                                <Link to={topic[workProgramTopicFields.COURSE][CourseFields.COURSE_URL]} className={classes.link}>
                                                    <Typography> {topic[workProgramTopicFields.COURSE][CourseFields.TITLE]} </Typography>
                                                </Link>
                                            </>}
                                        </div>

                                        <div className={classes.actions}>
                                            <IconButton onClick={this.handleClickDelete(topic[workProgramTopicFields.ID])}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={this.handleClickEdit(topic)}>
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                </Scrollbars>

                <Fab color="secondary"
                     className={classes.addIcon}
                     onClick={this.handleCreateNewTopic}
                >
                    <AddIcon/>
                </Fab>

                <ThemeCreateModal />
            </div>
        );
    }
}

export default connect(withStyles(styles)(ThirdStep));
