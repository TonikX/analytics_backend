import {rootState} from "../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH} from "./reducer";
import {chatsState} from "./types";

export const getStateData = (state: rootState): chatsState => get(state, GENERAL_PATH);

export const getConversationList = (state: rootState): Array<any> => get(getStateData(state), "conversations", [])
export const getMessages = (state: rootState): Array<any> => get(getStateData(state), "messages", [])
export const getUnreadMessages = (state: rootState): Array<any> => get(getStateData(state), "unreadMessages", [])
