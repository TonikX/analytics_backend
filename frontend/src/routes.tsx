import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Layout from './layout';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import WorkProgram from './containers/WorkProgram';
import Courses from './containers/Courses';
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
                <Route path={routerService.getCoursesRoute()}>
                    <Courses />
                </Route>
                <Route path={routerService.getLiteratureRoute()}>
                    <Literature />
                </Route>
                <Route path={routerService.getWorkProgramRoute()}
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