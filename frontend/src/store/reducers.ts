import {combineReducers } from "redux";

import {GENERAL_PATH as signInPath, reducer as signInReducer, signInState} from "../containers/SignIn/reducer";
import {GENERAL_PATH as signUpPath, reducer as signUpReducer, signUpState} from "../containers/SignUp/reducer";

import {GENERAL_PATH as layoutPath, reducer as LayoutReducer} from "../layout/reducer";
import {layoutState} from "../layout/types";

// import {GENERAL_PATH as coursesPath, reducer as CoursesReducer} from "../containers/Courses/reducer";
// import {coursesState} from "../containers/Courses/types";

import {GENERAL_PATH as onlineCoursesPath, reducer as OnlineCoursesReducer} from "../containers/OnlineCourses/reducer";
import {coursesState as onlineCoursesState} from "../containers/OnlineCourses/types";

import {GENERAL_PATH as coursePath, reducer as CourseReducer} from "../containers/Course/reducer";
import {courseState as CourseState} from "../containers/Course/types";

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

import {GENERAL_PATH as directionPath, reducer as directionReducer} from "../containers/Direction/reducer";
import {directionState} from "../containers/Direction/types";

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

import {GENERAL_PATH as rolesPath, reducer as rolesReducer} from "../containers/Roles/reducer";
import {rolesState} from "../containers/Roles/types";

import {GENERAL_PATH as skillsProfessionsPath, reducer as skillsProfessionsReducer} from "../containers/SkillsProfessions/reducer";
import {professionsState as skillsProfessionsState} from "../containers/SkillsProfessions/types";

import {GENERAL_PATH as skillsRolesPath, reducer as skillsRolesReducer} from "../containers/SkillsRoles/reducer";
import {rolesState as skillsRolesState} from "../containers/SkillsRoles/types";

import {GENERAL_PATH as expertisesPath, reducer as expertisesReducer} from "../containers/Expertises/reducer";
import {expertisesState} from "../containers/Expertises/types";

import {GENERAL_PATH as educationalProgramPath, reducer as educationalProgramReducer} from "../containers/EducationalProgram/reducer";
import {educationalProgramState} from "../containers/EducationalProgram/types";

import {GENERAL_PATH as foldersPath, reducer as foldersReducer} from "../containers/Profile/Folders/reducer";
import {foldersState} from "../containers/Profile/Folders/types";

import {GENERAL_PATH as selectDisciplinePath, reducer as selectDisciplineReducer} from "../containers/SelectDiscipline/reducer";
import {selectDisciplineState} from "../containers/SelectDiscipline/types";

import {GENERAL_PATH as trainingModulesPath, reducer as trainingModulesReducer} from "../containers/EducationalPlan/TrainingModules/reducer";
import {trainingModulesState} from "../containers/EducationalPlan/TrainingModules/types";

import {GENERAL_PATH as selectEducationalProgramPath, reducer as selectEducationalProgramReducer} from "../containers/SelectEducationalProgram/reducer";
import {selectEducationalProgramState} from "../containers/SelectEducationalProgram/types"

import {GENERAL_PATH as individualTrajectoriesPath, reducer as individualTrajectoriesReducer} from "../containers/IndividualTrajectories/reducer";
import {individualTrajectoriesState} from "../containers/IndividualTrajectories/types"

export interface rootState {
    [individualTrajectoriesPath]: individualTrajectoriesState,
    [trainingModulesPath]: trainingModulesState,
    [foldersPath]: foldersState,
    [educationalProgramPath]: educationalProgramState,
    [expertisesPath]: expertisesState,
    [skillsRolesPath]: skillsRolesState,
    [skillsProfessionsPath]: skillsProfessionsState,
    [rolesPath]: rolesState,
    [professionsPath]: professionsState,
    [entityToEntityPath]: entityToEntityState,
    [signInPath]: signInState,
    [signUpPath]: signUpState,
    [workProgramPath]: workProgramState,
    [layoutPath]: layoutState,
    //[coursesPath]: coursesState,
    [onlineCoursesPath]: onlineCoursesState,
    [literaturePath]: literatureState,
    [subjectAreaPath]: subjectAreaState,
    [subjectAreaPath]: subjectAreaState,
    [trainingEntitiesPath]: trainingEntitiesState,
    [competencePath]: competenceState,
    [directionPath]: directionState,
    [indicatorsPath]: indicatorsState,
    [educationalPlanPath]: educationalPlanState,
    [educationPlanInDirectionPath]: educationalPlanInDirectionState,
    [workProgramListPath]: workProgramListState,
    [selectDisciplinePath]: selectDisciplineState,
    [selectEducationalProgramPath]: selectEducationalProgramState,
    [coursePath]: CourseState,
}

export default combineReducers({
    [individualTrajectoriesPath]: individualTrajectoriesReducer,
    [trainingModulesPath]: trainingModulesReducer,
    [selectDisciplinePath]: selectDisciplineReducer,
    [foldersPath]: foldersReducer,
    [educationalProgramPath]: educationalProgramReducer,
    [expertisesPath]: expertisesReducer,
    [skillsRolesPath]: skillsRolesReducer,
    [skillsProfessionsPath]: skillsProfessionsReducer,
    [rolesPath]: rolesReducer,
    [professionsPath]: professionsReducer,
    [entityToEntityPath]: entityToEntityReducer,
    [signInPath]: signInReducer,
    [signUpPath]: signUpReducer,
    [workProgramPath]: workProgramReducer,
    [layoutPath]: LayoutReducer,
    //[coursesPath]: CoursesReducer,
    [onlineCoursesPath]: OnlineCoursesReducer,
    [literaturePath]: LiteratureReducer,
    [subjectAreaPath]: SubjectAreaReducer,
    [trainingEntitiesPath]: TrainingEntitiesReducer,
    [competencePath]: competenceReducer,
    [directionPath]: directionReducer,
    [indicatorsPath]: indicatorsReducer,
    [educationalPlanPath]: educationalPlanReducer,
    [educationPlanInDirectionPath]: educationPlanInDirectionReducer,
    [workProgramListPath]: workProgramListReducer,
    [selectEducationalProgramPath]: selectEducationalProgramReducer,
    [coursePath]: CourseReducer,
});