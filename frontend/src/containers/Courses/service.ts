import BaseService from "../../service/base-service";
import {CourseFields} from "./enum";
import {SortingType, SortingEnumTypes} from "../../components/SortingButton/sortingEnumTypes";

class CoursesServices extends BaseService{
    getCourses(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === SortingEnumTypes.ASC ? '-' : sortingMode === SortingEnumTypes.DESC ? '+' : '';

        return this.get(`/api/onlinecourse?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteCourse(courseId: number){
        return this.delete(`/api/onlinecourse/delete/${courseId}`);
    }

    createCourse(course: any){
        const formData = new FormData();

        formData.append(CourseFields.TITLE, course[CourseFields.TITLE]);
        formData.append(CourseFields.DESCRIPTION, course[CourseFields.DESCRIPTION]);
        formData.append(CourseFields.COURSE_URL, course[CourseFields.COURSE_URL]);
        formData.append(CourseFields.PLATFORM, course[CourseFields.PLATFORM]);

        return this.post(`/api/onlinecourse/create`, formData);
    }

    updateCourse(course: any){
        const formData = new FormData();
        const courseId = course[CourseFields.ID];

        formData.append(CourseFields.TITLE, course[CourseFields.TITLE]);
        formData.append(CourseFields.DESCRIPTION, course[CourseFields.DESCRIPTION]);
        formData.append(CourseFields.COURSE_URL, course[CourseFields.COURSE_URL]);
        formData.append(CourseFields.PLATFORM, course[CourseFields.PLATFORM]);

        return this.patch(`/api/onlinecourse/update/${courseId}`, formData);
    }
}

export default CoursesServices;