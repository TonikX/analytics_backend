import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import Search from "../../../components/Search/Search";
import Scrollbars from "react-custom-scrollbars";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import {TrainingModuleType} from "../../EducationalPlan/TrainingModules/types";
import {TrainingModuleFields} from "../../EducationalPlan/TrainingModules/enum";
import {getUserFullName} from "../../../common/utils";
import {Checkbox} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import {useStyles} from "../AddModuleToPlan.styles";
import actions from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../../store/reducers";
import {getCurrentModulePage, getModulesAllCount, getSelectedModules, getTrainingModulesList} from "../getters";

export const Modules = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const trainingModules = useSelector((state: rootState) => getTrainingModulesList(state));
    const currentPage = useSelector((state: rootState) => getCurrentModulePage(state));
    const modulesAllCount = useSelector((state: rootState) => getModulesAllCount(state));
    const selectedModules = useSelector((state: rootState) => getSelectedModules(state));


    useEffect(() => {
        dispatch(actions.getTrainingModulesList());
    }, []);

    const handleSearch = (value: string) => {
        dispatch(actions.setModulesSearchQuery(value));
        dispatch(actions.setSelectedModules([]));
        dispatch(actions.changeModulesCurrentPage(1));
        dispatch(actions.getTrainingModulesList());
    };

    const selectModule = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const checked = event.target.checked;
        const newArray = checked ? [...selectedModules, id] : selectedModules.filter((it) => it !== id);
        dispatch(actions.setSelectedModules(newArray));
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        dispatch(actions.changeModulesCurrentPage(page + 1));
        dispatch(actions.getTrainingModulesList());
    };

     return (
        <>
            <Typography variant="h6" className={classes.textItem}>
                Выберите модули
            </Typography>
            <div className={classes.marginBottom}>
                <Search handleChangeSearchQuery={handleSearch}/>
            </div>
            <Scrollbars>
                <div className={classes.tableWrap}>
                    <Table stickyHeader size='small' className={classes.table}>
                        <TableHead className={classes.header}>
                            <TableRow>
                                <TableCell>
                                    ID
                                </TableCell>
                                <TableCell>
                                    Название / ISU ID / Редактора
                                </TableCell>
                                <TableCell>
                                    Выбрать
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trainingModules.map((trainingModule: TrainingModuleType, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {trainingModule[TrainingModuleFields.ID]}
                                        </TableCell>
                                        <TableCell>
                                            {trainingModule[TrainingModuleFields.NAME]}  / {trainingModule[TrainingModuleFields.ISU_ID]} / {trainingModule[TrainingModuleFields.EDITORS]?.map((editor) => getUserFullName(editor)).join(', ')}
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox checked={selectedModules.includes(trainingModule.id)}
                                                      onChange={(event) => selectModule(event, trainingModule.id)}/>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Scrollbars>
            <div>
                <TablePagination
                    count={Math.ceil(modulesAllCount / 10)}
                    component="div"
                    page={currentPage - 1}
                    rowsPerPageOptions={[]}
                    onChangePage={handleChangePage}
                    rowsPerPage={10}
                    onChangeRowsPerPage={() => {}}
                />
            </div>
        </>
    )
};
