import React from 'react';
import {Link} from "react-router-dom";

import withStyles from '@material-ui/core/styles/withStyles';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {NotFoundProps} from './types';

import img from './404-error.svg';

import styles from './NotFound.styles';
import {appRouter} from "../../service/router-service";

const NotFoundPage = ({classes}: NotFoundProps) => {
    return (
        <div className={classes.wrap}>
            <div className={classes.block}>
                <img className={classes.image} src={img} alt="" />
                <Typography className={classes.title}>
                    Страница не найдена
                </Typography>
                <Typography className={classes.description}>
                    Возможно, запрашиваемая вами страница была <br/> перенесена или удалена.
                </Typography>
                <Button variant="contained"
                        color="primary"
                        className={classes.button}
                ><Link to={appRouter.getEducationPlanRoute()}> Перейти на главную </Link> </Button>
            </div>
        </div>
    );
}

export default withStyles(styles)(NotFoundPage);
