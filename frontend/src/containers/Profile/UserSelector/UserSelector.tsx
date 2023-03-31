import React, {ReactText} from 'react';
import classNames from "classnames";

import withStyles from "@mui/material/styles/withStyles";

import SearchSelector from "../../../components/SearchSelector/SearchSelector";

import connect from './UserSelector.connect';
import styles from './UserSelector.styles';

import {UserSelectorType} from './type';

class UserSelector extends React.PureComponent<UserSelectorType> {
    state = {
        label: '',
        value: ''
    };

    componentDidMount() {
        this.props.actions.getAllUsers();
    }

    componentDidUpdate(prevProps: UserSelectorType, prevState: any, snapshot?: any) {
        // @ts-ignore
        if (this.props.value !== this.state.value || this.props.label !== this.state.label){
            this.setState({
                label: this.props.label,
                value: this.props.value,
            })
        }
    }

    handleChangeSearch = (searchText: string) => {
        this.props.actions.getAllUsers(searchText);
    }

    saveUserField = (value: ReactText) => {
        this.setState({
            value: value
        })

        this.props.handleChange(value);
    }

    render() {
        const {optionsList, noMargin, classes, selectorLabel, disabled} = this.props;
        const {value, label} = this.state;

        return (
            <SearchSelector label={selectorLabel}
                            changeSearchText={this.handleChangeSearch}
                            list={optionsList}
                            changeItem={this.saveUserField}
                            value={value}
                            valueLabel={label}
                            className={classNames({[classes.marginBottom30]: !noMargin})}
                            disabled={disabled}
            />
        );
    }
}

export default connect(withStyles(styles)(UserSelector));
