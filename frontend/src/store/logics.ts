import SignInLogic from '../containers/SignIn/logics';
import SignUpLogic from '../containers/SignUp/logics';
import WorkProgramLogic from '../containers/WorkProgram/logics';
import CoursesLogic from '../containers/Courses/logics';
import LiteratureLogic from '../containers/Literature/logics';
import SubjectAreaLogic from '../containers/SubjectArea/logics';
import PrerequisitesLogic from '../containers/TrainingEntities/logics';
import CompetenceLogic from '../containers/Competences/logics';
import EducationalProgramLogic from '../containers/Direction/logics';
import IndicatorsLogic from '../containers/Indicators/logics';
import EducationalPlanLogic from '../containers/EducationalPlan/logics';
import EducationPlanInDirection from '../containers/EduationPlanInDirection/logics';
import WorkProgramList from '../containers/WorkProgramList/logics';
import EntityToEntity from '../containers/EntitityToEntitity/logics';
import ProfessionsLogic from '../containers/Professions/logics';

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
    ...EducationalPlanLogic,
    ...EducationPlanInDirection,
    ...WorkProgramList,
    ...EntityToEntity,
    ...ProfessionsLogic,
];