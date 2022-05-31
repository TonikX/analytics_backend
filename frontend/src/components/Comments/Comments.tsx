import React from 'react';
import moment from 'moment';
import Scrollbars from "react-custom-scrollbars";

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {CommentsProps} from './types';

import styles from './Comments.styles';
import get from "lodash/get";
import {CommentFields} from "./enum";
import {FULL_DATE_FORMAT, getUserFullName} from "../../common/utils";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import CommentIcon from "@material-ui/icons/CommentOutlined";

class Comments extends React.Component<CommentsProps> {
    state = {
        commentText: ''
    };

    sendComment = () => {
        this.props.sendNewComment(this.state.commentText);
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
        this.props.handleClick();
    }

    render() {
        const {classes, comments, isOpen} = this.props;
        const {commentText} = this.state;

        return (

            <>
                <Grow
                    in={isOpen}
                    {...(isOpen ? {timeout: 300} : {})}
                >
                    <Paper className={classes.comments}>
                        <div className={classes.root}>
                            <Scrollbars>
                                <div className={classes.commentList}>
                                    {comments.map(comment =>
                                        <div className={classes.comment}>
                                            <Typography className={classes.commentName}>
                                                {getUserFullName(comment[CommentFields.USER_EXPERTISE][CommentFields.EXPERT])}
                                            </Typography>
                                            <Typography
                                                className={classes.commentDate}>{moment(comment[CommentFields.DATE]).format(FULL_DATE_FORMAT)}</Typography>
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
                    </Paper>
                </Grow>
                <Fab color="secondary"
                     className={classes.commentButton}
                     onClick={this.props.handleClick}
                >
                    <CommentIcon className={isOpen ? classes.rotateIcon : ''}/>
                </Fab>
            </>
        );
    }
}

export default withStyles(styles)(Comments);
