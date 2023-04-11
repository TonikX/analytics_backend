import React from 'react';
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {appRouter} from "../../service/router-service";

import {useStyles} from './EmailFailPage.styles';

const EmailFailPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrap}>
            <div className={classes.block}>
                <Typography className={classes.title}>
                    Не удалось подтвердить адрес электронной почты
                </Typography>
                <Typography className={classes.description}>
                    Повторите попытку
                </Typography>
                <Button variant="contained"
                        color="primary"
                        className={classes.button}
                ><Link to={appRouter.getEducationPlanRoute()}> Перейти на главную </Link> </Button>
            </div>
        </div>
    );
}

export default EmailFailPage;
