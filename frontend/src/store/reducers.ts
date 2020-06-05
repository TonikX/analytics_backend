import {combineReducers } from "redux";

import {GENERAL_PATH as signInPath, reducer as signInReducer, signInState} from "../containers/SignIn/reducer";
import {GENERAL_PATH as signUpPath, reducer as signUpReducer, signUpState} from "../containers/SignUp/reducer";

import {GENERAL_PATH as layoutPath, reducer as LayoutReducer} from "../layout/reducer";
import {layoutState} from "../layout/types";

import {GENERAL_PATH as coursesPath, reducer as CoursesReducer} from "../containers/Courses/reducer";
import {coursesState} from "../containers/Courses/types";

import {GENERAL_PATH as literaturePath, reducer as LiteratureReducer} from "../containers/Literature/reducer";
import {literatureState} from "../containers/Literature/types";

import {GENERAL_PATH as subjectAreaPath, reducer as SubjectAreaReducer} from "../containers/SubjectArea/reducer";
import {subjectAreaState} from "../containers/SubjectArea/types";

import {GENERAL_PATH as workProgramPath, reducer as workProgramReducer} from "../containers/WorkProgram/reducer";
import {workProgramState} from "../containers/WorkProgram/types";

export interface rootState {
    [signInPath]: signInState,
    [signUpPath]: signUpState,
    [workProgramPath]: workProgramState,
    [layoutPath]: layoutState,
    [coursesPath]: coursesState,
    [literaturePath]: literatureState,
    [subjectAreaPath]: subjectAreaState,
}

export default combineReducers({
    [signInPath]: signInReducer,
    [signUpPath]: signUpReducer,
    [workProgramPath]: workProgramReducer,
    [layoutPath]: LayoutReducer,
    [coursesPath]: CoursesReducer,
    [literaturePath]: LiteratureReducer,
    [subjectAreaPath]: SubjectAreaReducer,
});