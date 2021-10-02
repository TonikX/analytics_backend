import { createAction } from "@reduxjs/toolkit";

import { PersonalityActions } from "./types";

const getPersonality = createAction('GET_PERSONALITY')
const setPersonality = createAction('SET_PERSONALITY')
const updateGroups = createAction('UPDATE_GROUPS')

const actions: PersonalityActions = {
    getPersonality,
    setPersonality,
    updateGroups
}

export default actions;