import React from 'react';
import {Link} from "react-router-dom";

import {withStyles} from '@mui/styles';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {ForbiddenPageProps} from './types';
import {appRouter} from "../../service/router-service";

import img from './cancel.svg';

import styles from './ForbiddenPage.styles';

const ForbiddenPage = ({classes}: ForbiddenPageProps) => {
    return (
        <div className={classes.wrap}>
            <div className={classes.block}>
                <img className={classes.image} src={img} alt="" />
                <Typography className={classes.title}>
                    403 - доступ запрещен
                </Typography>
                <Typography className={classes.description}>
                    К сожалению, у вас нет прав на просмотр <br/> данной страницы.
                </Typography>
                <Button variant="contained"
                        color="primary"
                        className={classes.button}
                ><Link to={appRouter.getEducationPlanRoute()}> Перейти на главную </Link> </Button>
            </div>
        </div>
    );
}

export default withStyles(styles)(ForbiddenPage);
