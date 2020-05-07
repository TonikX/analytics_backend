import React from 'react';
import get from 'lodash/get';
import {shallowEqual} from "recompose";

import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Paper from "@material-ui/core/Paper";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import EditedRow from "./EditedRow";

import {ThirdStepProps, ThirdStepState} from './types';

import connect from './ThirdStep.connect';
import styles from './ThirdStep.styles';

class ThirdStep extends React.Component<ThirdStepProps, ThirdStepState> {
    constructor(props: ThirdStepProps) {
        super(props);

        this.state = {
            sections: props.sections
        };
    }

    componentDidUpdate(prevProps: Readonly<ThirdStepProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (!shallowEqual(this.props.sections, prevProps.sections)){
            this.setState({sections: this.props.sections});
        }
    }

    getNewSection = () => ({
        name: '',
        SRO: '',
        contact_work: '',
        lecture_classes: '',
        practical_lessons: '',
        total_hours: '',
        laboratory: '',
        ordinal_number: get(this, 'props.sections.length', 0) + 1 ,
    })

    handleCreateNewSection = () => {
        const {sections} = this.state;

        // @ts-ignore
        this.setState({
            sections: [
                ...sections,
                this.getNewSection()
            ]
        });

    };

    removeNewSection = (index: number) => {
        const {sections} = this.state;

        // @ts-ignore
        this.setState({
            sections: sections.filter((item, itemIndex) => itemIndex !== index)
        });
    }

    render() {
        // @ts-ignore
        const {classes} = this.props;
        const {sections} = this.state;

        return (
            <div className={classes.thirdStep}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headerCell} rowSpan={2} colSpan={2}> № раздела </TableCell>
                                <TableCell className={classes.headerCell} rowSpan={2}>Наименование раздела дисциплины</TableCell>
                                <TableCell className={classes.headerCell} colSpan={6}>Распределение часов по дисциплине</TableCell>
                                <TableCell className={classes.headerCell} rowSpan={2}> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.headerCell}>Контактная работа</TableCell>
                                <TableCell className={classes.headerCell}>Занятия лекционного типа</TableCell>
                                <TableCell className={classes.headerCell}>Лабораторные занятия</TableCell>
                                <TableCell className={classes.headerCell}>Практические занятия</TableCell>
                                <TableCell className={classes.headerCell}>СРО</TableCell>
                                <TableCell className={classes.headerCell}>Всего часов</TableCell>
                            </TableRow>
                        </TableHead>
                        <SortableList sections={sections}
                                      useDragHandle={true}
                                      hideSortableGhost={false}
                                      removeNewSection={this.removeNewSection}
                        />
                    </Table>
                </TableContainer>

                {!sections.some(section => !section.id)
                    && <Fab color="primary" className={classes.addIcon} onClick={this.handleCreateNewSection}>
                        <AddIcon/>
                    </Fab>
                }
            </div>
        );
    }
}

const DragHandle = SortableHandle(() => <DragIndicatorIcon />);

// @ts-ignore
const SortableItem = SortableElement(({section, removeNewSection, count}) =>
    <TableRow>
        <TableCell style={{backgroundColor: '#fff'}} >
            <DragHandle />
        </TableCell>
        <EditedRow section={section} removeNewSection={removeNewSection} count={count}/>
    </TableRow>
);

// @ts-ignore
const SortableList = SortableContainer(({sections, removeNewSection}) => {
    return (
        <TableBody>
            {sections.map((value: any, index: number) => (
                <SortableItem key={`item-${index}`}
                              index={index}
                              count={index}
                              section={value}
                              removeNewSection={removeNewSection}
                              disabled={!value.id}
                />
            ))}
        </TableBody>
    );
});

// @ts-ignore
export default connect(withStyles(styles)(ThirdStep));
