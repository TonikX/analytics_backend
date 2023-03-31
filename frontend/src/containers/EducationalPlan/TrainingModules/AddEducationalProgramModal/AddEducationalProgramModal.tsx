import React from 'react';
import Scrollbars from "react-custom-scrollbars";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import withStyles from '@mui/material/styles/withStyles';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import {TrainingModuleCreateModalProps} from './types';

import connect from './AddEducationalProgramModal.connect';
import styles from './AddEducationalProgramModal.styles';
import SearchSelector from "../../../../components/SearchSelector/SearchSelector";
import {filterFields} from "../../../EduationPlanInDirection/enum";
import StructuralUnitsSelector from "../../../StructuralUnits/StructuralUnitsSelector/StructuralUnitsSelector";
import {specialization} from "../../../WorkProgram/constants";
import {EducationalPlanInDirectionType} from "../../../EduationPlanInDirection/types";

class AddEducationalProgramModal extends React.PureComponent<TrainingModuleCreateModalProps, { selectedItems: EducationalPlanInDirectionType[]}> {
    state = {
        selectedItems: [] as EducationalPlanInDirectionType[]
    };

    componentDidMount() {
        this.props.educationalProgramActions.changeFiltering({[filterFields.YEAR]: 2023})
        this.searchModules()
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {selectedPrograms} = this.props
        this.props.actions.changeTrainingModuleEducationalPrograms({
            educationalPrograms: [
               ...this.state.selectedItems.map((trainingModule) => trainingModule.id),
               ...selectedPrograms.map((item: any) => item.id),
            ],
        });
        this.setState({
            selectedItems: [],
        })
    }

    searchModules = () => {
        this.props.educationalProgramActions.getEducationalPlansInDirection()
    }

    handleUnselect = (id: number) => () => {
        this.setState({
            selectedItems: this.state.selectedItems.filter((item: any) => item.id !== id)
        })
    }

    handleSelect = (educationalPlan: EducationalPlanInDirectionType) => () => {
        this.setState({
            selectedItems: [
                ...this.state.selectedItems,
                educationalPlan,
            ]
        })
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.educationalProgramActions.changeCurrentPage(page + 1);
        this.props.educationalProgramActions.getEducationalPlansInDirection();
    }

    handleFilter = (field: string, value: string | number): void => {
        this.props.educationalProgramActions.changeCurrentPage(1);
        this.props.educationalProgramActions.changeFiltering({[field]: value})
        this.props.educationalProgramActions.getEducationalPlansInDirection()
    }

    render() {
        const {isOpen, classes, filters, educationalPrograms, allCount, currentPage} = this.props;
        const {selectedItems} = this.state;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
                fullWidth
                maxWidth="xl"
            >
                <DialogTitle> Добавить образовательную программу </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <div className={classes.filtersLine}>
                        {/*<SearchSelector*/}
                        {/*  label='Уровень образовательной программы'*/}
                        {/*  changeSearchText={() => {}}*/}
                        {/*  list={specialization}*/}
                        {/*  changeItem={(value: string) => this.handleFilter(filterFields.SPECIALIZATION, value)}*/}
                        {/*  value={filters[filterFields.SPECIALIZATION]}*/}
                        {/*  valueLabel={''}*/}
                        {/*  className={classes.select}*/}
                        {/*/>*/}
                        {/*<StructuralUnitsSelector value={filters[filterFields.STRUCTURAL_UNIT]}*/}
                        {/*                         onChange={(value: number) => {this.handleFilter(filterFields.STRUCTURAL_UNIT, value)}}*/}
                        {/*                         className={classes.select}*/}
                        {/*/>*/}
                        <TextField label='Номер направления подготовки'
                                   onChange={(e: any) => this.handleFilter(filterFields.NUMBER_DP, e.target.value)}
                                   variant="outlined"
                                   value={filters[filterFields.NUMBER_DP]}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   className={classes.select}
                        />
                        <TextField label='Образовательная программа'
                                   onChange={(e: any) => this.handleFilter(filterFields.TITLE, e.target.value)}
                                   variant="outlined"
                                   value={filters[filterFields.TITLE]}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   className={classes.select}
                        />
                        <Button variant="contained" color="primary" onClick={this.searchModules} className={classes.searchButton}>
                            Найти
                        </Button>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            <>
                                {selectedItems.map((educationalPlan: EducationalPlanInDirectionType) => (
                                  <div key={educationalPlan.id} className={classes.selectedItem}>
                                      <Checkbox checked={true} onChange={this.handleUnselect(educationalPlan.id)} />
                                      <Typography>
                                          {educationalPlan?.title} &nbsp;
                                          {educationalPlan?.field_of_study?.[0]?.number} &nbsp;
                                          {educationalPlan?.year}
                                      </Typography>
                                  </div>
                                ))}
                                {educationalPrograms.map((educationalPlan: EducationalPlanInDirectionType) => {
                                    if (selectedItems.find((selectedItem) => educationalPlan.id === selectedItem.id)) return <></>
                                    return (
                                      <div key={educationalPlan.id} className={classes.selectedItem}>
                                          <Checkbox checked={false} onChange={this.handleSelect(educationalPlan)}/>
                                          <Typography>
                                              {educationalPlan?.title} &nbsp;
                                              {educationalPlan?.field_of_study?.[0]?.number} &nbsp;
                                              {educationalPlan?.year}
                                          </Typography>
                                      </div>
                                    )
                                })}
                            </>
                        </Scrollbars>

                        <TablePagination
                            component="div"
                            count={allCount}
                            page={currentPage - 1}
                            rowsPerPageOptions={[]}
                            onChangePage={this.handleChangePage}
                            rowsPerPage={10}
                            onChangeRowsPerPage={()=>{}}
                        />
                    </div>
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отмена
                    </Button>
                    <Button onClick={this.handleSave}
                            variant="contained"
                            disabled={selectedItems.length === 0}
                            color="primary">
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(AddEducationalProgramModal));
