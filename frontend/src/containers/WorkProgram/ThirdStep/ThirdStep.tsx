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

import {ThirdStepProps} from './types';

import connect from './ThirdStep.connect';
import styles from './ThirdStep.styles';

//todo: add shouldcomponentupdate

class ThirdStep extends React.PureComponent<ThirdStepProps> {
    state = {
        createNewSectionMode: false
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
        this.setState({
            createNewSectionMode: true,
        });

    };

    removeNewSection = () => {
        this.setState({
            createNewSectionMode: false,
        });
    }

    onSortEnd = ({oldIndex, newIndex}: any) => {
        const {sections} = this.props;

        this.props.actions.changeSectionNumber({sectionId: sections[oldIndex].id, newNumber: newIndex + 1});
    }

    render() {
        // @ts-ignore
        const {classes, sections} = this.props;
        const {createNewSectionMode} = this.state;

        return (
            <div className={classes.thirdStep}>
                <TableContainer>
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
                                      onSortEnd={this.onSortEnd}
                        />

                        {createNewSectionMode &&
                            <TableRow>
                                <TableCell />
                                <EditedRow section={this.getNewSection()} removeNewSection={this.removeNewSection}/>
                            </TableRow>
                        }
                    </Table>
                </TableContainer>

                {!createNewSectionMode
                    && <Fab color="secondary"
                            className={classes.addIcon}
                            onClick={this.handleCreateNewSection}
                        >
                        <AddIcon/>
                    </Fab>
                }
            </div>
        );
    }
}

const DragHandle = SortableHandle(() => <DragIndicatorIcon style={{cursor: "pointer"}}/>);

// @ts-ignore
const SortableItem = SortableElement(({section, removeNewSection}) =>
    <TableRow>
        <TableCell style={{backgroundColor: '#fff', border: '1px solid rgba(224, 224, 224, 1)'}} >
            <DragHandle />
        </TableCell>
        <EditedRow section={section} removeNewSection={removeNewSection}/>
    </TableRow>
);

// @ts-ignore
const SortableList = SortableContainer(({sections, removeNewSection}) => {
    return (<TableBody>
            {sections.map((value: any, index: number) => (
                <SortableItem key={`item-${value.id}`}
                              index={index}
                              section={value}
                              removeNewSection={removeNewSection}
                />
            ))}
        </TableBody>
    );
});

// @ts-ignore
export default connect(withStyles(styles)(ThirdStep));
