import React, {useEffect, useRef, useState} from "react";
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import {useSelector} from "react-redux";
import {rootState} from "../../../../store/reducers";
import {
  getUnfilledWorkPrograms,
  getUnfilledIndicators,
  getEducationalProgramId
} from "../../getters";
import actions from "../../../EducationalProgram/actions";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table'
import { useStyles } from './AbilityAnalysis.styles'
import {appRouter} from "../../../../service/router-service";
import Button from "@mui/material/Button";
import IndicatorsDialog from "../../../WorkProgram/Competences/IndicatorDialog/IndicatorDialog";
import wpActions from "../../../WorkProgram/actions";
import {getResultsForSelect, getWorkProgramField} from "../../../WorkProgram/getters";

export const AbilityAnalysis = () => {
  const dispatch = useDispatch();
  const classes = useStyles()
  const isFirstEnterSecondTab = useRef(true)
  const [tab, setTab] = useState('1');
  const [dialogCompetence, setDialogCompetence] = useState<{value: number; label: string} | undefined>(undefined)
  const [isOpenIndicatorDialog, setIsOpenIndicatorDialog] = useState(false)
  const [selectedWpId, setSelectedWpId] = useState(undefined)
  const epList = useSelector((state: rootState) => getWorkProgramField(state, 'work_program_in_change_block'))
  const resultsList = useSelector((state: rootState) => getResultsForSelect(state))
  const educationalProgramId = useSelector((state: rootState) => getEducationalProgramId(state))

  const getWorkProgramById = (id: number) => {
    dispatch(wpActions.getWorkProgram(id))
  }

  useEffect(() => {
    dispatch(actions.getUnfilledWorkPrograms());
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (isFirstEnterSecondTab.current) {
      dispatch(actions.getUnfilledIndicators());
      isFirstEnterSecondTab.current = false
    }
    setTab(newValue);
  };

  const handleCreateZUN = () => {
    setIsOpenIndicatorDialog(true)
  }

  const handleCloseDialog = () => {
    setDialogCompetence(undefined)
    setIsOpenIndicatorDialog(false)
  }

  const unfilledWorkPrograms = useSelector((state: rootState) => getUnfilledWorkPrograms(state))
  const unfilledIndicators = useSelector((state: rootState) => getUnfilledIndicators(state))

  return (
    <TabContext value={tab}>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab className={classes.tab} label="Список РПД без ЗУНов для данной ОХ" value="1" />
          <Tab className={classes.tab} label="Список индикаторов, не задействованных в ОХ" value="2" />
        </TabList>
      </Box>


      <TabPanel value="1">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>
                Код
              </TableCell>
              <TableCell className={classes.header}>
                Название
              </TableCell >
              <TableCell className={classes.header} />
            </TableRow>
          </TableHead>
          <TableBody>
            {unfilledWorkPrograms?.map((unfilledWorkProgram) => {
              return (
                <TableRow key={unfilledWorkProgram.id}>
                  <TableCell className={classes.cell}>
                    {unfilledWorkProgram?.discipline_code}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <Link className={classes.workProgramLink}
                          to={appRouter.getWorkProgramLink(unfilledWorkProgram?.id)}
                          target="_blank"
                    >
                      {unfilledWorkProgram?.title}
                    </Link>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <Button
                      onClick={() => {
                        handleCreateZUN();
                        setSelectedWpId(unfilledWorkProgram?.id);
                        getWorkProgramById(unfilledWorkProgram?.id);
                      }}
                      variant="outlined"
                      className={classes.addZUNButton}
                      color="secondary"
                    >
                      Добавить ЗУН
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TabPanel>

      <TabPanel value="2">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>
                Компетенция
              </TableCell>
              <TableCell className={classes.header}>
                Индикатор
              </TableCell>
              {/*<TabчleCell className={classes.header} />*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {unfilledIndicators?.map((unfilledIndicator: any) => {
              return (
                <>
                  {unfilledIndicator?.indicators?.map((indicator: any, index: number) => {
                    return (
                      <TableRow key={unfilledIndicator?.id}>
                        {index === 0 ?
                          <TableCell rowSpan={unfilledIndicator?.indicators?.length} className={classes.cell}>
                            <Link className={classes.workProgramLink}
                                  to={appRouter.getCompetenceIndicatorsRouteLink(unfilledIndicator?.id)}
                                  target="_blank"
                            >
                              {unfilledIndicator?.number} {unfilledIndicator?.name}
                            </Link>
                          </TableCell>
                          : <></>
                        }
                        <TableCell className={classes.cell}>
                          {indicator?.number} {indicator?.name}
                        </TableCell>
                        {/*<TableCell className={classes.cell}>*/}
                        {/*  <Button*/}
                        {/*    onClick={() => {*/}
                        {/*      handleCreateZUN();*/}
                        {/*    }}*/}
                        {/*    variant="outlined"*/}
                        {/*    className={classes.addZUNButton}*/}
                        {/*    color="secondary"*/}
                        {/*  >*/}
                        {/*    Добавить ЗУН*/}
                        {/*  </Button>*/}
                        {/*</TableCell>*/}
                      </TableRow>
                    )
                  })}
                </>
              )
            })}
          </TableBody>
        </Table>
      </TabPanel>

      {isOpenIndicatorDialog ?
        <IndicatorsDialog
          isOpen={isOpenIndicatorDialog}
          handleClose={handleCloseDialog}
          defaultCompetence={dialogCompetence}
          workProgramId={selectedWpId}
          epList={epList}
          resultsList={resultsList}
          defaultEpId={educationalProgramId}
          updateCharacteristics
          apRequired
        />
        : null
      }
    </TabContext>
  );
}
