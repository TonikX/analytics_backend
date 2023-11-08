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
  getEducationalProgramCharacteristic,
} from "../../getters";
import actions from "../../../EducationalProgram/actions";
import wpActions from "../../../WorkProgram/actions";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table'
import { useStyles } from './AbilityAnalysis.styles'
import {appRouter} from "../../../../service/router-service";
import Button from "@mui/material/Button";
import IndicatorsDialog from "../../../WorkProgram/Competences/IndicatorDialog/IndicatorDialog";
import {getResultsForSelect} from "../../../WorkProgram/getters";
import {WorkProgramSelectModal} from "../WorkProgramSelectModal";

export const AbilityAnalysis = () => {
  const dispatch = useDispatch();
  const classes = useStyles()
  const isFirstEnterSecondTab = useRef(true)
  const [tab, setTab] = useState('1');
  const [isOpenIndicatorDialog, setIsOpenIndicatorDialog] = useState(false)
  const [isOpenWorkProgramModal, setIsOpenWorkProgramModal] = useState(false)
  const [defaultIndicator, setDefaultIndicator] = useState<{value: number, label: string}|undefined>()
  const [defaultCompetence, setDefaultCompetence] = useState<{value: number, label: string}|undefined>()
  const [selectedWpId, setSelectedWpId] = useState<number|undefined>(undefined)
  const characteristics: any = useSelector((state: rootState) => getEducationalProgramCharacteristic(state))
  const resultsList = useSelector((state: rootState) => getResultsForSelect(state))
  const educationalProgramId = characteristics.educational_program?.[0]?.id;
  const educationalProgramIdForCompetence = characteristics.educational_program?.[0]?.academic_plan?.id;

  const finalEpList = characteristics.educational_program.map((item: any) => {
    return (
      {
        value: item.id,
        label: `Направление: ${item?.field_of_study[0]?.title} / ОП: ${item?.title} (${item?.year})`,
      }
    )
  })

  const finalEpListForCompetence = characteristics.educational_program.map((item: any) => {
    return (
      {
        value: item.academic_plan.id,
        label: `Направление: ${item?.field_of_study[0]?.title} / ОП: ${item?.title} (${item?.year})`,
      }
    )
  })

  useEffect(() => {
    dispatch(actions.getUnfilledWorkPrograms());
    dispatch(actions.getCharacteristicsWorkProgram());
  }, []);

  useEffect(() => {
    dispatch(wpActions.getWorkProgram(selectedWpId));
  }, [selectedWpId]);

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
    setDefaultCompetence(undefined)
    setIsOpenIndicatorDialog(false)
    setDefaultIndicator(undefined)
    setDefaultCompetence(undefined)
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
              <TableCell className={classes.header} />
            </TableRow>
          </TableHead>
          <TableBody>
            {unfilledIndicators?.map((competence: any) => {
              return (
                <>
                  {competence?.indicators?.map((indicator: any, index: number) => {
                    return (
                      <TableRow key={competence?.id}>
                        {index === 0 ?
                          <TableCell rowSpan={competence?.indicators?.length} className={classes.cell}>
                            <Link className={classes.workProgramLink}
                                  to={appRouter.getCompetenceIndicatorsRouteLink(competence?.id)}
                                  target="_blank"
                            >
                              {competence?.number} {competence?.name}
                            </Link>
                          </TableCell>
                          : <></>
                        }
                        <TableCell className={classes.cell}>
                          {indicator?.number} {indicator?.name}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          <Button
                            onClick={() => {
                              setIsOpenWorkProgramModal(true)
                              setDefaultIndicator({
                                label: indicator?.name,
                                value: indicator?.id,
                              })
                              setDefaultCompetence({
                                label: competence?.name,
                                value: competence?.id,
                              })
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
          defaultCompetence={defaultCompetence}
          workProgramId={selectedWpId}
          finalEpList={finalEpList}
          finalEpListForCompetence={finalEpListForCompetence}
          resultsList={resultsList}
          defaultEpId={educationalProgramId}
          defaultEpIdForCompetence={educationalProgramIdForCompetence}
          updateCharacteristics
          apRequired
          defaultIndicator={defaultIndicator}
        />
        : null
      }

      {isOpenWorkProgramModal ? (
        <WorkProgramSelectModal
          onSelect={(wpId: number) => {
            setSelectedWpId(wpId);
            // getWorkProgramById(wpId);
            setIsOpenWorkProgramModal(false);
            setIsOpenIndicatorDialog(true);
          }}
          onCancel={() => setIsOpenWorkProgramModal(false)}
        />
      ) : null}
    </TabContext>
  );
}
