import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import get from "lodash/get";
import Typography from "@material-ui/core/Typography";
import { rootState } from "../../../store/reducers";

import { appRouter } from "../../../service/router-service";

import actions from "./actions";
import { getNotifications } from "./getters";

import { useStyles } from './Notifications.styles'

export default () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const notifications = useSelector((state: rootState) => getNotifications(state))

    useEffect(() => {
        // eslint-disable-next-line
        dispatch(actions.getNotifications());
    }, []);

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>
                Уведомления
            </Typography>
            <div className={classes.roundItem}>
                <div className={classes.round} /> <Typography className={classes.roundText}> Экспертиза </Typography>
            </div>
            {notifications.map((item: any) =>
                <Link className={classes.notificationItemLink} to={appRouter.getExpertiseRouteLink(get(item, 'expertise.expertise.id', ''))}>
                    <Typography className={classes.notificationItem}> <b> 10.04.2021 17:14 </b> <br/>{get(item, 'expertise.message', '')} </Typography>
                </Link>
            )}
        </div>
    )
}