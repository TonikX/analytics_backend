import {fields} from './enum';
import {WithStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {RolesFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";

export interface RolesActions {
    changeSearchQuery: any;
    getRolesList: any;
    setRolesList: any;
    createNewRole: any;
    changeRole: any;
    deleteRole: any;
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
    getRole: any;
    setRole: any;
}

export interface rolesState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.SKILLS_LIST]: Array<SkillType>;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: {[key]: string};
    [fields.ROLE]: string|null;
    [fields.ROLES_LIST]: Array<RoleType>;
    [fields.ROLES]: RoleType|{};
    [fields.ROLES_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: RoleType|{};
    };
}

export type RoleType = {
    [RolesFields.ID]: number,
    [RolesFields.ROLE]: string,
    [RolesFields.TITLE]: string,
};

export type SkillType = {
    [RolesFields.ID]: number,
    [RolesFields.ITEM]: SkillTypeItem,
    [RolesFields.LEVEL]: string;
};
export type SkillTypeItem = {
    [RolesFields.ID]: number;
    [RolesFields.NAME]:  string;
};

export interface RolesProps extends WithStyles<typeof styles> {
    actions: RolesActions;
    rolesList: Array<RoleType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}


export interface SkillsProps extends WithStyles<typeof styles> {
    actions: RolesActions;
    skillList: Array<SkillType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
    role: RoleType;
}