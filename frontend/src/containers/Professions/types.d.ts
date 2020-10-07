import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {ProfessionsFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {TrainingEntitityType} from "../TrainingEntities/types";

export interface ProfessionsActions {
    changeSearchQuery: any;
    getProfessionsList: any;
    setProfessionsList: any;
    createNewProfession: any;
    changeProfession: any;
    deleteProfession: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    changeFilteredRole: any;
    getSkills: any;
    createSkill: any;
    changeSkill: any;
    deleteSkill: any;
    setSkills: any;
    getProfession: any;
    setProfession: any;
}

export interface professionsState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.SKILLS_LIST]: Array<SkillType>;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: {[key]: string};
    [fields.ROLE]: string|null;
    [fields.PROFESSIONS_LIST]: Array<ProfessionType>;
    [fields.PROFESSION]: ProfessionType|{};
    [fields.PROFESSIONS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: ProfessionType|{};
    };
}

export type ProfessionType = {
    [ProfessionsFields.ID]: number,
    [ProfessionsFields.ROLE]: string,
    [ProfessionsFields.TITLE]: string,
};

export type SkillType = {
    [ProfessionsFields.ID]: number,
    [ProfessionsFields.ITEM]: SkillTypeItem,
    [ProfessionsFields.LEVEL]: string;
};
export type SkillTypeItem = {
    [ProfessionsFields.ID]: number;
    [ProfessionsFields.NAME]:  string;
};

export interface ProfessionsProps extends WithStyles<typeof styles> {
    actions: ProfessionsActions;
    professionsList: Array<ProfessionType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}


export interface SkillsProps extends WithStyles<typeof styles> {
    actions: ProfessionsActions;
    skillList: Array<SkillType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
    profession: ProfessionType;
}