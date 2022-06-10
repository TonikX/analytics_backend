import React, {Component, ReactElement} from 'react';
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {appRouter} from "../../service/router-service";
import styles from './Records.styles';
import {
    Button, ExpansionPanelDetails,
    FormControl,
    FormControlLabel,
    InputLabel, MenuItem,
    Paper,
    Radio,
    RadioGroup,
    TableCell
} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import {RecordsProops} from "./types";
import connect from "./Records.connect";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import FormLabel from "@material-ui/core/FormLabel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import SearchSelector from "../../components/SearchSelector";
import QuantityReportCharts from './RecordsChart/QuantityReport/RecordsChart'
import QualityReportChart from './RecordsChart/QualityReport/QualityReportChart'
import TotalOPReport from './RecordsChart/TotalOPReport/TotalOPReport';
import RecordsPagesRPDSemester from './RecordsPages/RecordsPagesRPDSemester/RecordsPagesRPDSemester';

class Records extends Component<RecordsProops> {
    state = {
        value: 6,
        isVisible: false,
        page: 0,
        rowsPerPage: 10,
        expandend: null,
        height: "100%",
        AP: [],
        SU: [],
    }

    componentDidMount() {
        this.props.actions.GetAP();
        this.state.AP = this.props.AP
        this.props.actions.GetSU();
        this.state.SU = this.props.SU;
        this.props.actions.GetQuantityOPAll();
        this.setState({isVisible: true});
    }

    handleChange = (event: any): void => {
        this.setState({value: event.target.value, isVisible: false, page: 0, expandend: null, height: "100%"});
        this.props.actions.changeQualification("bachelor");
        this.props.actions.changeYear("2021");
        this.props.actions.ChangeStatus("all");
        this.props.actions.SetRPDinSU([]);
        this.props.actions.SetRPDinSEMESTER([]);
        this.props.actions.SetRPDinAP([]);
        this.props.actions.ChangeAP(-1);
        this.props.actions.ChangeSU(-1);
    }

    changeQual = (event: any): void => {
        this.props.actions.changeQualification(event.target.value);
    }

    сhangeStatus = (event: any): void => {
        this.props.actions.ChangeStatus(event.target.value);
    }

    сhangeSemester = (event: any): void => {
        this.props.actions.ChangeSemester(event.target.value);
    }

    changeYear = (event: any): void => {
        this.props.actions.changeYear(event.target.value);
    }

    changeYearForAP = (event: any): void => {
        this.props.actions.changeYear(event.target.value);
        this.props.actions.GetAP();
        this.state.AP = this.props.AP
    }

    handleChangePage = (event: any, page: number): void => {
        this.setState({page: page});
    }

    handleChangePanel = (panel: any) => (event: any, expandend: any) => {
        this.setState({
            expandend: expandend ? panel : false,
            page: 0
        });
    };

    getSimpleStat = () => {
        this.props.actions.GetSimpleStat();
        this.setState({isVisible: true});
    }

    getQuantityRPD = () => {
        this.props.actions.GetQuantityRPD();
        this.setState({isVisible: true});
    }

    getRPDwithoutSU = () => {
        this.props.actions.GetRPDwithoutSU();
        this.setState({isVisible: true});
    }

    getRPDinSU = () => {
        this.props.actions.GetRPDinSU();
        this.setState({isVisible: true, page: 0, expandend: null, height: "2500px"});
    }

    getRPDinAP = () => {
        this.props.actions.GetRPDinAP();
        this.setState({isVisible: true,  page: 0});
    }

    getRPDinSEMESTER = () => {
        this.props.actions.GetRPDinSEMESTER();
        this.setState({isVisible: true,  page: 0, height: "1200px"});
    }

    handleChangeSearchQuery = (query: string):void => {
        let changeAP = this.props.AP.filter((AP: any) =>AP.label.toLowerCase().includes(query.toLowerCase()));
        this.setState({AP:changeAP});
    }

    handleChangeSearchQuerySU = (query: string):void => {
        let changeSU = this.props.SU.filter((SU: any) =>SU.label.toLowerCase().includes(query.toLowerCase()));
        this.setState({SU:changeSU});
    }

    сhangeAP = (value: string|number): void => {
        this.props.actions.ChangeAP(value);
    }

    сhangeSU = (value: string|number): void => {
        this.props.actions.ChangeSU(value);
    }

    renderQualityReportChartFirst = (SIMPLE_STATE: any): ReactElement | undefined => {
        if(Number(SIMPLE_STATE['rpd_with_editors'])) {
            return <QualityReportChart
                    title={'Статус РПД'}
                    labels={['РПД, имеющие редакторов','РПД на экспертизе', 'Одобренные РПД', 'РПД в работе']}
                    data={[
                        Number(SIMPLE_STATE['rpd_with_editors']),
                        Number( SIMPLE_STATE['rpd_on_expertise']),
                        Number( SIMPLE_STATE['rpd_approved']),
                        Number( SIMPLE_STATE['rpd_in_work'])
                    ]}
                    colors={[
                        'rgba(255, 156, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ]}
                />
        }
             
    }
    renderQualityReportChartSecond = (SIMPLE_STATE: any): ReactElement | undefined => {
        if(Number(SIMPLE_STATE['registered_users'])) {
            return (
                <QualityReportChart
                    title={'Статус пользователя'}
                    labels={['Зарегестрированных пользователей','Пользователей РПД']}
                    data={[
                        Number(SIMPLE_STATE['registered_users']),
                        Number( SIMPLE_STATE['users_in_rpd'])
                    ]}
                    colors={[
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ]}
                />
            )
        }
    }

    render() {
        const {
            classes,
            SIMPLE_STATE,
            QUALIFICATION,
            QUANTITY_RPD,
            YEAR,
            YEARS_ALL,
            QUANTITY_OP,
            QUANTITY_OP_ALL,
            RPD_WITHOUT_SU,
            STATUS,
            RPD_IN_SU,
            SEMESTER,
            SU,
            AP,
            APuse,
            RPD_IN_AP,
            SUuse,
            RPD_IN_SEMESTER
        } = this.props;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Отчёты
                </Typography>
                <FormControl variant="outlined">
                    <InputLabel>Выберите тип отчёта</InputLabel>
                    <Select className={classes.field}
                            label="Выберите тип отчёта"
                            value={this.state.value}
                            onChange={this.handleChange}
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
                        <MenuItem value="1">Отчёт о качестве РПД</MenuItem>
                        <MenuItem value="2">Отчёт о количестве РПД (по квалификации)</MenuItem>
                        <MenuItem value="3">Отчёт о количестве ОП (по квалификации и годам)</MenuItem>
                        <MenuItem value="4">Отчёт о РПД без структурного подразделения</MenuItem>
                        <MenuItem value="6">Отчёт о РПД на семестр</MenuItem>
                        <MenuItem value="7">Отчёт о РПД и по учебному плану</MenuItem>
                    </Select>
                </FormControl>
                {this.state.value == 1 &&
                <Button
                    onClick={this.getSimpleStat}
                    variant="contained"
                    color="primary"
                    disableElevation
                    className={classes.Btn}
                >
                    Получить отчёт
                </Button>
                }
                <div style={{display: 'flex'}}>
                    {this.state.isVisible
                        && this.state.value == 1
                            && this.renderQualityReportChartFirst(SIMPLE_STATE)}
                                        
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {(this.state.isVisible
                        && this.state.value == 1
                            && this.renderQualityReportChartSecond(SIMPLE_STATE))}
                </div>

                {this.state.value == 2 &&
                <>
                    <FormControl variant="outlined">
                        <QuantityReportCharts />
                    </FormControl>
                </>
                }
                {this.state.isVisible && this.state.value == 2 &&
                <>
                    <Typography>Количество РПД по заданной квалификации: {QUANTITY_RPD['quantity']}</Typography>
                </>

                }
                {this.state.value == 3 &&
                <>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {QUANTITY_OP_ALL['bachelor']?.length === 4 && <TotalOPReport
                          classes={{recordChart: 'recordChart'}}
                          labels={YEARS_ALL}
                          title={`Образовательная программа бакалавриат`}
                          data={QUANTITY_OP_ALL['bachelor']?.map((quantityItem: {quantity: number} ) => quantityItem.quantity)}
                        />}
                        {QUANTITY_OP_ALL['master']?.length === 4 && <TotalOPReport
                          classes={{recordChart: 'recordChart'}}
                          labels={YEARS_ALL}
                          title={`Образовательная программа магистратура`}
                          data={QUANTITY_OP_ALL['master']?.map((quantityItem: {quantity: number} ) => quantityItem.quantity)}
                        />}
                        {QUANTITY_OP_ALL['specialist']?.length === 4 && <TotalOPReport
                          classes={{recordChart: 'recordChart'}}
                          labels={YEARS_ALL}
                          title={`Образовательная программа магистратура`}
                          data={QUANTITY_OP_ALL['specialist']?.map((quantityItem: {quantity: number} ) => quantityItem.quantity)}
                        />}
                    </div>
                </>
                }
                {this.state.value == 4 &&
                <Button
                    onClick={this.getRPDwithoutSU}
                    variant="contained"
                    color="primary"
                    disableElevation className={classes.Btn}>
                    Получить отчёт
                </Button>
                }
                {this.state.isVisible && this.state.value == 4 &&
                <>

                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell style={{width: "25%"}}>
                                        Код
                                    </TableCell>
                                    <TableCell style={{width: "50%"}}>
                                        Название
                                    </TableCell>
                                    <TableCell style={{width: "25%"}}>
                                        Авторский состав
                                    </TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {RPD_WITHOUT_SU.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((workProgram: any) =>
                                    <TableRow key={workProgram.id}>
                                        <TableCell>
                                            {workProgram.discipline_code}
                                        </TableCell>
                                        <TableCell className={classes.link}>
                                            <Link target="_blank" to={appRouter.getWorkProgramLink(workProgram.id)}>
                                                {workProgram.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {workProgram.editors.map((editors: any) =>
                                                <>{editors.first_name} {editors.last_name}; </>
                                            )}
                                        </TableCell>

                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                    </div>

                    <div className={classes.footer}>
                        <TablePagination count={RPD_WITHOUT_SU["length"]}
                                         component="div"
                                         page={this.state.page}
                                         rowsPerPageOptions={[]}
                                         onChangePage={this.handleChangePage}
                                         rowsPerPage={this.state.rowsPerPage}
                                         onChangeRowsPerPage={() => {
                                         }}
                        />

                    </div>
                </>}

                <RecordsPagesRPDSemester
                  classNamesSearchSelector={classes.field}
                  classNamesSelectYear={classes.field}
                  classNamesSelectSemester={classes.field}
                  classNamesRadioGroup={classes.field}
                  classNamesButton={classes.Btn}
                  classNamesTableWrap={classes.tableWrap}
                  classNamesHeader={classes.header}
                  classNamesLink={classes.link}
                  classNamesFooter={classes.footer}
                  YEAR={YEAR}
                  SEMESTER={SEMESTER}
                  STATUS={STATUS}
                  RPD_IN_SEMESTER={RPD_IN_SEMESTER}
                  changeYear={this.changeYear}
                  changeSU={this.сhangeSU}
                  changeSemester={this.сhangeSemester}
                  changeStatus={this.сhangeStatus}
                  getRPDinSEMESTER={this.getRPDinSEMESTER}
                  handleChangePage={this.handleChangePage}
                  handleChangeSearchQuerySU={this.handleChangeSearchQuerySU}
                  list={this.state.SU}
                  value={this.state.value}
                  isVisible={this.state.isVisible}
                  SU={this.state.SU}
                  page={this.state.page}
                  rowsPerPage={this.state.rowsPerPage}
                  SUuse={SUuse}

                />
                {this.state.value == 7 &&
                    <>
                <SearchSelector
                    label='Выберите учебный план'
                    changeSearchText={this.handleChangeSearchQuery}
                    list={this.state.AP}
                    changeItem={(value: string) => this.сhangeAP(value)}
                    value={APuse}
                    valueLabel={''}
                    className={classes.field}



                />
                    <Button
                    onClick={this.getRPDinAP}
                    variant="contained"
                    color="primary"
                    disableElevation className={classes.Btn}>
                    Получить отчёт
                    </Button>
                    </>
                }
                {this.state.value == 7 && this.state.isVisible && RPD_IN_AP.length > 0 &&
                <>

                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell style={{width: "25%"}}>
                                        Код
                                    </TableCell>
                                    <TableCell style={{width: "50%"}}>
                                        Название
                                    </TableCell>
                                    <TableCell style={{width: "25%"}}>
                                        Авторский состав
                                    </TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {RPD_IN_AP.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((workProgram: any) =>
                                    <TableRow key={workProgram.id}>
                                        <TableCell>
                                            {workProgram.discipline_code}
                                        </TableCell>
                                        <TableCell className={classes.link}>
                                            <Link target="_blank" to={appRouter.getWorkProgramLink(workProgram.id)}>
                                                {workProgram.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {workProgram.editors.map((editors: any) =>
                                                <>{editors.first_name} {editors.last_name}; </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className={classes.footer}>
                        <TablePagination count={RPD_IN_AP.length}
                                         component="div"
                                         page={this.state.page}
                                         onChangePage={this.handleChangePage}
                                         rowsPerPage={this.state.rowsPerPage}
                        />
                    </div>
                </>}
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(Records));