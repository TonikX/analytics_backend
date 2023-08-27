import React from 'react';
import get from 'lodash/get';
import Scrollbars from "react-custom-scrollbars-2";
// @ts-ignore
import {AutoSizer} from 'react-virtualized-reactv17';
import classNames from "classnames";

import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import AddIcon from '@mui/icons-material/Add';
import {withStyles} from '@mui/styles';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import EditedRow from "./EditedRow";

import {SectionsProps} from './types';
import {fields, ImplementationFormatsEnum, workProgramSectionFields} from "../enum";

import connect from './Sections.connect';
import styles from './Sections.styles';

class Sections extends React.PureComponent<SectionsProps> {
  scrollBar: any = null;

  state = {
    createNewSectionMode: false,
    totalHours: 0
  }

  getNewSection = () => ({
    name: '',
    SRO: 0,
    contact_work: 0,
    lecture_classes: 0,
    practical_lessons: 0,
    total_hours: 0,
    laboratory: 0,
    ordinal_number: get(this, 'props.sections.length', 0) + 1 ,
  })

  handleCreateNewSection = () => {
    this.setState({
      createNewSectionMode: true,
    });
    this.scrollBar.scrollToBottom();
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

  getTotalHours = (field: string) => {
    const {sections} = this.props;

    let count = 0;

    sections.forEach(section => {
        // @ts-ignore
        count += Boolean(section[field]) ? parseFloat(section[field]) : 0;
    })

    return count;
  };

  updateValues = (totalTotalHours: number) => {
    const {sections} = this.props;
    let totalHoursWithoutCPO = 0;

    sections.forEach((section) => {
      totalHoursWithoutCPO += parseFloat(String(this.calculateContactWork(section) ));
    });

    const totalContactWork = parseFloat(String(totalHoursWithoutCPO)); // общая контактная работа
    const totalHours = this.state.totalHours || totalTotalHours;

    sections.forEach((section) => {
      const contactWork = this.calculateContactWork(section).toFixed(2);
      const sro = (parseFloat(contactWork) / totalContactWork * (totalHours - totalContactWork)).toFixed(2)
      //@ts-ignore
      const newSectionHours = (parseFloat(sro) + parseFloat(contactWork)).toFixed(2);

      this.props.actions.saveSection({
        ...section,
        [workProgramSectionFields.CONTACT_WORK]: contactWork,
        [workProgramSectionFields.SPO]: sro,
        [workProgramSectionFields.TOTAL_HOURS]: newSectionHours,
      });
    })
  }

  calculateContactWork = (section: any) => {
    const { implementationFormat } = this.props

    const totalContactWorkHours = (
        (parseFloat(section[workProgramSectionFields.LECTURE_CLASSES]) || 0) +
        (parseFloat(section[workProgramSectionFields.PRACTICAL_LESSONS]) || 0) +
        (parseFloat(section[workProgramSectionFields.LABORATORY]) || 0))
      * 1.1

    const totalConsultationsWorkHours = ((parseFloat(section[workProgramSectionFields.CONSULTATIONS]) || 0) * 1.1)

    if (implementationFormat === ImplementationFormatsEnum.ONLINE) return totalConsultationsWorkHours
    if (implementationFormat === ImplementationFormatsEnum.OFFLINE) return totalContactWorkHours

    return totalConsultationsWorkHours + totalContactWorkHours
  }

  handleChangeTotalHours = (e: React.ChangeEvent) => {
    const value = get(e, 'target.value');

    if (value !== '') {
      this.props.actions.saveWorkProgram({
        destination: fields.WORK_PROGRAM_ALL_HOURS,
        value: get(e, 'target.value')
      });
    }
  }

  render() {
    //@ts-ignore
    const {classes} = this.props;
    const {showImplementationFormatError, sections, isCanEdit, totalHours, lectureHours, practiceHours, labHours, srsHours, semesterCount, implementationFormat, contactHours, consultationHours} = this.props;
    const {createNewSectionMode} = this.state;

    const totalLectureClassesHours = this.getTotalHours(workProgramSectionFields.LECTURE_CLASSES).toFixed(2);
    const totalLaboratoryClassesHours = this.getTotalHours(workProgramSectionFields.LABORATORY).toFixed(2);
    const totalPracticalClassesHours = this.getTotalHours(workProgramSectionFields.PRACTICAL_LESSONS).toFixed(2);
    const totalSPOHours = this.getTotalHours(workProgramSectionFields.SPO).toFixed(2);
    const totalConsultationsHours = this.getTotalHours(workProgramSectionFields.CONSULTATIONS).toFixed(2);

    const currentTotalHours = this.getTotalHours(workProgramSectionFields.TOTAL_HOURS).toFixed(2);

    const semesterColumns = new Array(semesterCount).fill(0)

    const totalContactWorkHoursOffline = ((
        parseFloat(totalLectureClassesHours) +
        parseFloat(totalLaboratoryClassesHours) +
        parseFloat(totalPracticalClassesHours))
      * 1.1);

    const totalConsultationsWorkHours = (
      parseFloat(totalConsultationsHours)
      * 1.1);

    const finalContactWorkHours =
      implementationFormat === ImplementationFormatsEnum.ONLINE ? totalConsultationsWorkHours.toFixed(2) :
      implementationFormat === ImplementationFormatsEnum.OFFLINE ? totalContactWorkHoursOffline.toFixed(2)
        : (totalContactWorkHoursOffline + totalConsultationsWorkHours).toFixed(2)

    return (
      <div className={classes.secondStep}>
        {showImplementationFormatError ? <Typography style={{color: 'red'}}>У вас не указан формат реализации дисциплины. По умолчанию калькулятор считает трудоемкость по формату "офлайн".</Typography> : null}
        <TableContainer className={classes.table}>
          <AutoSizer disableHeight>
            {({ width, height }: any) => (
              <Scrollbars style={{width, height}}  ref={(el) => {this.scrollBar = el}} autoHeight autoHeightMax={Number.MAX_VALUE}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.headerCell} rowSpan={2} colSpan={isCanEdit ? 2 : 1}> № раздела </TableCell>
                      <TableCell className={classes.headerCell} rowSpan={2}>Наименование раздела дисциплины</TableCell>
                      <TableCell className={classes.headerCell} colSpan={isCanEdit ? 7 : 6}>Распределение часов по дисциплине</TableCell>
                      <TableCell className={classes.headerCell} rowSpan={isCanEdit ? 2 : 1}> </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.headerCell}>Контактная работа</TableCell>
                      <TableCell className={classes.headerCell}>Занятия лекционного типа</TableCell>
                      <TableCell className={classes.headerCell}>Лабораторные занятия</TableCell>
                      <TableCell className={classes.headerCell}>Практические занятия</TableCell>
                      <TableCell className={classes.headerCell}>СРО</TableCell>
                      <TableCell className={classes.headerCell}>Консультации</TableCell>
                      <TableCell className={classes.headerCell}>Всего часов</TableCell>
                    </TableRow>
                  </TableHead>

                  <SortableList sections={sections}
                                useDragHandle={true}
                                hideSortableGhost={false}
                                removeNewSection={this.removeNewSection}
                                onSortEnd={this.onSortEnd}
                                isCanEdit={isCanEdit}
                  />

                  {createNewSectionMode &&
                      <TableRow>
                          <TableCell style={{border: '1px solid rgba(224, 224, 224, 1'}}/>
                          <EditedRow section={this.getNewSection()} removeNewSection={this.removeNewSection}/>
                      </TableRow>
                  }

                  <TableRow>
                    <TableCell className={classes.headerCell} colSpan={isCanEdit ? 3 : 2}> Всего </TableCell>
                    <TableCell className={classes.headerCell}>{finalContactWorkHours}</TableCell>


                    <Tooltip title="Часы должны делиться на 2 без остатка"
                             disableHoverListener={parseFloat(totalLectureClassesHours) %  2 === 0}
                    >
                      <TableCell className={classNames(classes.headerCell, {
                        [classes.errorText]: parseFloat(totalLectureClassesHours) %  2 !== 0}
                      )}>
                        {totalLectureClassesHours}
                      </TableCell>
                    </Tooltip>


                    <Tooltip title="Часы должны делиться на 2 без остатка"
                             disableHoverListener={parseFloat(totalLaboratoryClassesHours) %  2 === 0}
                    >
                      <TableCell className={classNames(classes.headerCell, {
                        [classes.errorText]: parseFloat(totalLaboratoryClassesHours) %  2 !== 0}
                      )}>
                        {totalLaboratoryClassesHours}
                      </TableCell>
                    </Tooltip>

                    <Tooltip title="Часы должны делиться на 2 без остатка"
                             disableHoverListener={parseFloat(totalPracticalClassesHours) %  2 === 0}
                    >
                      <TableCell className={classNames(classes.headerCell, {
                        [classes.errorText]: parseFloat(totalPracticalClassesHours) %  2 !== 0}
                      )}>

                        {totalPracticalClassesHours}
                      </TableCell>
                    </Tooltip>

                    <TableCell className={classes.headerCell}>{totalSPOHours}</TableCell>
                    <TableCell className={classes.headerCell}>{totalConsultationsHours}</TableCell>
                    <TableCell className={classes.headerCell}>
                      {isCanEdit ?
                        <Tooltip title="Всего должно делиться на 36 без остатка"
                                 disableHoverListener={parseFloat(totalHours) % 36 === 0 || !sections.length}
                        >
                          <TextField variant="outlined"
                                     size="small"
                                     defaultValue={totalHours}
                                     type="number"
                                     className={classes.smallInput}
                                     error={parseFloat(totalHours) % 36 !== 0 && sections.length !== 0}
                                     onBlur={this.handleChangeTotalHours}
                          />
                        </Tooltip>
                        :
                        <>{totalHours}</>
                      }
                    </TableCell>
                    {isCanEdit &&
                        <Tooltip title={parseInt(totalHours) <= 0 ? "Всего часов должно быть > 0" : "Пересчитать столбец СРО и всего часов основываясь на введеных значениях"}>
                            <TableCell className={classes.headerCell}>
                                <Button onClick={() => parseInt(totalHours) > 0 && this.updateValues(parseFloat(totalHours))}>Пересчитать</Button>
                            </TableCell>
                        </Tooltip>
                    }
                  </TableRow>
                </Table>

                {isCanEdit && sections.length !== 0 && parseFloat(totalHours) ?
                  <>
                    {parseFloat(currentTotalHours) !== parseFloat(totalHours) && parseFloat(currentTotalHours) < parseFloat(totalHours) ?
                      <div className={classes.totalHourError}>
                        <Typography>
                          "Всего часов" {totalHours} не равно сумме часов по разделам {currentTotalHours}. У вас осталось часов - {(parseFloat(totalHours) - parseFloat(currentTotalHours)).toFixed(2)}
                        </Typography>
                      </div>
                      : parseFloat(currentTotalHours) !== parseFloat(totalHours) &&
                        <div className={classes.totalHourError}>
                            <Typography>
                                "Всего часов" {totalHours} не равно сумме часов по разделам {currentTotalHours}. У вас лишние часы, нужно убрать часов - {(parseFloat(currentTotalHours) - parseFloat(totalHours)).toFixed(2)}, либо измените "всего часов"
                            </Typography>
                        </div>
                    }
                  </>
                  :
                  <></>
                }

              </Scrollbars>
            )}
          </AutoSizer>
        </TableContainer>

        {!lectureHours.length && !practiceHours.length && !labHours.length && !srsHours.length ? <></> :
          <>
            <Typography className={classes.lastInfo}>
              <b> Трудоемкость по данным из ИСУ (справочно):</b>
            </Typography>

            <TableContainer className={classes.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell rowSpan={2} className={classes.headerCell} colSpan={1}>
                      Занятия
                    </TableCell>
                    <TableCell className={classes.headerCell} colSpan={10}>
                      Семестр
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {semesterColumns.map((item, index) =>
                      <TableCell className={classes.headerCell}>{index + 1}</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.headerCell}>
                      Лекционные занятия
                    </TableCell>
                    {semesterColumns.map((item: any, index: number) =>
                      <TableCell className={classes.cell}>{lectureHours[index]}</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.headerCell}>
                      Лабораторные занятия
                    </TableCell>
                    {semesterColumns.map((item: any, index: number) =>
                      <TableCell className={classes.cell}>{labHours[index]}</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.headerCell}>
                      Консультации
                    </TableCell>
                    {semesterColumns.map((item: any, index: number) =>
                      <TableCell className={classes.cell}>{consultationHours[index] || "0.00" }</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.headerCell}>
                      Практические занятия
                    </TableCell>
                    {semesterColumns.map((item: any, index: number) =>
                      <TableCell className={classes.cell}>{practiceHours[index]}</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.headerCell}>
                      Самостоятельная работа
                    </TableCell>
                    {semesterColumns.map((item: any, index: number) =>
                      <TableCell className={classes.cell}>{srsHours[index]}</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.headerCell}>
                      Контактная работа
                    </TableCell>
                    {semesterColumns.map((item: any, index: number) =>
                      <TableCell className={classes.cell}>{contactHours[index]}</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        }

        {!createNewSectionMode && isCanEdit
          && <div className={classes.iconWrapper}>
                <Button color="secondary"
                        onClick={this.handleCreateNewSection}
                >
                    <AddIcon/> Добавить раздел
                </Button>
            </div>
        }
      </div>
    );
  }
}

const DragHandle = SortableHandle(() => <DragIndicatorIcon style={{cursor: "pointer"}}/>);

// @ts-ignore
const SortableItem = SortableElement(({section, removeNewSection, isCanEdit}) =>
  <TableRow>
    {isCanEdit &&
        <TableCell style={{backgroundColor: '#fff', border: '1px solid rgba(224, 224, 224, 1)'}}>
            <DragHandle/>
        </TableCell>
    }
    <EditedRow section={section} removeNewSection={removeNewSection} />
  </TableRow>
);

// @ts-ignore
const SortableList = SortableContainer(({sections, removeNewSection, isCanEdit}) => {
  return (<TableBody>
      {sections.map((value: any, index: number) => (
        <SortableItem key={`item-${value.id}`}
                      index={index}
                      section={value}
                      removeNewSection={removeNewSection}
                      isCanEdit={isCanEdit}
        />
      ))}
    </TableBody>
  );
});

// @ts-ignore
export default connect(withStyles(styles)(Sections));
