import BaseService from "../../service/base-service";
import {EntityToEntityFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";
import {SubjectAreaFields} from "../SubjectArea/enum";

class TrainingEntitiesServices extends BaseService{
    getTrainingEntities(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType, domainId: number|null){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/item?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}&domain=${domainId || ''}`);
    }

    deleteTrainingEntities(itemId: number){
        return this.delete(`/api/item/detail/${itemId}`);
    }

    createTrainingEntities(item: any){
        const formData = new FormData();

        formData.append(EntityToEntityFields.TITLE, item[EntityToEntityFields.TITLE]);
        formData.append(EntityToEntityFields.SUBJECT_AREA, item[EntityToEntityFields.SUBJECT_AREA][SubjectAreaFields.ID]);

        return this.post(`/api/item/create`, formData);
    }

    updateTrainingEntities(item: any){
        const formData = new FormData();
        const id = item[EntityToEntityFields.ID];

        formData.append(EntityToEntityFields.TITLE, item[EntityToEntityFields.TITLE]);
        formData.append(EntityToEntityFields.SUBJECT_AREA, item[EntityToEntityFields.SUBJECT_AREA][SubjectAreaFields.ID]);

        return this.patch(`/api/item/detail/${id}`, formData);
    }
}

export default TrainingEntitiesServices;