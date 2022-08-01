import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Typography, TextField} from "@material-ui/core";
import get from "lodash/get";
import {getUserData} from "../../layout/getters";
import {isValidEmail} from "../../common/utils";
import {useStyles} from "./UserSettings.styles";
import actions from "./actions";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

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
    } = userData;

    const [emailValue, setEmailValue] = useState(email);
    const [notificationsAgree, setNotificationsAgree] = useState(do_email_notifications);
    const [commentsAgree, setCommentsAgree] = useState(expertise_comments_notification);
    const [statusAgree, setStatusAgree] = useState(expertise_status_notification);
    const [isValid, setValid] = useState(true);

    const disabled = (emailValue === email) && (do_email_notifications === notificationsAgree) && (
        expertise_status_notification === statusAgree) && expertise_comments_notification === commentsAgree;

    useEffect(() => {
        setEmailValue(email);
    }, [email, do_email_notifications, expertise_comments_notification, expertise_status_notification]);

    const setEmail = (event: ChangeEvent) => {
        const value = get(event, 'target.value', '').trim();
        setValid(true);
        setEmailValue(value);
    };

    const toggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = event.target.checked;
        console.log(value, key);
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
        if (isValidEmail(emailValue)) {
            dispatch(actions.updateUserEmail({
                email: emailValue,
                do_email_notifications: notificationsAgree,
                expertise_comments_notification: commentsAgree,
                expertise_status_notification: statusAgree
            }));
        } else {
            setValid(false);
        }
    };

    return (
        <Box className={classes.root}>
            <Typography className={classes.title}>
                Ваши данные
            </Typography>
            <Box component="form" className={classes.form}>
                <TextField label="Логин" value={username} className={classes.field} fullWidth disabled/>
                <TextField label="Email" error={!isValid} value={emailValue} onChange={setEmail} className={classes.field} fullWidth/>
                <TextField label="Имя" value={first_name} className={classes.field} fullWidth disabled/>
                <TextField label="Фамилия" value={last_name} className={classes.field} fullWidth disabled/>
                <TextField label="Номер группы" value={isu_number} className={classes.field} fullWidth disabled/>
                <FormControlLabel
                    control={<Checkbox checked={notificationsAgree} onChange={(event) => toggleCheckbox(event, 'agree')}/>}
                    label="Подписаться на информационные email-уведомления"
                />
                <FormControlLabel
                    control={<Checkbox checked={commentsAgree} onChange={(event) => toggleCheckbox(event, 'comments')}/>}
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
