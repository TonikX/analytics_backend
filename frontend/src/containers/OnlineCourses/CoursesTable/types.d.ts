import { CourseType } from '../types'
import {SortingType} from "../../../components/SortingButton/types";

export interface CoursesTableProps {
  courses: Array<CourseType>;
  sortingField: string;
  sortingMode: SortingType;
  handleClickDelete: (id: number) => void;
  // handleClickEdit: (course: CourseType) => void;
}