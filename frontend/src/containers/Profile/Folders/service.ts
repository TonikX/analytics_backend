import AnalyticsService from "../../../service/analytics-service";
import {FavoriteType} from "./enum";

class Service extends AnalyticsService{
    getAddToFolderLink(type: FavoriteType){
        switch (type){
            case FavoriteType.WORK_PROGRAM:
                return '/api/folders/work_program/add';
            case FavoriteType.ACADEMIC_PLAN:
                return '/api/folders/academic_plan/add';
            case FavoriteType.TRAJECTORY_PLAN:
                return '/api/folders/individual_path/add';
            case FavoriteType.MODULES:
                return '/api/folders/block_module/add';
        }
    }

    getRemoveFromFolderLink(type: FavoriteType){
        switch (type){
            case FavoriteType.WORK_PROGRAM:
                return '/api/folders/work_program/remove';
            case FavoriteType.ACADEMIC_PLAN:
                return '/api/folders/academic_plan/remove';
            case FavoriteType.TRAJECTORY_PLAN:
                return '/api/folders/individual_path/remove';
            case FavoriteType.MODULES:
                return '/api/folders/block_module/remove';
        }
    }

    getCreateFieldsDependsOnType(type: FavoriteType, rating: number, relationId: number){
        switch (type){
            case FavoriteType.WORK_PROGRAM:
                return {
                    work_program_rating: rating,
                    work_program: relationId,
                };
            case FavoriteType.ACADEMIC_PLAN:
                return {
                    academic_plan_rating: rating,
                    academic_plan: relationId,
                };
            case FavoriteType.TRAJECTORY_PLAN:
                return {
                    route_rating: rating,
                    individual_implementation_of_academic_plan: relationId,
                };
            case FavoriteType.MODULES:
                return {
                    module_rating: rating,
                    block_module: relationId,
                };
        }
    }

    addToFolder(id: number, rating: number, relationId: number, comment: string, type: FavoriteType){
        return this.post(this.getAddToFolderLink(type), {
            folder: id,
            comment: comment,
            ...this.getCreateFieldsDependsOnType(type, rating, relationId)
        });
    }

    removeFromFolder(relationId: number, type: FavoriteType){
        return this.delete(`${this.getRemoveFromFolderLink(type)}/${relationId}`);
    }

    getFolders(){
        return this.get(`/api/folders`);
    }

    createFolder(name: string, description: string){
        return this.post(`/api/folders/create`, {
            name: name,
            description: description,
        });
    }

    deleteFolder(id: string){
        return this.delete(`/api/folders/delete/${id}`);
    }
}

export default Service;
