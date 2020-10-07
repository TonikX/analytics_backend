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

import {GENERAL_PATH as trainingEntitiesPath, reducer as TrainingEntitiesReducer} from "../containers/TrainingEntities/reducer";
import {trainingEntitiesState} from "../containers/TrainingEntities/types";

import {GENERAL_PATH as workProgramPath, reducer as workProgramReducer} from "../containers/WorkProgram/reducer";
import {workProgramState} from "../containers/WorkProgram/types";

import {GENERAL_PATH as competencePath, reducer as competenceReducer} from "../containers/Competences/reducer";
import {competenceState} from "../containers/Competences/types";

import {GENERAL_PATH as educationalProgramPath, reducer as educationalProgramReducer} from "../containers/Direction/reducer";
import {educationalProgramState} from "../containers/Direction/types";

import {GENERAL_PATH as indicatorsPath, reducer as indicatorsReducer} from "../containers/Indicators/reducer";
import {indicatorsState} from "../containers/Indicators/types";

import {GENERAL_PATH as educationalPlanPath, reducer as educationalPlanReducer} from "../containers/EducationalPlan/reducer";
import {educationalPlanState} from "../containers/EducationalPlan/types";

import {GENERAL_PATH as educationPlanInDirectionPath, reducer as educationPlanInDirectionReducer} from "../containers/EduationPlanInDirection/reducer";
import {educationalPlanInDirectionState} from "../containers/EduationPlanInDirection/types";

import {GENERAL_PATH as workProgramListPath, reducer as workProgramListReducer} from "../containers/WorkProgramList/reducer";
import {workProgramListState} from "../containers/WorkProgramList/types";

import {GENERAL_PATH as entityToEntityPath, reducer as entityToEntityReducer} from "../containers/EntitityToEntitity/reducer";
import {entityToEntityState} from "../containers/EntitityToEntitity/types";

import {GENERAL_PATH as professionsPath, reducer as professionsReducer} from "../containers/Professions/reducer";
import {professionsState} from "../containers/Professions/types";

export interface rootState {
    [professionsPath]: professionsState,
    [entityToEntityPath]: entityToEntityState,
    [signInPath]: signInState,
    [signUpPath]: signUpState,
    [workProgramPath]: workProgramState,
    [layoutPath]: layoutState,
    [coursesPath]: coursesState,
    [literaturePath]: literatureState,
    [subjectAreaPath]: subjectAreaState,
    [subjectAreaPath]: subjectAreaState,
    [trainingEntitiesPath]: trainingEntitiesState,
    [competencePath]: competenceState,
    [educationalProgramPath]: educationalProgramState,
    [indicatorsPath]: indicatorsState,
    [educationalPlanPath]: educationalPlanState,
    [educationPlanInDirectionPath]: educationalPlanInDirectionState,
    [workProgramListPath]: workProgramListState,
}

export default combineReducers({
    [professionsPath]: professionsReducer,
    [entityToEntityPath]: entityToEntityReducer,
    [signInPath]: signInReducer,
    [signUpPath]: signUpReducer,
    [workProgramPath]: workProgramReducer,
    [layoutPath]: LayoutReducer,
    [coursesPath]: CoursesReducer,
    [literaturePath]: LiteratureReducer,
    [subjectAreaPath]: SubjectAreaReducer,
    [trainingEntitiesPath]: TrainingEntitiesReducer,
    [competencePath]: competenceReducer,
    [educationalProgramPath]: educationalProgramReducer,
    [indicatorsPath]: indicatorsReducer,
    [educationalPlanPath]: educationalPlanReducer,
    [educationPlanInDirectionPath]: educationPlanInDirectionReducer,
    [workProgramListPath]: workProgramListReducer,
});