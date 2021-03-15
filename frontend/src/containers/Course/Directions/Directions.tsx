import React from 'react'

import Typography from '@material-ui/core/Typography'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import TablePagination from '@material-ui/core/TablePagination'
import Scrollbars from 'react-custom-scrollbars'
import SortingButton from "../../../components/SortingButton"

import { useStyles } from './Directions.styles'

export const Directions: React.FC = () => {
  const classes = useStyles()
  const directions = [
    { name: 'Информатика и вычислительная техника', number:'09.03.01' },
    { name: 'Информационные системы и технологии', number:'09.03.02' },
    { name: 'Прикладная информатика', number:'09.03.03' },
  ]
  return (
    <div>
      <Typography className={classes.title}>Направления подготовки</Typography>
      <Typography><b>Направления</b></Typography>
      <Scrollbars style={{height: 'calc(100vh - 365px)'}}>
        <div className={classes.tableWrap}>
          <Table stickyHeader size='small'>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>
                  Название
                  <SortingButton changeMode={() => {}} mode='' />
                </TableCell>
                <TableCell>
                  Номер
                  <SortingButton changeMode={() => {}} mode='' />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {directions.map((direction: any) => (
                <TableRow key={direction.number}>
                  <TableCell>{direction.name}</TableCell>
                  <TableCell>{direction.number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Scrollbars>
      <div className={classes.footer}>
        <TablePagination 
          count={20}
          component="div"
          page={1 - 1}
          rowsPerPageOptions={[]}
          onChangePage={() => {}}
          //@ts-ignore
          rowsPerPage={10}
          onChangeRowsPerPage={()=>{}}
        />
      </div>
    </div>
  )
}