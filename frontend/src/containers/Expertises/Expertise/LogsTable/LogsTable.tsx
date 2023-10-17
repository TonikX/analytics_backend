import React from "react";
import {useSelector} from "react-redux";
import {rootState} from "../../../../store/reducers";
import {getExpertiseLogAccept} from "../../getters";
import Table from "@mui/material/Table";
import TableBody from '@mui/material/TableBody';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useStyles} from './LogsTable.styles';
import moment from "moment";
import {FULL_DATE_FORMAT_WITH_TIME} from "../../../../common/utils";
import {LogItem} from "../../types";

const objectStatus = {
  RE: "Отправлена на доработку",
  AC: "Экспертиза принята",
  SE: "Отправлена на экспертизу",
}
export const LogsTable = () => {
  const classes = useStyles();
  const LogsTable = useSelector((state: rootState) => getExpertiseLogAccept(state))
  return (
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell>Дата</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>ИСУ ID</TableCell>
            <TableCell>Статус экспертизы</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {LogsTable.map((logItem: LogItem, index: number) => {
            //@ts-ignore
            const status = objectStatus[logItem?.action]
            return (
              <TableRow key={index}>
                <TableCell>{moment(logItem?.expertise?.approval_date).format(FULL_DATE_FORMAT_WITH_TIME)}</TableCell>
                <TableCell>{logItem?.user?.first_name}</TableCell>
                <TableCell>{logItem?.user?.isu_number}</TableCell>
                <TableCell>{status}</TableCell>
              </TableRow>
            )
          })}
          </TableBody>
      </Table>
  )
}
