import {fields} from "./enum";

export interface MergeWorkProgramsActions {
    getWorkProgramsList: any;
    setWorkProgramsList: any;
    setSearchQuery: any;
    mergeWorkPrograms: any;
}

export interface mergeWorkProgramsState {
    [fields.WORK_PROGRAM_LIST]: Array;
    [fields.SEARCH_QUERY]: string;
}
