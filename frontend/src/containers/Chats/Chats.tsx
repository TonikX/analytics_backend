import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';
import PeopleIcon from '@material-ui/icons/People';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from "@material-ui/core/Fab";
import classNames from "classnames";
import moment from "moment";
import {FULL_DATE_FORMAT, FULL_DATE_FORMAT_WITH_TIME, parseJwt} from "../../common/utils";
import Button from "@material-ui/core/Button";
import get from "lodash/get";
import {chatsProps} from "./types";
import connect from "./Chats.connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./Chats.styles";
import UserService from "../../service/user-service";
import IconButton from "@material-ui/core/IconButton";
import UserSelector from "../Profile/UserSelector/UserSelector";
import {config} from "../../config/app-config";

const userService = UserService.factory();

class Chats extends React.Component<chatsProps> {
    state = {
        messageText: '',
        ws: new WebSocket(`wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self`),
        userId: 0,
        anchorEl: null,
    }

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    parseUserId() {
        const accessToken = userService.getToken();

        if (!accessToken) {
            return [];
        }

        const userId: number = parseJwt(accessToken).user_id;
        this.state.userId = userId;
    }

    loadMessages(conversationId: number) {
        this.parseUserId();
        this.props.actions.getMessages(conversationId);
        this.state.ws = new WebSocket(`ws://${config.apiHost}${config.apiPort ? ":" + config.apiPort : ""}/ws/chat/${this.state.userId}/${conversationId}/`);
        this.state.ws.onopen = (event) => {
            // ws.send(JSON.stringify(apiCall));
        };

        this.state.ws.onmessage = (event) => {
            this.props.actions.addMessage(JSON.parse(event.data));
            this.props.actions.markMessageAsRead(conversationId)
            // @ts-ignore
            window.document.querySelector('#bottomElement').scrollIntoView();
        };
    }

    sendChatMessage = () => () => {
        this.state.ws.send(JSON.stringify({message: this.state.messageText}));
    }

    handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.messageText = get(event, 'target.value', '');
    }

    showMembers(event: any, conversationId: number) {
        this.setState({anchorEl: event.currentTarget});
    }

    handleAddingMember = (userId: number, conversationId: number) => {
        this.props.actions.addUserToConversation({conversationId, userId})
    }

    removeUser = (userId: number, conversationId: number) => {
        this.props.actions.removeUserFromConversation({conversationId, userId})
    }

    render() {
        const {classes, unreadMessages} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <Grid container component={Paper} className={classes.chatSection}>
                    <Grid item xs={3} className={classes.borderRight500}>
                        <List>
                            {this.props.conversations.map((conversation: any) =>
                                <ListItem button key={conversation.id}
                                          onClick={() => this.loadMessages(conversation.id)}>
                                    <ListItemIcon>
                                        {
                                            unreadMessages.indexOf(conversation.id) !== -1 ?
                                            <Badge badgeContent={1} color="primary">
                                                <Avatar alt={conversation.conversation_name}
                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCS7vms5q16Sbz-mo0IB3lYZ2tmLQALhgn3Q&usqp=CAU"/>
                                            </Badge> :
                                                <Avatar alt={conversation.conversation_name}
                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCS7vms5q16Sbz-mo0IB3lYZ2tmLQALhgn3Q&usqp=CAU"/>
                                        }
                                    </ListItemIcon>
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <Grid item xs={12}>
                                                <ListItemText
                                                    primary={conversation.conversation_name}>{conversation.conversation_name}</ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText
                                                    secondary={(conversation.members ? conversation.members.length : 0) + ' участника'}></ListItemText>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Grid item xs={12} className={classes.membersIcon} onClick={(event) => {
                                                event.stopPropagation();
                                                event.preventDefault();
                                                return this.showMembers(event, conversation.id)
                                            }
                                            }>
                                                <IconButton aria-label="manage">
                                                    <PeopleIcon/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Menu
                                            id="long-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={this.handleClose}
                                        >
                                            {conversation.members?.map((member: any) => (
                                                <MenuItem key={member}
                                                          className={classes.memberItem}>
                                                    <p>
                                                        {member.user.first_name} {member.user.last_name}
                                                    </p>
                                                    <IconButton aria-label="leave"
                                                                onClick={() => this.removeUser(member.user.id, conversation.id)}>
                                                        <CloseIcon/>
                                                    </IconButton>
                                                </MenuItem>
                                            ))}
                                            <Divider></Divider>
                                            <MenuItem className='mt-2'>
                                                <UserSelector
                                                    onClick={(event: any) => event.stopImmediatePropagation()}
                                                    handleChange={(event: any) => this.handleAddingMember(event, conversation.id)}
                                                    selectorLabel="Выберите пользователя"
                                                    label="Выберите пользователя"
                                                    noMargin
                                                />
                                            </MenuItem>
                                        </Menu>
                                        <Grid item xs={2}>
                                            <Grid item xs={12} className={classes.membersIcon} onClick={(event) => {
                                                event.stopPropagation();
                                                event.preventDefault();

                                                return this.showMembers(event, conversation.id)
                                            }
                                            }>
                                                <IconButton aria-label="leave">
                                                    <CloseIcon/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                    <Grid item xs={9}>
                        <List className={classes.messageArea}>
                            {this.props.messages.map((message: any) => {
                                    return message.user.id != this.state.userId ?
                                        (<ListItem key="1" button>
                                            <ListItemIcon>
                                                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCS7vms5q16Sbz-mo0IB3lYZ2tmLQALhgn3Q&usqp=CAU"/>
                                            </ListItemIcon>
                                            <Grid container
                                                  className={classNames(classes.chatBubble, classes["chatBubble--right"])}>
                                                <Grid item xs={12}>
                                                    <ListItemText
                                                        secondary={message.user.first_name + " " + message.user.last_name}
                                                        classes={{secondary: classes.blueColor}}></ListItemText>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <ListItemText primary={message.text}></ListItemText>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <ListItemText
                                                        secondary={moment(message.sent_datetime).format(FULL_DATE_FORMAT_WITH_TIME)}></ListItemText>
                                                </Grid>
                                            </Grid>
                                        </ListItem>) : (<ListItem key="3" className={classes.outgoingMessage}>
                                                <Grid container
                                                      className={classNames(classes.chatBubble, classes["chatBubble--left"])}>
                                                    <Grid item xs={12}>
                                                        <ListItemText primary={message.text}></ListItemText>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <ListItemText
                                                            secondary={moment(message.sent_datetime).format(FULL_DATE_FORMAT_WITH_TIME)}
                                                            classes={{secondary: classes.whiteColor}}></ListItemText>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        )
                                }
                            )}
                            <div id={'bottomElement'}/>
                        </List>
                        <Divider/>
                        <Grid container style={{padding: '20px'}}>
                            <Grid item xs={11}>
                                <TextField id="outlined-basic-email" onChange={this.handleChange()}
                                           label="Type Something" fullWidth/>
                            </Grid>
                            <Grid item xs={1}>
                                <Button onClick={this.sendChatMessage()}>
                                    <Fab color="primary" aria-label="add"><SendIcon/></Fab>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(withStyles(styles)(Chats));