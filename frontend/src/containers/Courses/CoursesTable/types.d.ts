import { CourseType, PlatformType, InstitutionType } from '../types'
import {SortingType} from "../../../components/SortingButton/types";

export interface CoursesTableProps {
  courses: Array<CourseType>;
  sortingField: string;
  sortingMode: SortingType;
  // handleClickEdit: (course: CourseType) => void;
}
