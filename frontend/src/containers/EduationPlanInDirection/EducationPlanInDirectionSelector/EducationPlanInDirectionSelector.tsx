import React, {ReactText} from 'react';
import classNames from "classnames";

import withStyles from "@mui/material/styles/withStyles";

import SearchSelector from "../../../components/SearchSelector/SearchSelector";

import connect from './EducationPlanInDirectionSelector.connect';
import styles from './EducationPlanInDirectionSelector.styles';

import {EducationPlanInDirectionSelectorType} from './type';

class EducationPlanInDirectionSelectorByName extends React.PureComponent<EducationPlanInDirectionSelectorType> {
    state = {
        label: '',
        value: ''
    };

    componentDidMount() {
        this.props.actions.getEducationalPlansInDirection();

        if (this.props.label) {
            this.setState({
                label: this.props.label
            })
        }
    }

    handleChangeSearch = (searchText: string) => {
        this.props.actions.changeSearchQuery(searchText);
        this.props.actions.getEducationalPlansInDirection();
    }

    componentWillUnmount() {
        this.props.actions.changeSearchQuery('');
        this.props.actions.setEducationalPlansInDirection([]);
    }

    saveEducationalPlanField = (value: ReactText, label: string) => {
        this.setState({
            value: value
        })

        this.props.handleChange(value, label);
    }

    render() {
        const {optionsList, noMargin, classes, className, isReset, disabled} = this.props;
        const {value, label} = this.state;

        return (
            <SearchSelector label="Образовательная программа"
                            changeSearchText={this.handleChangeSearch}
                            list={optionsList}
                            changeItem={this.saveEducationalPlanField}
                            value={value}
                            valueLabel={label}
                            className={classNames({[classes.marginBottom30]: !noMargin, 
                                [className]: className})}
                            isReset={isReset}
                            disabled={disabled}
            />
        );
    }
}

export default connect(withStyles(styles)(EducationPlanInDirectionSelectorByName));
