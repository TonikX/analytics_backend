import {BlocksOfWorkProgramsType} from "../../types";

export interface SelectWorkProgramBlockProps {
    module: BlocksOfWorkProgramsType;
    handleDownloadFile: Function;
    saveWorkPrograms: Function;
    isMultiSelect: boolean;
}