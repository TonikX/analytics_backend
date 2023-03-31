import React from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from "react-router";
import PropTypes from "prop-types";
import get from "lodash/get";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography  from '@mui/material/Typography';
import withStyles from '@mui/material/styles/withStyles';

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";

import * as Enum from './enum';

import connect from './SignUp.connect';
import styles from './SignUp.styles';

const userService = UserService.factory();

class SignUp extends React.PureComponent{
    state = {
        passwordFieldIsFocused: false
    };

    componentWillUnmount() {
        this.props.actions.signUpPageDown();
    }

    changeField = (destination) => (e) => {
        this.props.actions.signUpChangeField({destination, value: get(e, 'target.value', '')})
    };

    clickButtonHandler = () => {
        this.props.actions.signUp();
    };

    passwordFieldFocus = () => {
        this.setState({passwordFieldIsFocused: true});
    };

    passwordFieldBlur = () => {
        this.setState({passwordFieldIsFocused: false});
    };

    render() {
        const {classes, disableButton, isPasswordError, auth,
            username, firstName, lastName, password, passwordRepeat } = this.props;
        const {passwordFieldIsFocused} = this.state;
        const showPasswordError = isPasswordError && !passwordFieldIsFocused;

        const isAuth = userService.isAuth() && auth;

        if (isAuth) return <Redirect to={appRouter.getEducationPlanRoute()} />;

        return(
            <div className={classes.root}>
                <div className={classes.form}>
                    <div className={classes.tabs}>
                        <Link to={appRouter.getSignInRoute}>
                            <Typography>
                                    Вход
                            </Typography>
                        </Link>
                        <Typography className={classes.activeTab}>
                            Регистрация
                        </Typography>
                    </div>

                    <TextField label="Логин"
                               className={classes.textField}
                               onChange={this.changeField(Enum.USERNAME_FIELD)}
                               value={username}
                    />
                    <TextField label="Имя"
                               className={classes.textField}
                               onChange={this.changeField(Enum.FIRST_NAME_FIELD)}
                               value={firstName}
                    />
                    <TextField label="Фамилия"
                               className={classes.textField}
                               onChange={this.changeField(Enum.LAST_NAME_FIELD)}
                               value={lastName}
                    />
                    <TextField label="Пароль"
                               className={classes.textField}
                               onChange={this.changeField(Enum.PASSWORD_FIELD)}
                               type="password"
                               value={password}
                    />
                    <TextField label="Повторите пароль"
                               className={classes.textField}
                               onChange={this.changeField(Enum.PASSWORD_REPEAT_FIELD)}
                               type="password"
                               error={showPasswordError}
                               onFocus={this.passwordFieldFocus}
                               onBlur={this.passwordFieldBlur}
                               helperText={showPasswordError && 'Пароли не совпадают'}
                               value={passwordRepeat}
                    />

                    <Button color="primary"
                            variant="contained"
                            className={classes.button}
                            disabled={disableButton}
                            onClick={this.clickButtonHandler}
                    >
                        Зарегистрироваться
                    </Button>

                    <Typography className={classes.noAccount}>
                        Есть аккаунт?&nbsp;
                        <Link to={appRouter.getSignInRoute()}
                              className={classes.link}>
                            Войти
                        </Link>
                    </Typography>
                </div>
            </div>
        );
    }
}

SignUp.propTypes = {
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
    passwordRepeat: PropTypes.string,
    group: PropTypes.string,
    classes: PropTypes.object,
    actions: PropTypes.object,
    disableButton: PropTypes.bool,
    isPasswordError: PropTypes.bool,
    auth: PropTypes.bool,
    groupOptions: PropTypes.array,
};

export default connect(withStyles(styles)(SignUp));