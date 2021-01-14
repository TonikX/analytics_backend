import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import {appRouter} from '../../service/router-service';
import {userService} from "../../service/user-service";

const AuthRoute = (props: any) => {
    const isAuth = userService.isAuth();

    if (!isAuth) return <Redirect to={appRouter.getSignInRoute()} />;

    return <Route exact {...props} />;
};

export default connect()(AuthRoute);