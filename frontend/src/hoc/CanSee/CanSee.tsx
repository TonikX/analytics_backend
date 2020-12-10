import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {withRouter} from "react-router-dom";
import {appRouter} from '../../service/router-service';

const CanSee = (props: any) => {
    // const isCanSeePage = availableGroup(currentGroups);
    //
    // if (!isCanSeePage) return <Redirect to={appRouter.getForbiddenPage()} />;
    console.log('props', props);

    return (
        <>
            {props.children}
        </>
    );
};

export default withRouter(CanSee);