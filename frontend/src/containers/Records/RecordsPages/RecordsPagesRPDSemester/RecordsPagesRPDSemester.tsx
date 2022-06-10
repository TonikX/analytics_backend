import SearchSelector from '../../../../components/SearchSelector/SearchSelector';
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TableCell
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';
import { appRouter } from '../../../../service/router-service';
import TablePagination from '@material-ui/core/TablePagination';
import React from 'react';
import { SelectorItemType } from '../../../../components/SearchSelector/types';

interface IProps {
  handleChangeSearchQuerySU: (query: string) => void
  handleChangePage:(event: any, page: number) => void
  list: any
  SUuse: string|number
  classNamesSearchSelector: string
  classNamesSelectYear: string
  classNamesSelectSemester: string
  classNamesRadioGroup: string
  classNamesButton: string
  classNamesTableWrap: string
  classNamesHeader: string
  classNamesLink: string
  classNamesFooter: string
  YEAR: string
  SEMESTER: string
  STATUS: string
  RPD_IN_SEMESTER: any
  SU: Array<SelectorItemType>
  value: string | number
  isVisible: boolean
  rowsPerPage: number
  page: number
  changeYear: (event: any) => void
  changeSemester: (event: any) => void
  changeStatus: (event: any) => void
  getRPDinSEMESTER:(value: any) => void
  changeSU:(value: string) => void
}

const RecordsPagesRPDSemester = (props:IProps) => {
  const {
    handleChangeSearchQuerySU,
    handleChangePage,
    classNamesSearchSelector,
    classNamesSelectYear,
    classNamesSelectSemester,
    classNamesRadioGroup,
    classNamesButton,
    classNamesTableWrap,
    classNamesHeader,
    classNamesLink,
    classNamesFooter,
    YEAR,
    SEMESTER,
    STATUS,
    RPD_IN_SEMESTER,
    SU,
    changeYear,
    changeSU,
    changeSemester,
    changeStatus,
    getRPDinSEMESTER,
    value,
    isVisible,
    list,
    page,
    rowsPerPage,
    SUuse
  } = props


  return (
      <>
        <SearchSelector
          label='Выберите структурное подразделение'
          changeSearchText={handleChangeSearchQuerySU}
          list={list}
          changeItem={(value: string) => changeSU(value)}
          value={SUuse}
          valueLabel={''}
          className={classNamesSearchSelector}
        />
        <FormControl variant="outlined">
          <InputLabel>Выберите год учебного плана</InputLabel>
          <Select
            label="Выберите год учебного плана"
            value={YEAR}
            onChange={changeYear}
            className={classNamesSelectYear}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left"
              },
              getContentAnchorEl: null
            }}>
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2019">2019</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel>Выберите семестр</InputLabel>
          <Select
            label="Выберите семестр"
            value={SEMESTER}
            onChange={changeSemester}
            className={classNamesSelectSemester}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left"
              },
              getContentAnchorEl: null
            }}>
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="1">Первый семестр</MenuItem>
            <MenuItem value="2">Второй семестр</MenuItem>
            <MenuItem value="3">Третий семестр</MenuItem>
            <MenuItem value="4">Четвёртый семестр</MenuItem>
            <MenuItem value="5">Пятый семестр</MenuItem>
            <MenuItem value="6">Шестой семестр</MenuItem>
            <MenuItem value="7">Седьмой семестр</MenuItem>
            <MenuItem value="8">Восьмой семестр</MenuItem>
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Выберите статус РПД</FormLabel>
          <RadioGroup
            row aria-label="1"
            name="Status"
            value={STATUS}
            onChange={changeStatus}
            className={classNamesRadioGroup}>
            <FormControlLabel value="all" control={<Radio color="primary"/>} label="Все"/>
            <FormControlLabel value="EX" control={<Radio color="primary"/>} label="На экспертизе"/>
            <FormControlLabel value="AC" control={<Radio color="primary"/>} label="Одобрены"/>
            <FormControlLabel value="WK" control={<Radio color="primary"/>} label="В работе"/>
          </RadioGroup>
        </FormControl>
        <Button
          onClick={getRPDinSEMESTER}
          variant="contained"
          color="primary"
          disableElevation className={classNamesButton}>
          Получить отчёт
        </Button>
        {value == 6 && isVisible &&
        <>
          <div className={classNamesTableWrap}>
            <Table stickyHeader size='small'>
              <TableHead className={classNamesHeader}>
                <TableRow>
                  <TableCell style={{width: "25%"}}>
                    Код
                  </TableCell>
                  <TableCell style={{width: "50%"}}>
                    Название
                  </TableCell>
                  <TableCell style={{width: "25%"}}>
                    Авторский состав
                  </TableCell>
                  <TableCell/>
                </TableRow>
              </TableHead>

              <TableBody>
                {RPD_IN_SEMESTER.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((workProgram: any) =>
                  <TableRow key={workProgram.id}>
                    <TableCell>
                      {workProgram.discipline_code}
                    </TableCell>
                    <TableCell className={classNamesLink}>
                      <Link target="_blank" to={appRouter.getWorkProgramLink(workProgram.id)}>
                        {workProgram.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {workProgram.editors.map((editors: any) =>
                        <>{editors.first_name} {editors.last_name}; </>
                      )}
                    </TableCell>

                  </TableRow>
                )}
              </TableBody>

            </Table>
          </div>

          <div className={classNamesFooter}>
            <TablePagination
              count={RPD_IN_SEMESTER.length}
               component="div"
               page={page}
               rowsPerPageOptions={[]}
               onChangePage={handleChangePage}
               rowsPerPage={rowsPerPage}
               onChangeRowsPerPage={() => {}}
            />

          </div>
        </>}
      </>
  )
}

export default  RecordsPagesRPDSemester