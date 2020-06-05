import BaseService from "../../service/base-service";
import {TrainingEntitiesFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";
import {SubjectAreaFields} from "../SubjectArea/enum";

class TrainingEntitiesServices extends BaseService{
    getTrainingEntities(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/item?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteTrainingEntities(itemId: number){
        return this.delete(`/api/item/detail/${itemId}`);
    }

    createTrainingEntities(item: any){
        const formData = new FormData();

        formData.append(TrainingEntitiesFields.TITLE, item[TrainingEntitiesFields.TITLE]);
        formData.append(TrainingEntitiesFields.SUBJECT_AREA, item[TrainingEntitiesFields.SUBJECT_AREA][SubjectAreaFields.ID]);

        return this.post(`/api/item/create`, formData);
    }

    updateTrainingEntities(item: any){
        const formData = new FormData();
        const id = item[TrainingEntitiesFields.ID];

        formData.append(TrainingEntitiesFields.TITLE, item[TrainingEntitiesFields.TITLE]);
        formData.append(TrainingEntitiesFields.SUBJECT_AREA, item[TrainingEntitiesFields.SUBJECT_AREA][SubjectAreaFields.ID]);

        return this.patch(`/api/item/detail/${id}`, formData);
    }
}

export default TrainingEntitiesServices;