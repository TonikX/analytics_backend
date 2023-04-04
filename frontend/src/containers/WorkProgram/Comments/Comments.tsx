import React from 'react';
import moment from 'moment';
import Scrollbars from "react-custom-scrollbars-2";

import {withStyles} from '@mui/styles';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {CommentsProps} from './types';

import connect from './Comments.connect';
import styles from './Comments.styles';
import get from "lodash/get";
import {CommentFields} from "../enum";
import {FULL_DATE_FORMAT, getUserFullName} from "../../../common/utils";

class Comments extends React.Component<CommentsProps> {
    state = {
        commentText: ''
    };

    componentDidMount() {
        this.getComments();
    }

    componentDidUpdate(prevProps: Readonly<CommentsProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.currentStep !== prevProps.currentStep && this.props.workProgramExpertiseId){
            this.getComments();
        }
    }

    getComments = () => {
        this.props.actions.getComments(this.props.currentStep);
    }

    sendComment = () => {
        this.props.actions.createComment({
            currentStep: this.props.currentStep,
            comment: this.state.commentText
        });
        this.clearTextInput();
    }

    handleChangeCommentText = (event: React.ChangeEvent) => {
        this.setState({
            commentText: get(event, 'target.value', '')
        });
    }

    clearTextInput = () => {
        this.setState({
            commentText: ''
        });
        this.props.closeComments();
    }

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {comments} = this.props;
        const {commentText} = this.state;

        return (
            <div className={classes.root}>
                <Scrollbars>
                    <div className={classes.comments}>
                        {comments.map(comment =>
                            <div className={classes.comment}>
                                <Typography className={classes.commentName}>
                                    {getUserFullName(comment[CommentFields.USER_EXPERTISE][CommentFields.EXPERT])}
                                </Typography>
                                <Typography className={classes.commentDate}>{moment(comment[CommentFields.DATE]).format(FULL_DATE_FORMAT)}</Typography>
                                <Typography className={classes.commentText}>
                                    {comment[CommentFields.TEXT]}
                                </Typography>
                            </div>
                        )}
                    </div>
                </Scrollbars>
                <div className={classes.commentTextFieldWrap}>
                    <TextField fullWidth
                               variant="outlined"
                               onChange={this.handleChangeCommentText}
                               value={commentText}
                               multiline
                               rows={2}
                               rowsMax={5}
                    />
                    <div className={classes.commentTextFieldButtons}>
                        <Button onClick={this.clearTextInput}>Отменить</Button>
                        <Button onClick={this.sendComment}
                                disabled={commentText.length === 0}
                                variant="contained"
                                color="primary"
                        >Отправить</Button>
                    </div>
                </div>
            </div>
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(Comments));
