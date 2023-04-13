import React, {useState} from 'react'
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import useStyles from "./RepresentativesOrganizations.style";
import useStylesReusable from "../CompetencesTable/CompetencesTable.style";
import Button from "@material-ui/core/Button";
import {AddRepresentativesOrganizations} from "../AddRepresentativesOrganizations/AddRepresentativesOrganizations";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import {getEducationalProgramCharacteristicCanEdit} from "../../getters";

export const RepresentativesOrganizations = ({ list }: any) => {
  const canEdit = useSelector((state: any) => getEducationalProgramCharacteristicCanEdit(state))

  const [openAddRepresentativeOrganization, setOpenAddRepresentativeOrganization] = useState<any>(false)
  const classes = {
    ...useStylesReusable(),
    ...useStyles()
  };
  const dispatch = useDispatch();

  const createRepresentativeOrganization = (data: any) => {
    setOpenAddRepresentativeOrganization(false);
    dispatch(actions.addNewRepresentative(data));
  }

  const updateRepresentativeOrganization = (data: any) => {
    setOpenAddRepresentativeOrganization(false);
    dispatch(actions.updateRepresentative({
      data,
      id: openAddRepresentativeOrganization?.id,
    }));
  }

  const deleteRepresentativeOrganization = (id: number) => () => {
    dispatch(actions.deleteRepresentative(id));
  }

  return (
    <>
      <div className={classes.root}>
        <Table stickyHeader size='small'>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>
                Наименование организации
              </TableCell>
              <TableCell>
                Позиция представителя
              </TableCell>
              <TableCell>
                ФИО представителя
              </TableCell>
              {canEdit ? <TableCell /> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.organization_name}
                </TableCell>
                <TableCell>
                  {item.employer_position}
                </TableCell>
                <TableCell>
                  {item.fio_employer}
                </TableCell>
                {canEdit ? (
                  <TableCell className={classes.actions}>
                    <Tooltip title="Изменить">
                      <IconButton onClick={() => setOpenAddRepresentativeOrganization(item)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton onClick={deleteRepresentativeOrganization(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {canEdit ? (
          <Button className={classes.addButton}
                onClick={() => setOpenAddRepresentativeOrganization(true)}
                variant="outlined"
                size="small"
          >
            Добавить нового представителя
          </Button>
        ) : null}

        {openAddRepresentativeOrganization ? (
          <AddRepresentativesOrganizations
            closeDialog={() => setOpenAddRepresentativeOrganization(false)}
            isOpen={openAddRepresentativeOrganization}
            saveDialog={openAddRepresentativeOrganization?.id ? updateRepresentativeOrganization : createRepresentativeOrganization}
            defaultValues={openAddRepresentativeOrganization}
          />
        ) : null}
      </div>
    </>
  )
}