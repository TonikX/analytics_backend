import SignInLogic from '../containers/SignIn/logics';
import SignUpLogic from '../containers/SignUp/logics';
import WorkProgramLogic from '../containers/WorkProgram/logics';
import CoursesLogic from '../containers/Courses/logics';
import CourseLogic from '../containers/Course/logics';
import LiteratureLogic from '../containers/Literature/logics';
import SubjectAreaLogic from '../containers/SubjectArea/logics';
import PrerequisitesLogic from '../containers/TrainingEntities/logics';
import CompetenceLogic from '../containers/Competences/logics';
import DirectionsLogic from '../containers/Direction/logics';
import IndicatorsLogic from '../containers/Indicators/logics';
import EducationalPlanLogic from '../containers/EducationalPlan/logics';
import EducationPlanInDirection from '../containers/EduationPlanInDirection/logics';
import WorkProgramList from '../containers/WorkProgramList/logics';
import EntityToEntity from '../containers/EntitityToEntitity/logics';
import ProfessionsLogic from '../containers/Professions/logics';
import RolesLogic from '../containers/Roles/logics';
import SkillsProfessionsLogic from '../containers/SkillsProfessions/logics';
import SkillsRolesLogic from '../containers/SkillsRoles/logics';
import ExpertisesLogic from '../containers/Expertises/logics';
import SelectDisciplineLogic from '../containers/SelectDiscipline/logics';
import EducationalProgramLogic from '../containers/EducationalProgram/logics';
import FoldersLogic from '../containers/Profile/Folders/logics';
import SelectEducationalProgramLogic from '../containers/SelectEducationalProgram/logics'
import TrainingModulesLogic from '../containers/EducationalPlan/TrainingModules/logics';
import IndividualTrajectoriesLogic from '../containers/IndividualTrajectories/logics';
import ProfessionalStandardsLogic from '../containers/ProfessionalStandards/logics';

import GeneralLogic from '../layout/logics';

export default [
    ...ProfessionalStandardsLogic,
    ...IndividualTrajectoriesLogic,
    ...TrainingModulesLogic,
    ...SelectDisciplineLogic,
    ...FoldersLogic,
    ...GeneralLogic,
    ...SignInLogic,
    ...SignUpLogic,
    ...WorkProgramLogic,
    ...CoursesLogic,
    ...LiteratureLogic,
    ...SubjectAreaLogic,
    ...PrerequisitesLogic,
    ...CompetenceLogic,
    ...DirectionsLogic,
    ...IndicatorsLogic,
    ...EducationalPlanLogic,
    ...EducationPlanInDirection,
    ...WorkProgramList,
    ...EntityToEntity,
    ...ProfessionsLogic,
    ...RolesLogic,
    ...SkillsProfessionsLogic,
    ...SkillsRolesLogic,
    ...ExpertisesLogic,
    ...EducationalProgramLogic,
    ...SelectEducationalProgramLogic,
    ...CourseLogic,
];