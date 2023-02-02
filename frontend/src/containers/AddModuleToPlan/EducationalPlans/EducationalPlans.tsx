import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Search from "../../../components/Search/Search";
import Scrollbars from "react-custom-scrollbars";
import Table from "@material-ui/core/Table";
import cn from 'classnames';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Checkbox} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import {useStyles} from "../AddModuleToPlan.styles";
import actions from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../../store/reducers";
import {getCurrentPlansPage, getEducationalPlans, getPlansAllCount, getSelectedPlans} from "../getters";
import {EducationalPlanListType} from "../../EducationalPlan/types";
import {EducationalPlanFields} from "../../EducationalPlan/enum";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import get from "lodash/get";

export const EducationalPlans = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectAll, setSelectAll] = useState(false);

    const educationalPlans = useSelector((state: rootState) => getEducationalPlans(state));
    const currentPage = useSelector((state: rootState) => getCurrentPlansPage(state));
    const plansAllCount = useSelector((state: rootState) => getPlansAllCount(state));
    const selectedPlans = useSelector((state: rootState) => getSelectedPlans(state));

    useEffect(() => {
        dispatch(actions.getEducationalPlan());
    }, []);

    const handleSearch = (value: string) => {
        dispatch(actions.setPlansSearchQuery(value));
        dispatch(actions.setSelectedPlans([]));
        dispatch(actions.getEducationalPlan());
    };

    const selectPlan = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const checked = event.target.checked;
        const newArray = checked ? [...selectedPlans, id] : selectedPlans.filter((it) => it !== id);
        dispatch(actions.setSelectedPlans(newArray));
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        dispatch(actions.changePlansCurrentPage(page + 1));
        dispatch(actions.getEducationalPlan());
    };

    const handleSelectAll = (_event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = !selectAll;
        setSelectAll(newValue);
        dispatch(actions.setSelectAll(newValue));
    };

     return (
        <>
            <Typography variant="h6" className={classes.textItem}>
                Выберите учебные планы
            </Typography>
            <div className={cn(classes.marginBottom, classes.plansControls)}>
                <Search handleChangeSearchQuery={handleSearch}/>
                <FormControlLabel
                    control={<Checkbox checked={selectAll} onChange={handleSelectAll}/>}
                    label="Выбрать все для 2023 года"
                />
            </div>
            <Scrollbars>
                <div className={classes.tableWrap}>
                    <Table stickyHeader size='small' className={classes.table}>
                        <TableHead className={classes.header}>
                            <TableRow>
                                <TableCell>
                                    Название ОП / Год набора / Направление
                                </TableCell>
                                <TableCell>
                                    Выбрать
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {educationalPlans.map((educationalPlan: EducationalPlanListType, index: number) => {
                                const opTitle = get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.TITLE], '');
                                const title = get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.FIELD_OF_STUDY, 0, EducationalPlanFields.TITLE], '');
                                const number = get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.FIELD_OF_STUDY, 0, EducationalPlanFields.NUMBER], '');
                                const year = get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.YEAR], '');

                                const info = `${opTitle} / ${year} / ${title} ${number}`;
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {info}
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox checked={selectAll || selectedPlans.includes(educationalPlan.id)}
                                                      onChange={(event) => selectPlan(event, educationalPlan.id)}/>
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
                    count={Math.ceil(plansAllCount / 10)}
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
