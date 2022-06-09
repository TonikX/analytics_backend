import {ExpertiseType} from "./types";
import {ExpertisesFields} from "./enum";
import {appRouter} from "../../service/router-service";
import get from "lodash/get";
import {WorkProgramGeneralFields} from "../WorkProgram/enum";
import {PracticeFields} from "../Practice/enum";

export const getLink = (expertise: ExpertiseType) => {
    if (isWorkProgram(expertise)) {
        return appRouter.getWorkProgramLink(get(expertise, [ExpertisesFields.WORK_PROGRAM, WorkProgramGeneralFields.ID]));
    } else if (isPractice(expertise)) {
        return appRouter.getPracticeLink(get(expertise, [ExpertisesFields.PRACTICE, PracticeFields.ID]));
    } else {
        return appRouter.getFinalCertificationLink(get(expertise, [ExpertisesFields.GIA]));
    }
}

export const getLinkLabel = (expertise: ExpertiseType) => {
    if (isWorkProgram(expertise)) {
        return get(expertise, [ExpertisesFields.WORK_PROGRAM, WorkProgramGeneralFields.TITLE]);
    } else if (isPractice(expertise)) {
        return get(expertise, [ExpertisesFields.PRACTICE, PracticeFields.TITLE]);
    } else {
        return 'ГИА';
    }
}

const isWorkProgram = (expertise: ExpertiseType) => !!(expertise[ExpertisesFields.WORK_PROGRAM]);
const isPractice = (expertise: ExpertiseType) => !!(expertise[ExpertisesFields.PRACTICE]);