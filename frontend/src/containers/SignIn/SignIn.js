import React from 'react';
import {Redirect} from "react-router";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import get from 'lodash/get';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";

import * as Enum from './enum';

import connect from './SignIn.connect';
import styles from './SignIn.styles';

const userService = UserService.factory();

class SignIn extends React.PureComponent{
    componentWillUnmount() {
        this.props.actions.signInPageDown();
    }

    changeLogin = (e) => {
        this.props.actions.signInChangeField({destination: Enum.USERNAME_FIELD, value: get(e, 'target.value', '')})
    };

    changePassword = (e) => {
        this.props.actions.signInChangeField({destination: Enum.PASSWORD_FIELD, value: get(e, 'target.value', '')})
    };

    clickButtonHandler = () => {
        this.props.actions.signIn();
    };

    render() {
        const {classes, disableButton, auth} = this.props;
        const isAuth = userService.isAuth() && auth;

        if (isAuth) return <Redirect to={'work-program/2'} />;

        return(
            <div className={classes.root}>
                <div className={classes.form}>
                    <TextField label="Логин"
                               className={classes.textField}
                               onChange={this.changeLogin}
                    />
                    <TextField label="Пароль"
                               className={classes.textField}
                               type="password"
                               onChange={this.changePassword}
                    />
                    <Button color="primary"
                            variant="contained"
                            className={classes.button}
                            disabled={disableButton}
                            onClick={this.clickButtonHandler}
                    >
                        Войти
                    </Button>

                    <Typography className={classes.noAccount}>
                        Нет аккаунта?&nbsp;
                        <Link to={appRouter.getSignUpRoute()}
                              className={classes.link}>
                            Регистрация
                        </Link>
                    </Typography>
                </div>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    disableButton: PropTypes.bool,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(SignIn));