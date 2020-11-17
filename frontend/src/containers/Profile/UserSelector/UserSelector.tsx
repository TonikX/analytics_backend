import React, {ReactText} from 'react';
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";

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

    componentDidUpdate(prevProps: Readonly<UserSelectorType>, prevState: Readonly<{}>, snapshot?: any) {
        //@ts-ignore
        if (this.props.value !== this.state.value){
            this.setState({
                //@ts-ignore
                label: this.props.label,
                //@ts-ignore
                value: this.props.value,
            })
        }
    }

    handleChangeSearch = (searchText: string) => {
        this.props.actions.getAllUsers(searchText);
    }

    saveEducationalPlanField = (value: ReactText) => {
        this.setState({
            value: value
        })

        this.props.handleChange(value);
    }

    render() {
        const {optionsList, noMargin, classes, selectorLabel} = this.props;
        const {value, label} = this.state;

        if (!label || !label.length) return <></>;

        return (
            <SearchSelector label={selectorLabel}
                            changeSearchText={this.handleChangeSearch}
                            list={optionsList}
                            changeItem={this.saveEducationalPlanField}
                            value={value}
                            valueLabel={label}
                            className={classNames({[classes.marginBottom30]: !noMargin})}
            />
        );
    }
}

export default connect(withStyles(styles)(UserSelector));
