import {createLogic} from "redux-logic";
import emailWidgetActions from "./actions";
import actions from "../../layout/actions";
import Service from "./service";
import {fetchingTypes} from "./enum";

const service = new Service();

const sendEmail = createLogic({
    type: emailWidgetActions.sendEmail.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const {text, topic, users, send_to_all} = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SEND_EMAIL}));

        service.sendEmail(text, topic, users, send_to_all)
            .then(() => {
                dispatch(actions.fetchingSuccess(['Сообщение успешно отправлено']));
            })
            .catch(() => {
                dispatch(actions.fetchingFailed(['Не удалось отправить сообщение']));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SEND_EMAIL}));
                return done();
            });
    }
});

export default [
    sendEmail,
];
