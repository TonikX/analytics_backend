import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import get from "lodash/get";
import Typography from "@material-ui/core/Typography";
import {rootState} from "../../../store/reducers";

import {appRouter} from "../../../service/router-service";

import actions from "./actions";
import layoutActions from "../../../layout/actions";
import {getAllCount, getNotifications, getCurrentPage} from "./getters";
import {FULL_DATE_FORMAT_WITH_TIME} from "../../../common/utils";

import {useStyles} from './Notifications.styles'
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";

const colors = {
  expertise: 'orange',
  message: 'blue'
}

export default () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const notifications = useSelector((state: rootState) => getNotifications(state))
  const allCount = useSelector((state: rootState) => getAllCount(state))
  const currentPage = useSelector((state: rootState) => getCurrentPage(state))

  useEffect(() => {
    // eslint-disable-next-line
    dispatch(actions.getNotifications());
    dispatch(layoutActions.setUserNotificationsCount(0));
  }, []);

  const handleChangePage = (event: any | null, page: number) => {
    dispatch(actions.changeCurrentPage(page));
    dispatch(actions.getNotifications());
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Уведомления
      </Typography>
      <div className={classes.roundItem}>
        <div className={classes.round} style={{background: colors.expertise}}/>
        <Typography className={classes.roundText}> Экспертиза </Typography>
        <div className={classes.round} style={{background: colors.message}}/>
        <Typography className={classes.roundText}> Сообщение </Typography>
      </div>
      {notifications.map((item: any) => {
          if (item.expertise) {
            return (
              <Link className={classes.notificationItemLink}
                    to={appRouter.getExpertiseRouteLink(get(item, 'expertise.expertise.id', ''))}>
                <Typography className={classes.notificationItem} style={{borderRight: `5px solid ${colors.expertise}`}}>
                  <b> {moment(get(item, 'basic.notification_date')).format(FULL_DATE_FORMAT_WITH_TIME)} </b>
                  <br/>{get(item, 'expertise.message', '')} </Typography>
              </Link>
            )
          }

          return <Typography className={classes.notificationItem} style={{borderRight: `5px solid ${colors.message}`}}>
            <b> {moment(get(item, 'basic.notification_date')).format(FULL_DATE_FORMAT_WITH_TIME)} </b>
            <br/>{get(item, 'basic.message', '')} </Typography>
        }
      )}

      <div className={classes.footer}>
        <Pagination count={Math.ceil(allCount / 10)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
        />
      </div>
    </div>
  )
}