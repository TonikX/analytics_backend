import * as React from "react";
import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {
    Dialog, Button, Chip, DialogTitle, DialogContent, TextField, Box, Checkbox, FormControlLabel
} from "@material-ui/core";
import actions from "./actions";
import UserSelector from "./UserSelector";
import {useStyles} from "./EmailWidget.styles";

type SelectItem = {
    label: string;
    value: string;
}

export const EmailWidget = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [isOpen, setOpen] = useState(false);
    const [topic, setTopic] = useState('');
    const [text, setText] = useState('');
    const [sendToAll, setSendToAll] = useState(false);
    const [users, setUsers] = useState([] as SelectItem[]);

    const clearData = () => {
        setText('');
        setTopic('');
        setUsers([]);
        setSendToAll(false);
    };

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
        clearData();
    };

    const sendEmails = () => {
        dispatch(actions.sendEmail({send_to_all: sendToAll, topic, text, users: users.map(it => it.value)}));
        closeDialog();
    };

    const addRecipient = (item: {value: string, label: string}) => {
        if (item.value && item.label) {
            setUsers([...users, item]);
        }
    };

    const removeRecipient = (item: {value: string, label: string}) => {
        setUsers(users.filter(it => it.value !== item.value));
    };

    const checkCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setSendToAll(checked);
    };

    const someFieldsAreEmpty = !text.trim() || !topic.trim() || (!users.length && !sendToAll);

    return <Box>
        <Button variant="outlined" color="primary" onClick={openDialog}>Email-рассылка</Button>
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Email-рассылка</DialogTitle>
            <DialogContent className={classes.emailModal}>
                <UserSelector
                    handleChange={addRecipient}
                    selectorLabel="Добавить получателя"
                    noMargin
                />
                {
                    users.length ? <div className={classes.recipients}>
                        {users.map((item, index) => <Chip key={index} className={classes.chip} onDelete={() => removeRecipient(item)} label={item.label}/>)}
                    </div> : null
                }
                <FormControlLabel
                    control={<Checkbox checked={sendToAll} onChange={checkCheckbox} />}
                    label="Отправить всем"
                />
                <TextField
                    label="Тема сообщения"
                    variant="outlined"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    fullWidth
                    className={classes.marginTop}
                />
                <TextField
                    label="Текст сообщения"
                    variant="outlined"
                    fullWidth
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                    multiline
                    className={classes.marginTop}
                />
                <div className={classes.footer}>
                    <Button color="primary" disabled={someFieldsAreEmpty} onClick={sendEmails}>Отправить</Button>
                    <Button color="secondary" onClick={closeDialog}>Отмена</Button>
                </div>
            </DialogContent>
        </Dialog>
    </Box>
};
