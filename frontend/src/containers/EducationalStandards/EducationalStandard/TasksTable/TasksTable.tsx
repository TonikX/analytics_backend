import React from 'react'
import {useDispatch} from 'react-redux';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";

import useStyles from './TasksTable.style';

export const TasksTable: React.FC<any> = ({ tableData }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Table stickyHeader size='small'>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.categoryCell}>
              Тип профессиональной задачи
            </TableCell>
            <TableCell className={classes.actions} />
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item: any) => (
            <TableRow>
              <TableCell>
                {item.name}
              </TableCell>
              <TableCell className={classes.actions}>
                <Tooltip title="Удалить тип">
                  <DeleteIcon className={classes.deleteIcon} onClick={() => {}} />
                </Tooltip>
                <Tooltip title="Редактировать тип">
                  <EditIcon className={classes.deleteIcon} onClick={() => {}} />
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button className={classes.addButton}
              onClick={() => {}}
              variant="outlined"
              size="small"
      >
        Добавить новую задачу
      </Button>
    </div>
  )
};

export default TasksTable