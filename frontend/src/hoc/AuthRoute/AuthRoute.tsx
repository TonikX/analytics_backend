import React from "react";
import { connect } from "react-redux";
import {Route, Navigate} from 'react-router-dom';
import {appRouter} from '../../service/router-service';
import {userService} from "../../service/user-service";

const AuthRoute = ({children}: any) => {
    const isAuth = userService.isAuth();

    if (!isAuth) return <Navigate to={appRouter.getSignInRoute()} />;

    return children;
};

export default connect()(AuthRoute);