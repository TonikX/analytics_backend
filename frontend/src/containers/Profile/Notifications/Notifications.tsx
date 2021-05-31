import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import get from "lodash/get";
import Typography from "@material-ui/core/Typography";
import { rootState } from "../../../store/reducers";

import { appRouter } from "../../../service/router-service";

import actions from "./actions";
import layoutActions from "../../../layout/actions";
import { getNotifications } from "./getters";
import {FULL_DATE_FORMAT_WITH_TIME} from "../../../common/utils";

import { useStyles } from './Notifications.styles'
import moment from "moment";

const colors = {
  expertise: 'orange',
  message: 'blue'
}

export default () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const notifications = useSelector((state: rootState) => getNotifications(state))

    useEffect(() => {
        // eslint-disable-next-line
        dispatch(actions.getNotifications());
        dispatch(layoutActions.setUserNotificationsCount(0));
    }, []);

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>
                Уведомления
            </Typography>
            <div className={classes.roundItem}>
                <div className={classes.round} style={{background: colors.expertise}} /> <Typography className={classes.roundText}> Экспертиза </Typography>
                <div className={classes.round} style={{background: colors.message}} /> <Typography className={classes.roundText}> Сообщение </Typography>
            </div>
            {notifications.map((item: any) => {
              if (item.expertise){
                return (
                  <Link className={classes.notificationItemLink} to={appRouter.getExpertiseRouteLink(get(item, 'expertise.expertise.id', ''))}>
                    <Typography className={classes.notificationItem} style={{borderRight: `5px solid ${colors.expertise}`}}> <b> {get(item, 'notification_date')} </b> <br/>{get(item, 'expertise.message', '')} </Typography>
                  </Link>
                )
              }

              return <Typography className={classes.notificationItem} style={{borderRight: `5px solid ${colors.message}`}}> <b> {get(item, 'notification_date')} </b> <br/>{get(item, 'basic.message', '')} </Typography>
            }
            )}
        </div>
    )
}