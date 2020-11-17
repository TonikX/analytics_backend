import BaseService from "../../../service/base-service";

class Service extends BaseService{
    getFolders(){
        return this.get(`/api/folders`);
    }

    addToFolder(id: number, rating: number, workProgramId: number, comment: string){
        return this.post(`/api/folders/add`, {
            work_program_rating: rating,
            folder: id,
            work_program: workProgramId,
            comment: comment,
        });
    }

    removeFromFolder(workProgramId: number){
        return this.delete(`/api/folders/remove/${workProgramId}`);
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