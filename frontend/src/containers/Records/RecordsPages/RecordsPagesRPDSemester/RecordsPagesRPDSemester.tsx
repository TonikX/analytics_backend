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
import React, { useEffect, useState } from 'react';
import { SelectorItemType } from '../../../../components/SearchSelector/types';
import RecordsPagesList from '../RecordsPagesList/RecordsPagesList';
import { useDispatch } from 'react-redux';
import actions from '../../actions';
import RecordsPagesRPDSemestrDiagram from './RecordsPagesRPDSemestrDiagram/RecordsPagesRPDSemestrDiagram';

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
  changeSU:(value: string|number) => void
}
const mapData = new Map()
const mapTitles = new Map()

const RecordsPagesRPDSemester = (props:IProps) => {
  const dispatch = useDispatch();

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

  interface IStructural {value: string, label: string}
  const [structuralList, setStructuralList] = useState<Array<IStructural>>([])
  const [isResetSearchSelector, setIsResetSearchSelector] = useState(false)

  const [yearsList, setYearsList] = useState<Array<IStructural>>([])

  function removeSUInRedux(value: Array<number>) {
    dispatch(actions.ChangeSU(value))
  }
  function removeYearInRedux(value: Array<string>) {
    dispatch(actions.changeYear(value))
  }


  if(Array.isArray(RPD_IN_SEMESTER) && RPD_IN_SEMESTER.length > 0) {
      mapData.clear()
      mapTitles.clear()

      interface ITitles {
        id: string
        title: string
      }

      const prepareArrayId: Array<number> = RPD_IN_SEMESTER.map((s) => s.id)
      const prepareArrayTitle: Array<ITitles> = RPD_IN_SEMESTER.map((s) => {
        return {
          id: s.id,
          title: s.title
        }
      })

      prepareArrayId.forEach((id) => {
        const currentIteration = prepareArrayId.reduce((acc, cur) => {
          if(id === cur) {
            return acc + 1
          } else  {
            return acc
          }
        }, 0)
        mapData.set(id, currentIteration)
      })

      prepareArrayTitle.forEach((obj: ITitles, idx) => {
        if(!mapTitles.has(obj.id)) {
          mapTitles.set(obj.id, obj.title)
        } else {
          return
        }
      })
    }

  return (
      <>
        <SearchSelector
          label='Выберите структурное подразделение'
          changeSearchText={handleChangeSearchQuerySU}
          list={list}
          changeItem={(value: string) => {
            setIsResetSearchSelector(false)
            changeSU(value)
            const findStructural = list.find((l: IStructural) => l.value === value)
            setStructuralList((prev) => {
              if(Array.isArray(prev)) {
                return [
                  ...prev, findStructural
                ]
              } else  {
                return []
              }
            })
          }}
          value={SUuse}
          valueLabel={''}
          isReset={isResetSearchSelector}
          className={classNamesSearchSelector}
        />
        <RecordsPagesList
          list={structuralList}
          setList={setStructuralList}
          removeItemInRedux={removeSUInRedux}
          resetValueControl={() => {
            changeSU(-1)
            setIsResetSearchSelector(true)
            dispatch(actions.ChangeSU([]))
          }}
        />
        <FormControl variant="outlined">
          <InputLabel>Выберите год учебного плана</InputLabel>
          <Select
            label="Выберите год учебного плана"
            value={YEAR}
            onChange={(e) => {
              changeYear(e)
              setYearsList((prev) => {
                if(Array.isArray(prev) && typeof e.target.value === 'string') {
                  return [
                    ...prev,
                    {
                      value: e.target.value,
                      label: e.target.value
                    }
                  ]
                } else  {
                  return []
                }
              })
            }}
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
            <MenuItem value="2020-2021">2020-2021</MenuItem>
            <MenuItem value="2019-2020">2019-2020</MenuItem>
          </Select>
        </FormControl>
        <RecordsPagesList
          list={yearsList}
          setList={setYearsList}
          removeItemInRedux={removeYearInRedux}
        />

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
        {mapData.size > 0 && <RecordsPagesRPDSemestrDiagram
          labels={Array.from(mapTitles.values())}
          data={mapData}
        />}
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
        </>
        }
      </>
  )
}

export default  RecordsPagesRPDSemester