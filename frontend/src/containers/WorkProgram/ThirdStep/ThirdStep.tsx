import React from 'react';

import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
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

    onSortEnd = (sectionIndex: number) => ({newIndex, oldIndex}: any) => {
        const {sections} = this.props;
        const currentSection = sections[sectionIndex];
        const sectionTopics = currentSection[workProgramSectionFields.TOPICS];
        const currentTopic = sectionTopics[oldIndex];

        this.props.actions.changeTopicNumber({topicId: currentTopic[workProgramTopicFields.ID], newNumber: newIndex + 1});
    }

    handleClickEdit = (topic: any) => () => {
        this.props.actions.openDialog({dialogType: fields.CREATE_NEW_TOPIC_DIALOG, data: topic});
    };

    render() {
        const {classes, sections} = this.props;
        return (
            <div className={classes.topicsSection}>
                <Scrollbars>
                    <div className={classes.topicsList}>
                    {sections.map((section, index: number) => (
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
                                <SortableList section={section}
                                              useDragHandle={true}
                                              hideSortableGhost={false}
                                              onSortEnd={this.onSortEnd(index)}
                                              handleClickDelete={this.handleClickDelete}
                                              handleClickEdit={this.handleClickEdit}
                                              classes={classes}
                                />
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


const DragHandle = SortableHandle(() => <DragIndicatorIcon style={{cursor: "pointer"}}/>);

// @ts-ignore
const SortableItem = SortableElement(({topic, section, classes, handleClickDelete, handleClickEdit}) =>
    <div className={classes.topic}>
        <DragHandle />

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
            <IconButton onClick={handleClickDelete(topic[workProgramTopicFields.ID])}>
                <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleClickEdit(topic)}>
                <EditIcon />
            </IconButton>
        </div>
    </div>
);

// @ts-ignore
const SortableList = SortableContainer(({section, classes, handleClickDelete, handleClickEdit}) => {
    return (<div>
                {section[workProgramSectionFields.TOPICS].map((topic: any, index: number) =>
                    <SortableItem key={`item-${topic.id}`}
                                  index={index}
                                  topic={topic}
                                  section={section}
                                  classes={classes}
                                  handleClickDelete={handleClickDelete}
                                  handleClickEdit={handleClickEdit}
                    />
                )}
            </div>
    );
});


export default connect(withStyles(styles)(ThirdStep));
