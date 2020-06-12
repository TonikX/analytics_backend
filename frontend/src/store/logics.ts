import SignInLogic from '../containers/SignIn/logics';
import SignUpLogic from '../containers/SignUp/logics';
import WorkProgramLogic from '../containers/WorkProgram/logics';
import CoursesLogic from '../containers/Courses/logics';
import LiteratureLogic from '../containers/Literature/logics';
import SubjectAreaLogic from '../containers/SubjectArea/logics';
import PrerequisitesLogic from '../containers/TrainingEntities/logics';
import CompetenceLogic from '../containers/Competences/logics';
import EducationalProgramLogic from '../containers/EducationalProgram/logics';
import IndicatorsLogic from '../containers/Indicators/logics';

export default [
    ...SignInLogic,
    ...SignUpLogic,
    ...WorkProgramLogic,
    ...CoursesLogic,
    ...LiteratureLogic,
    ...SubjectAreaLogic,
    ...PrerequisitesLogic,
    ...CompetenceLogic,
    ...EducationalProgramLogic,
    ...IndicatorsLogic,
];