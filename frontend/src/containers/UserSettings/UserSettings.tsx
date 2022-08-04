import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Typography, TextField} from "@material-ui/core";
import VerifiedIcon from '@material-ui/icons/CheckCircle';
import NotVerifiedIcon from '@material-ui/icons/Close';
import get from "lodash/get";
import {getUserData} from "../../layout/getters";
import {isValidEmail} from "../../common/utils";
import {useStyles} from "./UserSettings.styles";
import actions from "./actions";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

export default () => {
    const classes = useStyles();
    const userData = useSelector(getUserData);
    const dispatch = useDispatch();

    const {
        username = '',
        email = '',
        last_name = '',
        first_name = '',
        isu_number = '',
        do_email_notifications = false,
        expertise_comments_notification = false,
        expertise_status_notification = false,
        email_confirm_status: verified,
    } = userData;

    const [emailValue, setEmailValue] = useState(email);
    const [notificationsAgree, setNotificationsAgree] = useState(do_email_notifications);
    const [commentsAgree, setCommentsAgree] = useState(expertise_comments_notification);
    const [statusAgree, setStatusAgree] = useState(expertise_status_notification);
    const [isValid, setValid] = useState(true);

    const emailChanged = emailValue !== email;
    const disabled = !emailChanged && (do_email_notifications === notificationsAgree) && (
        expertise_status_notification === statusAgree) && expertise_comments_notification === commentsAgree;

    useEffect(() => {
        setEmailValue(email);
        setNotificationsAgree(do_email_notifications);
        setStatusAgree(expertise_status_notification);
        setCommentsAgree(expertise_comments_notification);
    }, [email, do_email_notifications, expertise_comments_notification, expertise_status_notification]);

    const setEmail = (event: ChangeEvent) => {
        const value = get(event, 'target.value', '').trim();
        setValid(true);
        setEmailValue(value);
    };

    const toggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = event.target.checked;
        switch (key) {
            case 'agree': {
                setNotificationsAgree(value);
                break;
            }
            case 'comments': {
                setCommentsAgree(value);
                break;
            }
            case 'status': {
                setStatusAgree(value);
                break;
            }
        }
    };

    const resetEmail = () => {
        setValid(true);
        setCommentsAgree(expertise_comments_notification);
        setStatusAgree(expertise_status_notification);
        setNotificationsAgree(do_email_notifications);
        setEmailValue(email);
    };

    const saveEmail = () => {
        if (emailChanged) {
            if (isValidEmail(emailValue)) {
                dispatch(actions.updateUserEmail({
                    email: emailValue,
                }));
            } else {
                setValid(false);
            }
        }

        dispatch(actions.updateUserData({
            email: emailValue,
            do_email_notifications: notificationsAgree,
            expertise_comments_notification: commentsAgree,
            expertise_status_notification: statusAgree
        }));
    };

    const VerificationSign = () => {
        const title = verified ? "Почта подтверждена" : "Почта не подтверждена";
        return (
            <Tooltip title={title}>
                {
                    verified ? <VerifiedIcon color="secondary" className={classes.emailIcon}/> : <NotVerifiedIcon color="secondary" className={classes.emailIcon}/>
                }
            </Tooltip>
        )
    };

    return (
        <Box className={classes.root}>
            <Typography className={classes.title}>
                Ваши данные
            </Typography>
            <Box component="form" className={classes.form}>
                <TextField label="Логин" value={username} className={classes.field} fullWidth disabled/>
                <Box className={classes.emailHolder}>
                    <VerificationSign/>
                    <TextField label="Email" error={!isValid} value={emailValue} onChange={setEmail}
                               className={classes.field} fullWidth/>
                </Box>
                <TextField label="Имя" value={first_name} className={classes.field} fullWidth disabled/>
                <TextField label="Фамилия" value={last_name} className={classes.field} fullWidth disabled/>
                <TextField label="Номер группы" value={isu_number} className={classes.field} fullWidth disabled/>
                <FormControlLabel
                    control={<Checkbox checked={notificationsAgree}
                                       onChange={(event) => toggleCheckbox(event, 'agree')}/>}
                    label="Подписаться на информационные email-уведомления"
                />
                <FormControlLabel
                    control={<Checkbox checked={commentsAgree}
                                       onChange={(event) => toggleCheckbox(event, 'comments')}/>}
                    label="Подписаться на комментарии к РПД"
                />
                <FormControlLabel
                    control={<Checkbox checked={statusAgree} onChange={(event) => toggleCheckbox(event, 'status')}/>}
                    label="Подписаться на обновления статусов РПД"
                    className={classes.field}
                />
                <Box className={classes.footer}>
                    <Button variant="contained" color="primary" onClick={saveEmail} disabled={disabled}>
                        Сохранить
                    </Button>
                    <Button variant="outlined" color="primary" onClick={resetEmail}>Отмена</Button>
                </Box>
            </Box>
        </Box>
    )
};
