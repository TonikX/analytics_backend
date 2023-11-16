import React from "react";
import { useSelector } from 'react-redux';
import {getTrainingModule} from "../getters";
import {rootState} from "../../../../store/reducers";
import { useStyles } from './PlansWithModuleData.styles';

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {statusPlansIncluded} from "../constants";
import {specializationObject} from "../../../WorkProgram/constants";


export const PlansWithModuleData = () => {
  const module: any = useSelector((state: rootState) => getTrainingModule(state));
  const classes = useStyles()

  return (
    <Table stickyHeader size='small'>
      <TableHead>
        <TableRow>
          <TableCell className={classes.headerCell}>
            Учебный план
          </TableCell>
          <TableCell className={classes.headerCell}>
            Направление
          </TableCell>
          <TableCell className={classes.headerCell}>
            Квалификация
          </TableCell>
          <TableCell className={classes.headerCell}>
            Статус
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {module?.plans_included?.map((plan: any) => (
            <TableRow key={plan.id}>
              <TableCell>
                {plan?.title + ' ' + plan?.year}
              </TableCell>
              <TableCell>
                {plan?.field_of_study?.[0]?.title + ' ' + plan?.field_of_study?.[0]?.number}
              </TableCell>
              <TableCell>
                {specializationObject[plan?.field_of_study?.[0]?.qualification]}
              </TableCell>
              <TableCell>
                {statusPlansIncluded[plan?.on_check]}
              </TableCell>
            </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
