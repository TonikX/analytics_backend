import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import AuthRoute from './hoc/AuthRoute'

import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import WorkProgram from './containers/WorkProgram';
import Courses from './containers/Courses';
import Course from './containers/Course';
import SubjectArea from './containers/SubjectArea';
import Prerequisites from './containers/TrainingEntities';
import Competences from './containers/Competences';
import Direction from './containers/Direction';
import TrainingModules from './containers/EducationalPlan/TrainingModules';
import TrainingModuleDetail from './containers/EducationalPlan/TrainingModules/DetailTrainingModule';
import EducationalPlan from './containers/EducationalPlan';
import EducationPlanInDirection from './containers/EduationPlanInDirection';
import EducationPlanDetail from './containers/EducationalPlan/Detail';
import Indicators from './containers/Indicators';
import WorkProgramList from "./containers/WorkProgramList";
import EntitityToEntitity from "./containers/EntitityToEntitity";
import Professions from "./containers/Professions";
import Roles from "./containers/Roles";
import ProfessionSkills from "./containers/Professions/Skills";
import RolesSkills from "./containers/Roles/Skills";
import EducationalProgram from "./containers/EducationalProgram";
import EducationalProgramCharacteristic from "./containers/EducationalProgram/Characteristic";

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
import StructuralUnits from './containers/StructuralUnits';
import StructuralUnit from './containers/StructuralUnits/StructuralUnit';

import Layout from "./layout";

import RouterService from './service/router-service';

const routerService = RouterService.factory();

export default () => (
    <Router>
        <Layout>
            <Switch>
            <Redirect exact from="/" to={routerService.getEducationPlanRoute()} />

            <AuthRoute path={routerService.getCoursesRoute()}>
                <Courses />
            </AuthRoute>
            <AuthRoute path={routerService.getCourseRoute()}>
                <Course />
            </AuthRoute>

            <AuthRoute path={routerService.getTrajectoryPlanDetailRoute()}
                       children={() => (
                           <Route
                               render={({match}) => (
                                   <EducationPlanDetail match={match} trajectoryRoute />
                               )}
                           />
                       )}
            />

            <Route path={routerService.getSignInRoute()}>
                <SignIn />
            </Route>
            <Route path={routerService.getSignUpRoute()}>
                <SignUp />
            </Route>
            <AuthRoute path={routerService.getSelectDisciplineRoute()}>
                <SelectDiscipline />
            </AuthRoute>
            <AuthRoute path={routerService.getProfessionalStandardsRoute()}>
                <ProfessionalStandards />
            </AuthRoute>
            <AuthRoute path={routerService.getStructuralUnitRoute()}>
                <StructuralUnit />
            </AuthRoute>
            <AuthRoute path={routerService.getStructuralUnitsRoute()}>
                <StructuralUnits />
            </AuthRoute>
            <AuthRoute path={routerService.getIndividualTrajectoriesRoute()}>
                <IndividualTrajectories />
            </AuthRoute>
            <AuthRoute path={routerService.getIndividualEducationalPlansRoute()}>
                <IndividualEducationalPlans />
            </AuthRoute>
            <AuthRoute path={routerService.getSelectEducationalProgramRoute()}>
                <SelectEducationalProgram />
            </AuthRoute>
            <AuthRoute path={routerService.getFoldersRoute()}>
                <Folders />
            </AuthRoute>
            <AuthRoute path={routerService.getCoursesRoute()}>
                <Courses />
            </AuthRoute>
            <AuthRoute path={routerService.getCourseRoute()}>
                <Course />
            </AuthRoute>
            <AuthRoute path={routerService.getLiteratureRoute()}>
                <Literature />
            </AuthRoute>
            <AuthRoute path={routerService.getSubjectAreaRoute()}>
                <SubjectArea />
            </AuthRoute>
            <AuthRoute path={routerService.getTrainingEntitiesRoute()}>
                <Prerequisites />
            </AuthRoute>
            <AuthRoute path={routerService.getCompetencesRoute()}>
                <Competences />
            </AuthRoute>
            <AuthRoute path={routerService.getDirectionRoute()}>
                <Direction />
            </AuthRoute>
            <AuthRoute path={routerService.getEntityToEntityRoute()}>
                <EntitityToEntitity />
            </AuthRoute>
            <AuthRoute path={routerService.getProfessionSkillsRoute()}
                       children={() => (
                           <Route
                               render={({match}) => (
                                   <ProfessionSkills match={match}/>
                               )}
                           />
                       )}
            />
            <AuthRoute path={routerService.getProfessionsRoute()}>
                <Professions />
            </AuthRoute>
            <AuthRoute path={routerService.getRolesSkillsRoute()}
                       children={() => (
                       <Route
                           render={({match}) => (
                                <RolesSkills match={match} />
                           )}
                       />
                )}
            />
            <AuthRoute path={routerService.getRolesRoute()}>
                <Roles />
            </AuthRoute>
            <AuthRoute path={routerService.getSkillsRolesRoute()}>
                <SkillsRoles />
            </AuthRoute>
            <AuthRoute path={routerService.getSkillsProfessionsRoute()}>
                <SkillsProfessions />
            </AuthRoute>
            <AuthRoute path={routerService.getIndicatorsRoute()}>
                <Indicators />
            </AuthRoute>
            <AuthRoute path={routerService.getEducationalProgramCharacteristic()}>
                <EducationalProgramCharacteristic />
            </AuthRoute>
            <AuthRoute path={routerService.getEducationalProgram()}>
                <EducationalProgram />
            </AuthRoute>
            <AuthRoute path={routerService.getEducationPlanDetailRoute()}
                       children={() => (
                           <Route
                               render={({match}) => (
                                   <EducationPlanDetail match={match}/>
                               )}
                           />
                       )}
            />
            <AuthRoute path={routerService.getEducationPlanInDirectionRoute()}>
                <EducationPlanInDirection />
            </AuthRoute>
            <AuthRoute path={routerService.getWorkProgramListRoute()}>
                <WorkProgramList />
            </AuthRoute>
            <AuthRoute path={routerService.getWorkProgramRoute()}>
                <WorkProgram />
            </AuthRoute>
            <AuthRoute path={routerService.getExpertiseRoute()}>
                <Expertise />
            </AuthRoute>
            <AuthRoute path={routerService.getExpertisesRoute()}>
                <Expertises />
            </AuthRoute>
            <AuthRoute path={routerService.getEducationPlanRoute()}>
                <EducationalPlan />
            </AuthRoute>
            <AuthRoute path={routerService.getTrainingModuleDetailRoute()}>
                <TrainingModuleDetail />
            </AuthRoute>
            <AuthRoute path={routerService.getTrainingModulesRoute()}>
                <TrainingModules />
            </AuthRoute>
            <Route path={routerService.getForbiddenPage()}>
                <ForbiddenPage />
            </Route>
            <Route exact>
                <NotFoundPage />
            </Route>
        </Switch>
        </Layout>
    </Router>
);