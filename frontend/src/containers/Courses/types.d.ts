import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {CourseFields, PlatformFields, InstitutionFields, filterFields, FieldOfStudyFields} from './enum';
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
    getPlatforms: any;
    setPlatforms: any;
    getInstitutions: any;
    setInstitutions: any;
    changeFiltering: any;
    changeFilterSearchQuery: any;
    getFieldsOfStudy: any;
    setFieldsOfStudy: any;
}

export interface coursesState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.FILTERING]: filteringType;
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.COURSES_LIST]: Array<CourseType>;
    [fields.COURSE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
    };
    [fields.INSTITUTIONS]: Array<InstitutionType> | [],
    [fields.PLATFORMS]: Array<PlatformType> | [],
    [fields.FIELDS_OF_STUDY]: Array<FieldOfStudyType> | [],
}

export type filteringType = {
    [filterFields.FILTERING_PLATFORM]: string,
    [filterFields.FILTERING_INSTITUTION]: string,
    [filterFields.FILTERING_LANGUAGE]: string,
    [filterFields.FILTERING_SEARCH_QUERY]: string,
}

export type PlatformType = {
    [PlatformFields.ID]: number,
    [PlatformFields.TITLE]: string,
}

export type InstitutionType = {
    [InstitutionFields.ID]: number,
    [InstitutionFields.TITLE]: string,
}

export type FieldOfStudyType = {
    [FieldOfStudyFields.ID]: number
    [FieldOfStudyFields.NUMBER]: string,
    [FieldOfStudyFields.TITLE]: string,
}

export type CourseType = {
    [CourseFields.ID]: number | undefined,
    [CourseFields.DESCRIPTION]: string,
    [CourseFields.TITLE]: string,
    [CourseFields.PLATFORM]: PlatformType | {},
    [CourseFields.INSTITUTION]: InstitutionType | {},
    [CourseFields.COURSE_URL]: string,
    [CourseFields.LANGUAGE]: string,
    [CourseFields.STARTED_AT]: string,
    [CourseFields.RATING]: number | null,
};

export interface CoursesProps extends WithStyles<typeof styles> {
    actions: CoursesActions;
    courses: Array<CourseType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
    platforms: Array<PlatformType> | [];
    institutions: Array<InstitutionType> | [];
}