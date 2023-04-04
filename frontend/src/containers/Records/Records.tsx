import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {appRouter} from "../../service/router-service";
import styles from './Records.styles';
import {
    Button,
    // ExpansionPanelDetails,
    FormControl,
    FormControlLabel,
    InputLabel, MenuItem,
    Paper,
    Radio,
    RadioGroup,
    TableCell
} from "@mui/material";
import Select from '@mui/material/Select';
import {RecordsProops} from "./types";
import connect from "./Records.connect";
import {withStyles} from "@mui/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import FormLabel from "@mui/material/FormLabel";
// import ExpansionPanelSummary from "@mui/material/ExpansionPanelSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpansionPanel from '@mui/material/ExpansionPanel';
import SearchSelector from "../../components/SearchSelector";


class Records extends Component<RecordsProops> {
    state = {
        value: 1,
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

    getQuantityOP = () => {
        this.props.actions.GetQuantityOP();
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

    render() {
        const {
            classes,
            SIMPLE_STATE,
            QUALIFICATION,
            QUANTITY_RPD,
            YEAR,
            QUANTITY_OP,
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

        const style = {height: this.state.height};

        return (
            <Paper className={classes.root} style={style}>
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
                        <MenuItem value="5">Отчёт о РПД в структурных подразделениях</MenuItem>
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
                {this.state.isVisible && this.state.value == 1 &&
                <Typography>
                    <p>Зарегестрированных пользователей: {SIMPLE_STATE['registered_users']}</p>
                    <p>Пользователей РПД: {SIMPLE_STATE['users_in_rpd']}</p>
                    <p>РПД, имеющие редакторов: {SIMPLE_STATE['rpd_with_editors']}</p>
                    <p>РПД на экспертизе: {SIMPLE_STATE['rpd_on_expertise']}</p>
                    <p>Одобренные РПД: {SIMPLE_STATE['rpd_approved']}</p>
                    <p>РПД в работе: {SIMPLE_STATE['rpd_in_work']}</p>
                </Typography>

                }
                {this.state.value == 2 &&
                <>
                    <FormControl variant="outlined">
                        <InputLabel>Выберите квалификацию</InputLabel>
                        <Select className={classes.field}
                                label="Выберите квалификацию"
                                value={QUALIFICATION}
                                onChange={this.changeQual}
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
                                }}
                        >
                            <MenuItem value="bachelor">Бакалавриат</MenuItem>
                            <MenuItem value="master">Магистратура</MenuItem>
                            <MenuItem value="specialist">Специалитет</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={this.getQuantityRPD} variant="contained" color="primary" disableElevation
                            className={classes.Btn}>Получить отчёт</Button>
                </>
                }
                {this.state.isVisible && this.state.value == 2 &&
                <>
                    <Typography>Количество РПД по заданной квалификации: {QUANTITY_RPD['quantity']}</Typography>
                </>

                }
                {this.state.value == 3 &&
                <>
                    <FormControl variant="outlined">
                        <InputLabel>Выберите квалификацию</InputLabel>
                        <Select
                            label="Выберите квалификацию"
                            value={QUALIFICATION}
                            onChange={this.changeQual}
                            className={classes.field}
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
                            }}
                        >
                            <MenuItem value="bachelor">Бакалавриат</MenuItem>
                            <MenuItem value="master">Магистратура</MenuItem>
                            <MenuItem value="specialist">Специалитет</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>Выберите год</InputLabel>
                        <Select
                            label="Выберите год"
                            value={YEAR}
                            onChange={this.changeYear}
                            className={classes.field}
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
                            }}
                        >
                            <MenuItem value="2021">2021</MenuItem>
                            <MenuItem value="2020">2020</MenuItem>
                            <MenuItem value="2019">2019</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        onClick={this.getQuantityOP}
                        variant="contained"
                        color="primary"
                        disableElevation className={classes.Btn}>
                        Получить отчёт
                    </Button>
                </>
                }
                {this.state.isVisible && this.state.value == 3 &&
                <>
                    <Typography>Количество ОП по заданной квалификации и году: {QUANTITY_OP['quantity']}</Typography>
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
                {this.state.value == 5 &&
                <>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Выберите статус РПД</FormLabel>
                        <RadioGroup row aria-label="1" name="Status" value={STATUS} onChange={this.сhangeStatus}
                                    className={classes.field}>
                            <FormControlLabel value="all" control={<Radio color="primary"/>} label="Все"/>
                            <FormControlLabel value="EX" control={<Radio color="primary"/>} label="На экспертизе"/>
                            <FormControlLabel value="AC" control={<Radio color="primary"/>} label="Одобрены"/>
                            <FormControlLabel value="WK" control={<Radio color="primary"/>} label="В работе"/>
                        </RadioGroup>
                    </FormControl>
                    <Button
                        onClick={this.getRPDinSU}
                        variant="contained"
                        color="primary"
                        disableElevation className={classes.Btn}>
                        Получить отчёт
                    </Button>
                </>
                }
                {this.state.isVisible && this.state.value == 5 &&
                <div>
                    {RPD_IN_SU.filter((SU: any) => SU.work_programs.length > 0).map((SU: any) =>
                      <></>
                        // <ExpansionPanel expanded={this.state.expandend === SU.id}
                        //                 onChange={this.handleChangePanel(SU.id)} style={{width: "100%"}}>
                        //     <ExpansionPanelSummary
                        //         className={classes.accordionSummary}
                        //         expandIcon={<ExpandMoreIcon/>}
                        //     >
                        //         <Typography>{SU.title} </Typography>
                        //     </ExpansionPanelSummary>
                        //     <ExpansionPanelDetails>
                        //         <>
                        //             <div className={classes.tableWrap} style={{width: "100%"}}>
                        //                 <Table>
                        //                     <TableHead className={classes.header}>
                        //                         <TableRow>
                        //                             <TableCell style={{width: "25%"}}>
                        //                                 Код
                        //                             </TableCell>
                        //                             <TableCell style={{width: "50%"}}>
                        //                                 Название
                        //                             </TableCell>
                        //                             <TableCell style={{width: "25%"}}>
                        //                                 Авторский состав
                        //                             </TableCell>
                        //                             <TableCell/>
                        //                         </TableRow>
                        //                     </TableHead>
                        //
                        //                     <TableBody>
                        //                         {SU.work_programs.slice(this.state.page * this.state.rowsPerPage,
                        //                             this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((workProgram: any) =>
                        //                             <TableRow key={workProgram.id}>
                        //                                 <TableCell>
                        //                                     {workProgram.discipline_code}
                        //                                 </TableCell>
                        //                                 <TableCell className={classes.link}>
                        //                                     <Link target="_blank" to={appRouter.getWorkProgramLink(workProgram.id)}>
                        //                                         {workProgram.title}
                        //                                     </Link>
                        //                                 </TableCell>
                        //                                 <TableCell>
                        //                                     {workProgram.editors.map((editors: any) =>
                        //                                         <>{editors.first_name} {editors.last_name}; </>
                        //                                     )}
                        //                                 </TableCell>
                        //
                        //                             </TableRow>
                        //                         )}
                        //                     </TableBody>
                        //
                        //                 </Table>
                        //                 <div className={classes.footer}>
                        //                     <TablePagination count={SU.work_programs.length}
                        //                                      component="div"
                        //                                      page={this.state.page}
                        //                                      rowsPerPageOptions={[]}
                        //                                      onChangePage={this.handleChangePage}
                        //                                      rowsPerPage={this.state.rowsPerPage}
                        //                                      onChangeRowsPerPage={() => {
                        //                                      }}
                        //                     />
                        //                 </div>
                        //             </div>
                        //         </>
                        //     </ExpansionPanelDetails>
                        // </ExpansionPanel>
                    )}
                </div>
                }
                {this.state.value == 6 &&
                <>
                    <SearchSelector
                        label='Выберите структурное подразделение'
                        changeSearchText={this.handleChangeSearchQuerySU}
                        list={this.state.SU}
                        changeItem={(value: string) => this.сhangeSU(value)}
                        value={SUuse}
                        valueLabel={''}
                        className={classes.field}



                    />
                    <FormControl variant="outlined">
                        <InputLabel>Выберите год учебного плана</InputLabel>
                        <Select
                            label="Выберите год учебного плана"
                            value={YEAR}
                            onChange={this.changeYear}
                            className={classes.field}
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
                            <MenuItem value="all">Все</MenuItem>
                            <MenuItem value="2021">2021</MenuItem>
                            <MenuItem value="2020">2020</MenuItem>
                            <MenuItem value="2019">2019</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>Выберите семестр</InputLabel>
                        <Select
                            label="Выберите семестр"
                            value={SEMESTER}
                            onChange={this.сhangeSemester}
                            className={classes.field}
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
                            <MenuItem value="all">Все</MenuItem>
                            <MenuItem value="1">Первый семестр</MenuItem>
                            <MenuItem value="2">Второй семестр</MenuItem>
                            <MenuItem value="3">Третий семестр</MenuItem>
                            <MenuItem value="4">Четвёртый семестр</MenuItem>
                            <MenuItem value="5">Пятый семестр</MenuItem>
                            <MenuItem value="6">Шестой семестр</MenuItem>
                            <MenuItem value="7">Седьмой семестр</MenuItem>
                            <MenuItem value="8">Восьмой семестр</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Выберите статус РПД</FormLabel>
                        <RadioGroup row aria-label="1" name="Status" value={STATUS} onChange={this.сhangeStatus}
                                    className={classes.field}>
                            <FormControlLabel value="all" control={<Radio color="primary"/>} label="Все"/>
                            <FormControlLabel value="EX" control={<Radio color="primary"/>} label="На экспертизе"/>
                            <FormControlLabel value="AC" control={<Radio color="primary"/>} label="Одобрены"/>
                            <FormControlLabel value="WK" control={<Radio color="primary"/>} label="В работе"/>
                        </RadioGroup>
                    </FormControl>
                    <Button
                        onClick={this.getRPDinSEMESTER}
                        variant="contained"
                        color="primary"
                        disableElevation className={classes.Btn}>
                        Получить отчёт
                    </Button>
                </>
                }
                {this.state.value == 6 && this.state.isVisible &&
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
                            {RPD_IN_SEMESTER.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((workProgram: any) =>
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
                    <TablePagination count={RPD_IN_SEMESTER.length}
                                     component="div"
                                     page={this.state.page}
                                     rowsPerPageOptions={[]}
                                     onChangePage={this.handleChangePage}
                                     rowsPerPage={this.state.rowsPerPage}
                                     onChangeRowsPerPage={() => {
                                     }}
                    />

                </div>
                </>
                }
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

//@ts-ignore
export default connect(withStyles(styles)(Records));