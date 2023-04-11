import React from 'react';
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {appRouter} from "../../service/router-service";

import {useStyles} from './EmailSuccessPage.styles';

const EmailSuccessPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrap}>
            <div className={classes.block}>
                <Typography className={classes.title}>
                    Адрес электронной почты успешно подтвержден
                </Typography>
                <Typography className={classes.description}>
                    Теперь вы сможете получать на неё информационные уведомления
                </Typography>
                <Button variant="contained"
                        color="primary"
                        className={classes.button}
                ><Link to={appRouter.getEducationPlanRoute()}> Перейти на главную </Link> </Button>
            </div>
        </div>
    );
}

export default EmailSuccessPage;
