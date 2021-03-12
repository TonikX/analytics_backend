import { CourseType, PlatformType, InstitutionType } from '../types'
import {SortingType} from "../../../components/SortingButton/types";

export interface CoursesTableProps {
  courses: Array<CourseType>;
  sortingField: string;
  sortingMode: SortingType;
  handleClickDelete: (id: number) => void;
  platforms: Array<PlatformType> | [];
  institutions: Array<InstitutionType> | [];
  // handleClickEdit: (course: CourseType) => void;
}