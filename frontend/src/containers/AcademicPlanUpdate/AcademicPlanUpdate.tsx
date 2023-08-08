import React from 'react';
import debounce from 'lodash/debounce';
import moment from 'moment';
import get from 'lodash/get';
import Scrollbars from "react-custom-scrollbars-2";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import TextField from '@mui/material/TextField';
import Fab from "@mui/material/Fab";
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CheckIcon from "@mui/icons-material/CheckOutlined";

import Typography from "@mui/material/Typography";

import {withStyles} from '@mui/styles';
import {
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from "@mui/material";
import TimePicker from '@mui/lab/TimePicker';
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
import Pagination from "@mui/lab/Pagination";
import {FULL_DATE_FORMAT_WITH_TIME} from "../../common/utils";

class AcademicPlanUpdate extends React.Component<AcademicPlanUpdateProps> {
    state = {
        currentTab: "1"
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

    updateAcademicPlansFrom2023 = () => {
        this.props.actions.updateAcademicPlansFrom2023();
    }

    getAcademicPlansExcel = () => {
        this.props.actions.getAcademicPlansExcel();
    }

    showUpdatedPlans = (e: any, value: any) => {
        this.setState({
            currentTab: value,
        });
    }

    changeSearch = debounce((value: string): void => {
        if (this.state.currentTab) {
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
        if(this.state.currentTab){
            this.props.actions.updatedPlansChangeCurrentPage(page);
            this.props.actions.getUpdatedAcademicPlans()
        }else {
            this.props.actions.logsChangeCurrentPage(page);
            this.props.actions.getAcademicPlanUpdateLogs();
        }
    }

    changeSorting = (field: string) => (mode: SortingType) => {
        if (this.state.currentTab) {
            this.props.actions.updatedPlansChangeSorting({field: mode === '' ? '' : field, mode});
            this.props.actions.getUpdatedAcademicPlans();
        } else {
            this.props.actions.logsChangeSorting({field: mode === '' ? '' : field, mode});
            this.props.actions.getAcademicPlanUpdateLogs();
        }
    }

    changeUpdateStatus = (id: number, updatesEnabled: boolean) => (): void => {
        updatesEnabled = !updatesEnabled
        this.props.actions.updateAcademicPlanConfiguration({
            [UpdatedAcademicPlanFields.ID]: id,
            [UpdatedAcademicPlanFields.UPDATES_ENABLED]: updatesEnabled
        });
    };

    changeOver23Status = (id: number, over23: boolean) => (): void => {
        this.props.actions.updateAcademicPlanOver23({
            [UpdatedAcademicPlanFields.ID]: id,
            [UpdatedAcademicPlanFields.OVER_23]: !over23
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
        //@ts-ignore
        const {classes} = this.props;
        const {
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

        return (
            <Paper className={classes.root}>
                <div className={classes.titleWrap}>
                    <Typography className={classes.title}>Обновления учебных планов</Typography>
                    <div className={classes.additionalFunctionsWrap}>
                        <TimePicker
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
                                    }}>
                                <MenuItem value="1">1 день</MenuItem>
                                <MenuItem value="3">3 дня</MenuItem>
                                <MenuItem value="7">7 дней</MenuItem>
                                <MenuItem value="30">30 дней</MenuItem>
                            </Select>
                        </FormControl>
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

                <div className={classes.buttonsWrap}>
                    <Tabs value={this.state.currentTab}
                          indicatorColor="primary"
                          onChange={this.showUpdatedPlans}
                    >
                        <Tab value="1" label="Журнал обновлений" />
                        <Tab value="2" label="Обновляемые планы" />

                    </Tabs>

                    <Button
                      onClick={this.updateAcademicPlansFrom2023}
                      variant="outlined"
                      color="primary"
                      disableElevation
                      className={classes.button}
                      style={{marginRight: 20, marginLeft: 'auto'}}
                    >
                        Синхронизировать планы с 2023 года
                    </Button>
                    <Button
                      onClick={this.updateAcademicPlans}
                      variant="outlined"
                      color="primary"
                      disableElevation
                      className={classes.button}
                      style={{marginRight: 20}}
                    >
                        Синхронизировать
                    </Button>
                    <Button
                      onClick={this.getAcademicPlansExcel}
                      variant="outlined"
                      color="primary"
                      disableElevation
                      className={classes.button}
                    >
                        Получить excel
                    </Button>
                </div>


                <Scrollbars>
                    <div className={classes.tableWrap}>
                        {this.state.currentTab === '2' ? <Table stickyHeader size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.idPlanCell}>
                                            Id УП
                                            <SortingButton
                                                changeMode={this.changeSorting('academic_plan_id')}
                                                mode={logsSortingField === 'academic_plan_id' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.headCell}>
                                            Объект обновления
                                            <SortingButton
                                                changeMode={this.changeSorting('object_type')}
                                                mode={logsSortingField === 'object_type' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.headCell}>
                                            Обновленное поле
                                            <SortingButton
                                                changeMode={this.changeSorting('field_name')}
                                                mode={logsSortingField === 'field_name' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.headCell}>
                                            Старое значение
                                            <SortingButton
                                                changeMode={this.changeSorting('old_value')}
                                                mode={logsSortingField === 'old_value' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.headCell}>
                                            Новое значение
                                            <SortingButton
                                                changeMode={this.changeSorting('new_value')}
                                                mode={logsSortingField === 'new_value' ? logsSortingMode : ''}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.headCell}>
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
                                            <TableCell className={classes.idPlanCell}>{log[AcademicPlanUpdateLogFields.ACADEMIC_PLAN_ID]}</TableCell>
                                            <TableCell>{log[AcademicPlanUpdateLogFields.OBJECT_TYPE]}</TableCell>
                                            <TableCell>{log[AcademicPlanUpdateLogFields.FIELD_NAME]}</TableCell>
                                            <TableCell>{log[AcademicPlanUpdateLogFields.OLD_VALUE]}</TableCell>
                                            <TableCell>{log[AcademicPlanUpdateLogFields.NEW_VALUE]}</TableCell>
                                            <TableCell>{moment(log[AcademicPlanUpdateLogFields.UPDATED_DATE_TIME]).format(FULL_DATE_FORMAT_WITH_TIME)}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            :

                            <Table stickyHeader size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.idPlanCell}>
                                            Id УП
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
                                        <TableCell>
                                            С 2023 года
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {updatedAcademicPlans.map(updatedPlan =>
                                        <TableRow key={updatedPlan[UpdatedAcademicPlanFields.ID]}>
                                            <TableCell className={classes.idPlanCell}>{updatedPlan[UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID]}</TableCell>
                                            <TableCell>{updatedPlan[UpdatedAcademicPlanFields.ACADEMIC_PLAN_TITLE]}</TableCell>
                                            <TableCell>{moment(updatedPlan[UpdatedAcademicPlanFields.UPDATED_DATE_TIME]).format(FULL_DATE_FORMAT_WITH_TIME)}</TableCell>
                                            <TableCell>
                                                <Switch checked={updatedPlan[UpdatedAcademicPlanFields.UPDATES_ENABLED]}
                                                        onChange={this.changeUpdateStatus(updatedPlan[UpdatedAcademicPlanFields.ID], updatedPlan[UpdatedAcademicPlanFields.UPDATES_ENABLED])}
                                                        color="primary"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Switch checked={updatedPlan[UpdatedAcademicPlanFields.OVER_23]}
                                                        onChange={this.changeOver23Status(updatedPlan[UpdatedAcademicPlanFields.ID], updatedPlan[UpdatedAcademicPlanFields.OVER_23])}
                                                        color="primary"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        }
                    </div>

                </Scrollbars>

                <div className={classes.footer}>
                    {this.state.currentTab ?
                      <Pagination count={Math.ceil(updatedPlansAllCount / 10)}
                                  page={updatedPlansCurrentPage}
                                  onChange={this.handleChangePage}
                                  color="primary"
                      />
                        :
                      <Pagination count={Math.ceil(logsAllCount / 10)}
                                  page={logsCurrentPage}
                                  onChange={this.handleChangePage}
                                  color="primary"
                      />
                    }
                    {this.state.currentTab &&
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
