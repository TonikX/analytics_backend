import React from "react";
import { connect } from "react-redux";
import {Route, Navigate} from 'react-router-dom';
import {appRouter} from '../../service/router-service';
import {userService} from "../../service/user-service";

const AuthRoute = (props: any) => {
    const isAuth = userService.isAuth();

    if (!isAuth) return <Navigate to={appRouter.getSignInRoute()} />;

    return <Route exact {...props} />;
};

export default connect()(AuthRoute);