import React from "react";
import withStyles from "@mui/material/styles/withStyles";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import styles from "./styles";
import {WithStyles} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {appRouter} from "../../service/router-service";

export interface ErrorPageProps extends WithStyles<typeof styles>, RouteComponentProps {

}

class ErrorPage extends React.Component<ErrorPageProps> {

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root} component="div">
                <Typography variant='h3'>
                    Что-то пошло не так. Перезагрузите страницу или зайдите позже.
                </Typography>
                <Typography variant='h4' className={classes.link}>
                    <Link to={appRouter.getEducationPlanRoute()}>
                        На главную
                    </Link>
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(withRouter(ErrorPage))