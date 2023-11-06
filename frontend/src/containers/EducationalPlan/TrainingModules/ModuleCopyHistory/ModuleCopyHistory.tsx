import React, {useState} from "react";
import {StepsEnum, TrainingModuleFields} from "../enum";
import {Link} from "react-router-dom";
import {getTrainingModule} from "../getters";
import {useSelector} from "react-redux";
import {rootState} from "../../../../store/reducers";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { useStyles } from './ModuleCopyHistory.styles';
import moment from "moment";
import {FULL_DATE_FORMAT_WITH_TIME} from "../../../../common/utils";
import {appRouter} from "../../../../service/router-service";
import {TrainingModuleType} from "../types";

const ModuleCopyHistory = () => {
  //@ts-ignore
  const trainingModule : TrainingModuleType = useSelector((state: rootState) => getTrainingModule(state))
  const classes = useStyles()

  return (
    <>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}>
              Номер копирования
            </TableCell>
            <TableCell className={classes.headerCell}>
              Дата копирования
            </TableCell>
            <TableCell className={classes.headerCell}>
              ID модуля с которого копия
            </TableCell>
            <TableCell className={classes.headerCell}>
              ID пользователя
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainingModule?.clone_info_json?.map((clone) => {
             return (
               <TableRow key={clone.counter}>
                 <TableCell>
                   {clone?.counter}
                 </TableCell>
                 <TableCell>
                   {moment(clone?.date).format(FULL_DATE_FORMAT_WITH_TIME)}
                 </TableCell>
                 <TableCell>
                   <Link className={classes.workProgramLink}
                         to={appRouter.getTrainingModuleDetailLink(clone?.from_copy_id)}
                         target="_blank"
                   >
                    {clone?.from_copy_id}
                   </Link>
                 </TableCell>
                 <TableCell>
                   {clone?.user_id}
                 </TableCell>
               </TableRow>
             )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default ModuleCopyHistory;
