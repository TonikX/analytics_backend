import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {CourseFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";

export interface CoursesActions {
    changeSearchQuery: any;
    getCourses: any;
    setCourses: any;
    createNewCourse: any;
    changeCourse: any;
    deleteCourse: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    changeDialogStep: any;
}

export interface coursesState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.COURSES_LIST]: Array<CourseType>;
    [fields.COURSE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: CourseType|{};
    };
}

export type CourseType = {
    [CourseFields.ID]: number,
    [CourseFields.DESCRIPTION]: string,
    [CourseFields.TITLE]: string,
    [CourseFields.PLATFORM]: string,
    [CourseFields.COURSE_URL]: string,
};

export interface CoursesProps extends WithStyles<typeof styles> {
    actions: CoursesActions;
    courses: Array<CourseType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}