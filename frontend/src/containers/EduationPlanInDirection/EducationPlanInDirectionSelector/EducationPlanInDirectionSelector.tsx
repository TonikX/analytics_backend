import React, {ReactText} from 'react';
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";

import SearchSelector from "../../../components/SearchSelector/SearchSelector";

import connect from './EducationPlanInDirectionSelector.connect';
import styles from './EducationPlanInDirectionSelector.styles';

import {EducationPlanInDirectionSelectorType} from './type';

class EducationPlanInDirectionSelector extends React.PureComponent<EducationPlanInDirectionSelectorType> {
    state = {
        label: '',
        value: ''
    };

    componentDidMount() {
        this.props.actions.getEducationalPlansInDirection();
    }

    handleChangeSearch = (searchText: string) => {
        this.props.actions.changeSearchQuery(searchText);
        this.props.actions.getEducationalPlansInDirection();
    }

    saveEducationalPlanField = (value: ReactText) => {
        this.setState({
            value: value
        })

        this.props.handleChange(value);
    }

    render() {
        const {optionsList, noMargin, classes} = this.props;
        const {value, label} = this.state;

        return (
            <SearchSelector label="Учебный план и направление * "
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

export default connect(withStyles(styles)(EducationPlanInDirectionSelector));
