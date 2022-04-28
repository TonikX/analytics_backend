import React, {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

import actions from '../../actions'
import useStyles from './TasksTable.style';
import EditableText from "../../../../components/EditableText/EditableText";
import get from "lodash/get";

export const TasksTable: React.FC<any> = ({ tableData }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [editNameId, setEditNameId] = useState()

  const handleAddTask = () => {
    dispatch(actions.educationalStandardAddTask('Новая задача'))
  }

  const deleteTask = (id: number) => {
    dispatch(actions.educationalStandardDeleteTask(id))
  }

  const editTask = useCallback((value) => {
    dispatch(actions.educationalStandardUpdateTask({
      name: value,
      id: editNameId
    }))
    setEditNameId(undefined)
  }, [editNameId])

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
                <EditableText value={get(item, 'name')}
                              isEditMode={editNameId === item.id}
                              onClickDone={editTask}
                              onClickCancel={() => setEditNameId(undefined)}
                              onValueClick={() => setEditNameId(item.id)}
                              fullWidth
                />
              </TableCell>
              <TableCell className={classes.actions}>
                <Tooltip title="Удалить тип">
                  <DeleteIcon className={classes.deleteIcon} onClick={() => deleteTask(item.id)} />
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button className={classes.addButton}
              onClick={handleAddTask}
              variant="outlined"
              size="small"
      >
        Добавить новую задачу
      </Button>
    </div>
  )
};

export default TasksTable