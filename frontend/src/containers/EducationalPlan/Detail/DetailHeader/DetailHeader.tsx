import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import folderActions from "../../../Profile/Folders/actions";

import {
  canSendToValidate,
  canValidate,
  getEducationalPlanDetail,
  getStatusInfo
} from '../../getters';

import {
  EducationalPlanFields,
} from "../../enum";

import Button from "@mui/material/Button";
import LikeButton from '../../../../components/LikeButton';
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import { StatusPoint } from '../../../../components/StatusPoint';
import Service from '../../service';
import actions from "../../actions";
import {FavoriteType} from "../../../Profile/Folders/enum";

import {BACHELOR_QUALIFICATION, specializationObject} from "../../../WorkProgram/constants";
import {rootState} from "../../../../store/reducers";

const DetailHeader:React.FC<{classes:any, trajectoryRoute?:boolean, tab:any, onChangeTab: any}> = ({classes, trajectoryRoute, tab, onChangeTab}) => {
  const dispatch = useDispatch();
  const detailPlan:any = useSelector((state:rootState) => getEducationalPlanDetail(state));
  const statusInfo = useSelector((state:rootState) => getStatusInfo(state));
  const detailHeaderCanSendToValidate = useSelector((state:rootState) => canSendToValidate(state));
  const detailHeaderCanValidate = useSelector((state:rootState) => canValidate(state));
  const canEdit = detailPlan?.can_edit;

  const planService = new Service();

  const canDownload = get(detailPlan, 'academic_plan_in_field_of_study[0].year', 0) >= 2023;

  const getValidationErrors = () => {
    const qualification = detailPlan?.academic_plan_in_field_of_study?.[0]?.qualification
    const laboriousness = detailPlan?.[EducationalPlanFields.LABORIOUSNESS]

    const errors = []
    const isValidSemesterDuration = checkSemestersDuration();
    const isValidLaboriousness = qualification === BACHELOR_QUALIFICATION ? laboriousness === 240 : 12

    if (!isValidLaboriousness) {
      errors.push('Общее число зачетных единиц не равно 240')
    }

    if (isValidSemesterDuration) {
      errors.push('Проверьте длительность дисциплин и семестры в которых они начинаются (длительность какой-то из дисциплин больше допустимой в данном семестре)')
    }

    return errors;
  }

  const checkSemestersDuration = () => {
    const qualification = get(detailPlan, 'academic_plan_in_field_of_study[0].qualification', '');
    const maxSem = qualification === BACHELOR_QUALIFICATION ? 8 : 4;

    return detailPlan?.discipline_blocks_in_academic_plan?.some((item: any) => {
      return item?.modules_in_discipline_block?.some((item: any) => {
        return item?.change_blocks_of_work_programs_in_modules.some((item: any) => {
          const semesterStart = item?.semester_start;
          const duration = item?.work_program?.[0]?.number_of_semesters;
          return semesterStart?.some((item: any) => {
            return (duration + item) > (maxSem + 1)
          })
        })
      })
    })
  }

  const sendToCheck = () => {
    dispatch(actions.sendPlanToValidate());
  }

  const sendToRework = () => {
    dispatch(actions.sendPlanToRework());
  }

  const approvePlan = () => {
    dispatch(actions.approvePlan());
  }

  const downloadPlan = async () => {
    const planLink = await planService.getPlanDownloadLink(detailPlan.id);

    let tempLink = document.createElement('a');

    // @ts-ignore
    tempLink.href = planLink;

    tempLink.setAttribute('target', '_blank');

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  const getPlanId = () => detailPlan?.id;

  const handleClickLike = () => {
    if (detailPlan[EducationalPlanFields.ID_RATING]){
      dispatch(folderActions.removeFromFolder({
        id: detailPlan[EducationalPlanFields.ID_RATING],
        callback: actions.getEducationalDetail,
        type: trajectoryRoute ? FavoriteType.TRAJECTORY_PLAN : FavoriteType.ACADEMIC_PLAN,
        relationId: getPlanId()
      }))
    } else {
      dispatch(folderActions.openAddToFolderDialog({
        relationId: getPlanId(),
        type: trajectoryRoute ? FavoriteType.TRAJECTORY_PLAN : FavoriteType.ACADEMIC_PLAN,
        callback: actions.getEducationalDetail
      }))
    }
  }

  const validationErrors = getValidationErrors()

    return (
      <>
        <div className={classes.headerWrap}>
        <StatusPoint {...statusInfo} />
        <div className={classes.headerButtons}>
          {canDownload && (
            <Button onClick={downloadPlan} className={classes.buttonH32}>
              Скачать учебный план
            </Button>
          )}
          {detailHeaderCanSendToValidate && canEdit && (
            validationErrors.length === 0 ?
              <Button
                onClick={sendToCheck}
                className={classes.buttonH32}
              >
                Отправить на проверку
              </Button>
            :
              <Tooltip title={validationErrors.map((item: any) => <>{item} <br/> </>)}>
                <Button className={classes.buttonH32}>
                  Отправить на проверку
                </Button>
              </Tooltip>
            )}
            {detailHeaderCanValidate && (
              <>
                <Button className={classes.buttonH32} onClick={sendToRework} variant="outlined" style={{marginRight: 10}}>
                  Отправить на доработку
                </Button>
                <Button className={classes.buttonH32} onClick={approvePlan} variant="contained" color="primary">
                  Принять
                </Button>
              </>
            )}
            <div className={classes.likeIcon}>
            <LikeButton onClick={handleClickLike}
                        isLiked={Boolean(detailPlan[EducationalPlanFields.ID_RATING])}
            />
          </div>
        </div>
      </div>

      <div className={classes.title}>
        <Typography>
          Учебный план: {get(detailPlan, 'academic_plan_in_field_of_study[0].title', '')}&nbsp;
          {get(detailPlan, 'academic_plan_in_field_of_study[0].field_of_study', []).map((item: any) =>
          <>
              ({specializationObject[get(item, 'qualification', '')]} / {get(item, 'title', '')} ({get(item, 'number', '')}))&nbsp;
          </>
          )}
          - {get(detailPlan, 'academic_plan_in_field_of_study[0].year', '')}
        </Typography>
      </div>

      <Typography className={classes.noteText}>
        Если Вы включили модуль, который использовался в учебных планах 2018-2022 года, в учебный план 2023 года набора, возможны коллизии в данных, т.к. если этот план обновится в одному году, он обновится и для планов других годов набора. <b>Рекомендуем делать разные модули для разных годов набора.</b>
      </Typography>

      <Tabs value={tab} onChange={onChangeTab}>
        <Tab value="1" label="Главная" />
        <Tab value="2" label="Учебный план" />
      </Tabs>
    </>
  )
}

export default DetailHeader;

