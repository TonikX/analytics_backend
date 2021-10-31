import * as React from "react";
import {dodProfileProps} from "./types";
import connect from "./DodProfile.connect";
import {Typography} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from "../DodProfile/DodProfile.styles";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Pagination from '@material-ui/lab/Pagination';
import {specializationObject} from "../WorkProgram/constants";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Switch from "@material-ui/core/Switch";
import {filterFields} from "../WorkProgramList/enum";

class DodProfile extends React.Component<dodProfileProps> {

    componentDidMount() {
        this.props.actions.getDodWorkProgramsList()
    };

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getDodWorkProgramsList();
    };


    changeTableMode =  (event: any, newValue: any) => {
        this.props.actions.changeTableMode(newValue);
    }


    render() {


        const {workProgramList, classes, currentPage, allCount, tableMode} = this.props;

        return (
            <Paper className={classes.root}>

                <Typography className={classes.title}> hello
                    <Tabs value={tableMode}
                          onChange={this.changeTableMode}
                          indicatorColor="primary"
                                          >
                        <Tab
                             value={1}
                             label="я эксперт"/>
                        <Tab
                             value={2}
                             label="я редактор"/>
                    </Tabs>
                </Typography>

                <div className={classes.tableWrap}>
                    <Table stickyHeader size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Код
                                </TableCell>
                                <TableCell>
                                    Название
                                </TableCell>
                                <TableCell>
                                    Авторский состав
                                </TableCell>
                                <TableCell>
                                    Уровень образования
                                </TableCell>
                                <TableCell>
                                    Дата
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {workProgramList.map((item: any) =>
                                <TableRow>
                                    <TableCell> {item.discipline_code}  </TableCell>
                                    <TableCell> {item.title}  </TableCell>
                                    <TableCell> {item.authors} </TableCell>
                                    <TableCell> {specializationObject[item.qualification]}</TableCell>
                                    <TableCell> {item.approval_date}  </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className={classes.footer}>
                    <Pagination count={Math.ceil(allCount / 10)}
                                page={currentPage}
                                onChange={this.handleChangePage}
                                color="primary"
                    />
                </div>


            </Paper>
        )
    }
}


export default connect(withStyles(styles)(DodProfile));


