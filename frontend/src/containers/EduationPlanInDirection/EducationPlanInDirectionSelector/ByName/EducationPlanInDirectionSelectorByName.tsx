import React from 'react';
import classNames from "classnames";

import {withStyles} from "@mui/styles";

import SearchSelector from "../../../../components/SearchSelector/SearchSelector";

import connect from './EducationPlanInDirectionSelectorByName.connect';
import styles from '../EducationPlanInDirectionSelector.styles';

import {EducationPlanInDirectionSelectorType2} from '../type';

class EducationPlanInDirectionSelector extends React.PureComponent<EducationPlanInDirectionSelectorType2> {

    handleChangeSearch = (searchText: string) => {
        this.props.actions.changeSearchQuery(searchText);
        this.props.actions.getEducationalPlansInDirection();
    }

    componentWillUnmount() {
        this.props.actions.changeSearchQuery('');
        this.props.actions.setEducationalPlansInDirection([]);
    }

    render() {
        const {optionsList, noMargin, classes, className, isReset, handleChange, value} = this.props;

        return (
            <SearchSelector label="Образовательная программа"
                            changeSearchText={this.handleChangeSearch}
                            list={optionsList}
                            changeItem={handleChange}
                            value={value}
                            valueLabel={''}
                            className={classNames({[classes.marginBottom30]: !noMargin,
                                [className]: className})}
                            isReset={isReset}
            />
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(EducationPlanInDirectionSelector));
