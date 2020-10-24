import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AuthRoute from './hoc/AuthRoute'

import Layout from './layout';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import WorkProgram from './containers/WorkProgram';
import Courses from './containers/Courses';
import SubjectArea from './containers/SubjectArea';
import Prerequisites from './containers/TrainingEntities';
import Competences from './containers/Competences';
import EducationalProgram from './containers/Direction';
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

import SkillsProfessions from "./containers/SkillsProfessions";
import SkillsRoles from "./containers/SkillsRoles";

import Literature from './containers/Literature';

import Expertises from './containers/Expertises';
import Expertise from './containers/Expertises/Expertise';

import RouterService from './service/router-service';

const routerService = RouterService.factory();

export default () => (
    <Router>
        <Layout>
            <Switch>
                <Route path={routerService.getSignInRoute()}>
                    <SignIn />
                </Route>
                <Route path={routerService.getSignUpRoute()}>
                    <SignUp />
                </Route>
                <AuthRoute path={routerService.getCoursesRoute()}>
                    <Courses />
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
                <AuthRoute path={routerService.getEducationalProgramRoute()}>
                    <EducationalProgram />
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
                <AuthRoute path={routerService.getWorkProgramRoute()}
                           children={() => (
                               <Route
                                   render={({match}) => (
                                       <WorkProgram match={match}/>
                                   )}
                               />
                           )}
                />
                <AuthRoute path={routerService.getExpertiseRoute()}>
                    <Expertise />
                </AuthRoute>
                <AuthRoute path={routerService.getExpertisesRoute()}>
                    <Expertises />
                </AuthRoute>
                <AuthRoute path={routerService.getEducationPlanRoute()}>
                    <EducationalPlan />
                </AuthRoute>
            </Switch>
        </Layout>
    </Router>
);