import {combineReducers, createStore } from "redux";

import {GENERAL_PATH as signInPath, reducer as signInReducer, signInState} from "../containers/SignIn/reducer";
import {GENERAL_PATH as signUpPath, reducer as signUpReducer, signUpState} from "../containers/SignUp/reducer";

import {GENERAL_PATH as layoutPath, reducer as LayoutReducer} from "../layout/reducer";
import {layoutState} from "../layout/types";

import {GENERAL_PATH as coursesPath, reducer as CoursesReducer} from "../containers/Courses/reducer";
import {coursesState} from "../containers/Courses/types";

import {GENERAL_PATH as workProgramPath, reducer as workProgramReducer} from "../containers/WorkProgram/reducer";
import {workProgramState} from "../containers/WorkProgram/types";

export interface rootState {
    [signInPath]: signInState,
    [signUpPath]: signUpState,
    [workProgramPath]: workProgramState,
    [layoutPath]: layoutState,
    [coursesPath]: coursesState,
}

export default combineReducers({
    [signInPath]: signInReducer,
    [signUpPath]: signUpReducer,
    [workProgramPath]: workProgramReducer,
    [layoutPath]: LayoutReducer,
    [coursesPath]: CoursesReducer,
});