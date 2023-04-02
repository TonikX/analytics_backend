 import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AuthRoute from './hoc/AuthRoute'

import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import WorkProgram from './containers/WorkProgram';
import Courses from './containers/Courses';
import Course from './containers/Course';
import SubjectArea from './containers/SubjectArea';
import Prerequisites from './containers/TrainingEntities';
import Competences from './containers/Competences';
import Indicators from './containers/Competences/Indicators';
import Direction from './containers/Direction';
import TrainingModules from './containers/EducationalPlan/TrainingModules';
import TrainingModuleDetail from './containers/EducationalPlan/TrainingModules/DetailTrainingModule';
import EducationalPlan from './containers/EducationalPlan';
import EducationPlanInDirection from './containers/EduationPlanInDirection';
import EducationPlanDetail from './containers/EducationalPlan/Detail';
import WorkProgramList from "./containers/WorkProgramList";
import EntitityToEntitity from "./containers/EntitityToEntitity";
import Professions from "./containers/Professions";
import Roles from "./containers/Roles";
import ProfessionSkills from "./containers/Professions/Skills";
import RolesSkills from "./containers/Roles/Skills";
import EducationalProgram from "./containers/EducationalProgram";
import EducationalProgramCharacteristic from "./containers/EducationalProgram/Characteristic";
import Records from "./containers/Records";

import SkillsProfessions from "./containers/SkillsProfessions";
import SkillsRoles from "./containers/SkillsRoles";

import Literature from './containers/Literature';

import Expertises from './containers/Expertises';
import Expertise from './containers/Expertises/Expertise';

import Folders from "./containers/Profile/Folders";

import NotFoundPage from "./containers/NotFoundPage";
import ForbiddenPage from "./containers/ForbiddenPage";

import SelectDiscipline from "./containers/SelectDiscipline";
import SelectEducationalProgram from './containers/SelectEducationalProgram';
import IndividualTrajectories from './containers/IndividualTrajectories';
import IndividualEducationalPlans from './containers/IndividualEducationalPlans';

import ProfessionalStandards from './containers/ProfessionalStandards';
import ProfessionalStandard from "./containers/ProfessionalStandards/ProfessionalStandard";
import StructuralUnits from './containers/StructuralUnits';
import StructuralUnit from './containers/StructuralUnits/StructuralUnit';

import Layout from "./layout";

import RouterService from './service/router-service';
import Notifications from "./containers/Profile/Notifications";
import Overview from "./containers/Overview";
import Landing from "./containers/Landing";
 import UserSettings from "./containers/UserSettings";
import UserProfile from "./containers/UserProfile";
import DodProfile from "./containers/DodProfile";

import EducationalStandards from "./containers/EducationalStandards";
import EducationalStandard from "./containers/EducationalStandards/EducationalStandard";

import PracticeList from "./containers/Practice/PracticeList";
import Practice from "./containers/Practice";
import FinalCertification from "./containers/FinalCertification";
import FinalCertificationList from "./containers/FinalCertification/CertificationList";
import AcademicPlanUpdate from "./containers/AcademicPlanUpdate";

 import EmailSuccessPage from "./containers/EmailSuccessPage";
 import EmailFailPage from "./containers/EmailFailPage";

const routerService = RouterService.factory();

export default () => (
    <Router>
        <Layout>
            <Routes>
              <Route path={routerService.getCoursesRoute()} element={<AuthRoute><Courses /></AuthRoute>} />
              <Route path={routerService.getCourseRoute()} element={<AuthRoute><Course /></AuthRoute>} />
              <Route path={routerService.getOverviewRoute()} element={<AuthRoute><Overview /></AuthRoute>} />
              <Route path={routerService.getSelectDisciplineRoute()} element={<AuthRoute><SelectDiscipline /></AuthRoute>} />
              <Route path={routerService.getProfessionalStandardRoute(':id')} element={<AuthRoute><ProfessionalStandard /></AuthRoute>} />
              <Route path={routerService.getProfessionalStandardsRoute()} element={<AuthRoute><ProfessionalStandards /></AuthRoute>} />
              <Route path={routerService.getEducationalStandardRoute(':id')} element={<AuthRoute><EducationalStandard /></AuthRoute>} />
              <Route path={routerService.getEducationalStandardsRoute()} element={<AuthRoute><EducationalStandards /></AuthRoute>} />
              <Route path={routerService.getStructuralUnitRoute()} element={<AuthRoute><StructuralUnit /></AuthRoute>} />
              <Route path={routerService.getStructuralUnitsRoute()} element={<AuthRoute><StructuralUnits /></AuthRoute>} />
              <Route path={routerService.getIndividualTrajectoriesRoute()} element={<AuthRoute><IndividualTrajectories /></AuthRoute>} />
              <Route path={routerService.getIndividualEducationalPlansRoute()} element={<AuthRoute><IndividualEducationalPlans /></AuthRoute>} />
              <Route path={routerService.getNotificationsRoute()} element={<AuthRoute><Notifications /></AuthRoute>} />
              <Route path={routerService.getUserProfile()} element={<AuthRoute><UserProfile /></AuthRoute>} />
              <Route path={routerService.getSelectEducationalProgramRoute()} element={<AuthRoute><SelectEducationalProgram /></AuthRoute>} />
              <Route path={routerService.getFoldersRoute()} element={<AuthRoute><Folders /></AuthRoute>} />
              <Route path={routerService.getCoursesRoute()} element={<AuthRoute><Courses /></AuthRoute>} />
              <Route path={routerService.getCourseRoute()} element={<AuthRoute><Course /></AuthRoute>} />
              <Route path={routerService.getLiteratureRoute()} element={<AuthRoute><Literature /></AuthRoute>} />
              <Route path={routerService.getSubjectAreaRoute()} element={<AuthRoute><SubjectArea /></AuthRoute>} />
              <Route path={routerService.getTrainingEntitiesRoute()} element={<AuthRoute><Prerequisites /></AuthRoute>} />
              <Route path={routerService.getCompetenceIndicatorsRoute()} element={<AuthRoute><Indicators /></AuthRoute>} />
              <Route path={routerService.getCompetencesRoute()} element={<AuthRoute><Competences /></AuthRoute>} />
              <Route path={routerService.getDirectionRoute()} element={<AuthRoute><Direction /></AuthRoute>} />
              <Route path={routerService.getRecordsRoute()} element={<AuthRoute><Records /></AuthRoute>} />
              <Route path={routerService.getEntityToEntityRoute()} element={<AuthRoute><EntitityToEntitity /></AuthRoute>} />
              <Route path={routerService.getProfessionsRoute()} element={<AuthRoute><Professions /></AuthRoute>} />
              <Route path={routerService.getRolesRoute()} element={<AuthRoute><Roles /></AuthRoute>} />
              <Route path={routerService.getSkillsRolesRoute()} element={<AuthRoute><SkillsRoles /></AuthRoute>} />
              <Route path={routerService.getSkillsProfessionsRoute()} element={<AuthRoute><SkillsProfessions /></AuthRoute>} />
              <Route path={routerService.getSkillsProfessionsRoute()} element={<AuthRoute><SkillsProfessions /></AuthRoute>} />
              <Route path={routerService.getEducationalProgramCharacteristic()} element={<AuthRoute><EducationalProgramCharacteristic /></AuthRoute>} />
              <Route path={routerService.getEducationalProgram()} element={<AuthRoute><EducationalProgram /></AuthRoute>} />
              <Route path={routerService.getEducationPlanInDirectionRoute()} element={<AuthRoute><EducationPlanInDirection /></AuthRoute>} />
              <Route path={routerService.getWorkProgramListRoute()} element={<AuthRoute><WorkProgramList /></AuthRoute>} />
              <Route path={routerService.getWorkProgramRoute()} element={<AuthRoute><WorkProgram /></AuthRoute>} />
              <Route path={routerService.getExpertiseRoute()} element={<AuthRoute><Expertise /></AuthRoute>} />
              <Route path={routerService.getExpertisesRoute()} element={<AuthRoute><Expertises /></AuthRoute>} />
              <Route path={routerService.getEducationPlanRoute()} element={<AuthRoute><EducationalPlan /></AuthRoute>} />
              <Route path={routerService.getTrainingModuleDetailRoute()} element={<AuthRoute><TrainingModuleDetail /></AuthRoute>} />
              <Route path={routerService.getSelectDisciplineRoute()} element={<AuthRoute><SelectDiscipline /></AuthRoute>} />
              <Route path={routerService.getProfessionalStandardIDRoute(':id')} element={<AuthRoute><ProfessionalStandard /></AuthRoute>} />
              <Route path={routerService.getProfessionalStandardsRoute()} element={<AuthRoute><ProfessionalStandards /></AuthRoute>} />
              <Route path={routerService.getEducationalStandardsRoute()} element={<AuthRoute><EducationalStandards /></AuthRoute>} />
              <Route path={routerService.getStructuralUnitRoute()} element={<AuthRoute><StructuralUnit /></AuthRoute>} />
              <Route path={routerService.getStructuralUnitsRoute()} element={<AuthRoute><StructuralUnits /></AuthRoute>} />
              <Route path={routerService.getIndividualTrajectoriesRoute()} element={<AuthRoute><IndividualTrajectories /></AuthRoute>} />
              <Route path={routerService.getIndividualEducationalPlansRoute()} element={<AuthRoute><IndividualEducationalPlans /></AuthRoute>} />
              <Route path={routerService.getNotificationsRoute()} element={<AuthRoute><Notifications /></AuthRoute>} />
              <Route path={routerService.getUserProfile()} element={<AuthRoute><UserProfile /></AuthRoute>} />
              <Route path={routerService.getUserSettings()} element={<AuthRoute><UserSettings /></AuthRoute>} />
              <Route path={routerService.getSelectEducationalProgramRoute()} element={<AuthRoute><SelectEducationalProgram /></AuthRoute>} />
              <Route path={routerService.getFoldersRoute()} element={<AuthRoute><Folders /></AuthRoute>} />
              <Route path={routerService.getCoursesRoute()} element={<AuthRoute><Courses /></AuthRoute>} />
              <Route path={routerService.getLiteratureRoute()} element={<AuthRoute><Literature /></AuthRoute>} />
              <Route path={routerService.getSubjectAreaRoute()} element={<AuthRoute><SubjectArea /></AuthRoute>} />
              <Route path={routerService.getTrainingEntitiesRoute()} element={<AuthRoute><Prerequisites /></AuthRoute>} />
              <Route path={routerService.getCompetenceIndicatorsRoute()} element={<AuthRoute><Indicators /></AuthRoute>} />
              <Route path={routerService.getCompetencesRoute()} element={<AuthRoute><Competences /></AuthRoute>} />
              <Route path={routerService.getDirectionRoute()} element={<AuthRoute><Direction /></AuthRoute>} />
              <Route path={routerService.getRecordsRoute()} element={<AuthRoute><Records /></AuthRoute>} />
              <Route path={routerService.getEntityToEntityRoute()} element={<AuthRoute><EntitityToEntitity /></AuthRoute>} />
              <Route path={routerService.getProfessionsRoute()} element={<AuthRoute><Professions /></AuthRoute>} />
              <Route path={routerService.getRolesRoute()} element={<AuthRoute><Roles /></AuthRoute>} />
              <Route path={routerService.getSkillsRolesRoute()} element={<AuthRoute><SkillsRoles /></AuthRoute>} />
              <Route path={routerService.getSkillsProfessionsRoute()} element={<AuthRoute><SkillsProfessions /></AuthRoute>} />
              <Route path={routerService.getEducationalProgramCharacteristic()} element={<AuthRoute><EducationalProgramCharacteristic /></AuthRoute>} />
              <Route path={routerService.getEducationalProgram()} element={<AuthRoute><EducationalProgram /></AuthRoute>} />
              <Route path={routerService.getEducationPlanInDirectionRoute()} element={<AuthRoute><EducationPlanInDirection /></AuthRoute>} />
              <Route path={routerService.getWorkProgramListRoute()} element={<AuthRoute><WorkProgramList /></AuthRoute>} />
              <Route path={routerService.getWorkProgramRoute()} element={<AuthRoute><WorkProgram /></AuthRoute>} />
              <Route path={routerService.getAcademicPlanUpdateRoute()} element={<AuthRoute><AcademicPlanUpdate /></AuthRoute>} />
              <Route path={routerService.getExpertiseRoute()} element={<AuthRoute><Expertise /></AuthRoute>} />
              <Route path={routerService.getExpertisesRoute()} element={<AuthRoute><Expertises /></AuthRoute>} />
              <Route path={routerService.getEducationPlanRoute()} element={<AuthRoute><EducationalPlan /></AuthRoute>} />
              <Route path={routerService.getTrainingModuleDetailRoute()} element={<AuthRoute><TrainingModuleDetail /></AuthRoute>} />
              <Route path={routerService.getTrainingModulesRoute()} element={<AuthRoute><TrainingModules /></AuthRoute>} />
              <Route path={routerService.getDodProfileRoute()} element={<AuthRoute><DodProfile /></AuthRoute>} />
              <Route path={routerService.getPracticeListRoute()} element={<AuthRoute><PracticeList /></AuthRoute>} />
              <Route path={routerService.getPracticeRoute()} element={<AuthRoute><Practice /></AuthRoute>} />
              <Route path={routerService.getFinalCertificationRoute()} element={<AuthRoute><FinalCertification /></AuthRoute>} />
              <Route path={routerService.getFinalCertificationListRoute()} element={<AuthRoute><FinalCertificationList /></AuthRoute>} />


              {/*<Route path={routerService.getCourseRoute()} element={<AuthRoute>*/}
              {/*  /!*<EducationPlanDetail match={match} trajectoryRoute /> // TODO match + откомментировать ?? *!/*/}
              {/*  <EducationPlanDetail trajectoryRoute />*/}
              {/*</AuthRoute>} />*/}
              {/*    <AuthRoute path={routerService.getEducationPlanDetailRoute()}*/}
              {/*               children={() => (*/}
              {/*                   <Route*/}
              {/*                       render={({match}) => (*/}
              {/*                           <EducationPlanDetail match={match}/>*/}
              {/*                       )}*/}
              {/*                   />*/}
              {/*               )}*/}
              {/*    />*/}
              {/*    <AuthRoute path={routerService.getProfessionSkillsRoute()}*/}
              {/*               children={() => (*/}
              {/*                   <Route*/}
              {/*                       render={({match}) => (*/}
              {/*                           <ProfessionSkills match={match}/>*/}
              {/*                       )}*/}
              {/*                   />*/}
              {/*               )}*/}
              {/*    />*/}
              {/*<AuthRoute path={routerService.getEducationPlanDetailRoute()}*/}
              {/*           children={() => (*/}
              {/*               <Route*/}
              {/*                   render={({match}) => (*/}
              {/*                       <EducationPlanDetail match={match}/>*/}
              {/*                   )}*/}
              {/*               />*/}
              {/*           )}*/}
              {/*/>*/}
              {/*<AuthRoute path={routerService.getProfessionSkillsRoute()}*/}
              {/*           children={() => (*/}
              {/*               <Route*/}
              {/*                   render={({match}) => (*/}
              {/*                       <ProfessionSkills match={match}/>*/}
              {/*                   )}*/}
              {/*               />*/}
              {/*           )}*/}
              {/*/>*/}

              {/*<AuthRoute path={routerService.getRolesSkillsRoute()}*/}
              {/*           children={() => (*/}
              {/*           <Route*/}
              {/*               render={({match}) => (*/}
              {/*                    <RolesSkills match={match} />*/}
              {/*               )}*/}
              {/*           />*/}
              {/*    )}*/}
              {/*/>*/}
              {/*    <AuthRoute path={routerService.getRolesSkillsRoute()}*/}
              {/*               children={() => (*/}
              {/*                   <Route*/}
              {/*                       render={({match}) => (*/}
              {/*                           <RolesSkills match={match}/>*/}
              {/*                       )}*/}
              {/*                   />*/}
              {/*               )}*/}
              {/*    />*/}
              {/*<Route exact element={<NotFoundPage/>} />*/}
              <Route path={routerService.getEmailConfirmFail()} element={<EmailFailPage/>} />
              <Route path={routerService.getEmailConfirmSuccess()} element={<EmailSuccessPage/>} />
              <Route path={routerService.getForbiddenPage()} element={<ForbiddenPage/>} />
              <Route path={routerService.getSignInRoute()} element={<SignIn/>} />
              <Route path={routerService.getSignUpRoute()} element={<SignUp/>} />
              <Route path="/" element={<Landing/>} />
            </Routes>
        </Layout>
    </Router>
);
