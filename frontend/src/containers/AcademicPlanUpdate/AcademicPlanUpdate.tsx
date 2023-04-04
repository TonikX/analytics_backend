import React, {SyntheticEvent} from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import Scrollbars from "react-custom-scrollbars-2";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import TextField from '@mui/material/TextField';
import Fab from "@mui/material/Fab";
import Paper from '@mui/material/Paper';
import FormControlLabel from "@mui/material/FormControlLabel";
import TablePagination from '@mui/material/TablePagination';

import Typography from "@mui/material/Typography";

import {withStyles} from '@mui/styles';
import {
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from "@mui/material";
import {
    KeyboardTimePicker
} from '@material-ui/pickers';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import SearchOutlined from "@mui/icons-material/SearchOutlined";


import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";

import {AcademicPlanUpdateProps} from './types';


import connect from './AcademicPlanUpdate.connect';
import styles from './AcademicPlanUpdate.styles';
import {AcademicPlanUpdateLogFields, SchedulerConfigurationFields, UpdatedAcademicPlanFields} from "./enum";
import CreateModal from "./CreateModal/CreateModal";
import {WorkProgramGeneralFields} from "../WorkProgram/enum";
import Pagination from "@mui/lab/Pagination";

class AcademicPlanUpdate extends React.Component<AcademicPlanUpdateProps> {
    state = {
        isUpdatedPlansShown: false
    }


    componentDidMount() {
        this.props.actions.getAcademicPlanUpdateLogs();
        this.props.actions.getSchedulerConfiguration();
        this.props.actions.getUpdatedAcademicPlans();
    }

    handleChangeSearchQuery = (event: React.ChangeEvent) => {
        this.changeSearch(get(event, 'target.value', ''));
    }

    updateAcademicPlans = () => {
        this.props.actions.updateAcademicPlans();
    }

    getAcademicPlansExcel = () => {
        this.props.actions.getAcademicPlansExcel();
    }

    showUpdatedPlans = () => {
        this.setState({
            isUpdatedPlansShown: !this.state.isUpdatedPlansShown
        });
    }

    changeSearch = debounce((value: string): void => {
        if (this.state.isUpdatedPlansShown) {
            this.props.actions.updatedPlansChangeSearchQuery(value);
            this.props.actions.updatedPlansChangeCurrentPage(1);
            this.props.actions.getUpdatedAcademicPlans()
        } else {
            this.props.actions.logsChangeSearchQuery(value);
            this.props.actions.logsChangeCurrentPage(1);
            this.props.actions.getAcademicPlanUpdateLogs();
        }
    }, 300);

    handleChangePage = (event: any, page: number) => {
        if(this.state.isUpdatedPlansShown){
            this.props.actions.updatedPlansChangeCurrentPage(page);
            this.props.actions.getUpdatedAcademicPlans()
        }else {
            this.props.actions.logsChangeCurrentPage(page);
            this.props.actions.getAcademicPlanUpdateLogs();
        }
    }

    changeSorting = (field: string) => (mode: SortingType) => {
        if (this.state.isUpdatedPlansShown) {
            this.props.actions.updatedPlansChangeSorting({field: mode === '' ? '' : field, mode});
            this.props.actions.getUpdatedAcademicPlans();
        } else {
            this.props.actions.logsChangeSorting({field: mode === '' ? '' : field, mode});
            this.props.actions.getAcademicPlanUpdateLogs();
        }
    }

    changeUpdateStatus = (id: number, updatesEnabled: boolean) => (event: SyntheticEvent): void => {
        updatesEnabled = !updatesEnabled
        this.props.actions.updateAcademicPlanConfiguration({
            [UpdatedAcademicPlanFields.ID]: id,
            [UpdatedAcademicPlanFields.UPDATES_ENABLED]: updatesEnabled
        });
    };

    handleAdd = () => {
        this.props.actions.openDialog();
    }

    handleIntervalChange = (event: any): void => {
        this.props.actions.updateSchedulerConfiguration(
            {
                [SchedulerConfigurationFields.DAYS_INTERVAL]: event.target.value,
                [SchedulerConfigurationFields.EXECUTION_HOURS]: this.props.schedulerConfiguration[SchedulerConfigurationFields.EXECUTION_HOURS]
            }
        );
    }

    handleDateChange = (date: any) => {
        this.props.actions.updateSchedulerConfiguration(
            {
                [SchedulerConfigurationFields.DAYS_INTERVAL]: this.props.schedulerConfiguration[SchedulerConfigurationFields.DAYS_INTERVAL],
                [SchedulerConfigurationFields.EXECUTION_HOURS]: new Date(date._d).getHours()
            }
        );
    };

    render() {
        const {
            classes,
            schedulerConfiguration,
            academicPlanUpdateLogs,
            updatedAcademicPlans,
            logsAllCount,
            logsCurrentPage,
            logsSortingField,
            logsSortingMode,
            updatedPlansAllCount,
            updatedPlansCurrentPage,
            updatedPlansSortingField,
            updatedPlansSortingMode
        } = this.props;
        console.log(schedulerConfiguration[SchedulerConfigurationFields.EXECUTION_HOURS])
        return (
            <Paper className={classes.root}>
                <div className={classes.titleWrap}>
                    <Typography className={classes.title}>Обновления учебных планов</Typography>
                    <div className={classes.additionalFunctionsWrap}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Время обновления"
                            value={new Date().setHours(schedulerConfiguration[SchedulerConfigurationFields.EXECUTION_HOURS], 0, 0)}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                        <FormControl variant="outlined">
                            <InputLabel>Интервал обновлений</InputLabel>
                            <Select className={classes.field}
                                    label="Интервал обновлений"
                                    value={schedulerConfiguration[SchedulerConfigurationFields.DAYS_INTERVAL]}
                                    onChange={this.handleIntervalChange}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        transformOrigin: {
                                            vertical: "top",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }}>
                                <MenuItem value="1">1 день</MenuItem>
                                <MenuItem value="3">3 дня</MenuItem>
                                <MenuItem value="7">7 дней</MenuItem>
                                <MenuItem value="30">30 дней</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            onClick={this.showUpdatedPlans}
                            variant="contained"
                            color="primary"
                            disableElevation
                            className={classes.Btn}
                        >
                            {!this.state.isUpdatedPlansShown ? 'Обновляемые планы' : 'Журнал обновлений'}

                        </Button>
                        <Button
                            onClick={this.updateAcademicPlans}
                            variant="contained"
                            color="primary"
                            disableElevation
                            className={classes.Btn}
                        >
                            Синхронизировать
                        </Button>
                        <Button
                            onClick={this.getAcademicPlansExcel}
                            variant="contained"
                            color="primary"
                            disableElevation
                            className={classes.Btn}
                        >
                            Получить excel
                        </Button>
                        <TextField placeholder="Поиск"
                                   variant="outlined"
                                   InputProps={{
                                       classes: {
                                           root: classes.searchInput
                                       },
                                       startAdornment: <SearchOutlined/>,
                                   }}
                                   onChange={this.handleChangeSearchQuery}
                        />
                    </div>
                </div>

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        {!this.state.isUpdatedPlansShown ? <Table stickyHeader size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Id учебного плана
                                            <SortingButton
                                                changeMode={this.changeSorting('academic_plan_id')}
                                                mode={logsSortingField === 'academic_plan_id' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            Объект обновления
                                            <SortingButton
                                                changeMode={this.changeSorting('object_type')}
                                                mode={logsSortingField === 'object_type' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            Обновленное поле
                                            <SortingButton
                                                changeMode={this.changeSorting('field_name')}
                                                mode={logsSortingField === 'field_name' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            Старое значение
                                            <SortingButton
                                                changeMode={this.changeSorting('old_value')}
                                                mode={logsSortingField === 'old_value' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            Новое значение
                                            <SortingButton
                                                changeMode={this.changeSorting('new_value')}
                                                mode={logsSortingField === 'new_value' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            Дата обновления
                                            <SortingButton
                                                changeMode={this.changeSorting('updated_date_time')}
                                                mode={logsSortingField === 'updated_date_time' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {academicPlanUpdateLogs.map(log =>
                                        <TableRow key={log[AcademicPlanUpdateLogFields.ID]}>
                                            <TableCell>{log[AcademicPlanUpdateLogFields.ACADEMIC_PLAN_ID]}</TableCell>
                                            <TableCell>{log[AcademicPlanUpdateLogFields.OBJECT_TYPE]}</TableCell>
                                            <TableCell>{log[AcademicPlanUpdateLogFields.FIELD_NAME]}</TableCell>
                                            <TableCell>{log[AcademicPlanUpdateLogFields.OLD_VALUE]}</TableCell>
                                            <TableCell>{log[AcademicPlanUpdateLogFields.NEW_VALUE]}</TableCell>
                                            <TableCell>{log[AcademicPlanUpdateLogFields.UPDATED_DATE_TIME]}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            :

                            <Table stickyHeader size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Id учебного плана
                                            <SortingButton
                                                changeMode={this.changeSorting('academic_plan_id')}
                                                mode={updatedPlansSortingField === 'academic_plan_id' ? updatedPlansSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            Название
                                            <SortingButton
                                                changeMode={this.changeSorting('academic_plan_title')}
                                                mode={updatedPlansSortingField === 'academic_plan_title' ? updatedPlansSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            Дата обновления
                                            <SortingButton
                                                changeMode={this.changeSorting('updated_date_time')}
                                                mode={updatedPlansSortingField === 'updated_date_time' ? updatedPlansSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            Обновления
                                            <SortingButton
                                                changeMode={this.changeSorting('updates_enabled')}
                                                mode={updatedPlansSortingField === 'updates_enabled' ? updatedPlansSortingMode : ''}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {updatedAcademicPlans.map(updatedPlan =>
                                        <TableRow key={updatedPlan[UpdatedAcademicPlanFields.ID]}>
                                            <TableCell>{updatedPlan[UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID]}</TableCell>
                                            <TableCell>{updatedPlan[UpdatedAcademicPlanFields.ACADEMIC_PLAN_TITLE]}</TableCell>
                                            <TableCell>{updatedPlan[UpdatedAcademicPlanFields.UPDATED_DATE_TIME]}</TableCell>
                                            <TableCell>{
                                                <Switch checked={updatedPlan[UpdatedAcademicPlanFields.UPDATES_ENABLED]}
                                                        onChange={this.changeUpdateStatus(updatedPlan[UpdatedAcademicPlanFields.ID], updatedPlan[UpdatedAcademicPlanFields.UPDATES_ENABLED])}
                                                        color="primary"
                                                />

                                            }</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        }
                    </div>

                </Scrollbars>

                <div className={classes.footer}>
                    {this.state.isUpdatedPlansShown ?
                      <Pagination count={updatedPlansAllCount}
                                  page={updatedPlansCurrentPage - 1}
                                  onChange={this.handleChangePage}
                                  color="primary"
                      />
                        :
                      <Pagination count={logsAllCount}
                                  page={logsCurrentPage - 1}
                                  onChange={this.handleChangePage}
                                  color="primary"
                      />
                    }
                    {this.state.isUpdatedPlansShown &&
                        <Fab color="secondary"
                             classes={{
                                 root: classes.addIcon
                             }}
                             onClick={this.handleAdd}
                        >
                            <AddIcon/>
                        </Fab>
                    }
                </div>
                <CreateModal/>
            </Paper>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(AcademicPlanUpdate));
