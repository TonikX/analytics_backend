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

import Literature from './containers/Literature';

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
                <AuthRoute path={routerService.getPrerequisitesRoute()}>
                    <Prerequisites />
                </AuthRoute>
                <AuthRoute path={routerService.getCompetencesRoute()}>
                    <Competences />
                </AuthRoute>
                <AuthRoute path={routerService.getWorkProgramRoute()}
                       children={() => (
                           <Route
                               render={({match}) => (
                                   <WorkProgram match={match}/>
                               )}
                           />
                       )      }
                />
            </Switch>
        </Layout>
    </Router>
);