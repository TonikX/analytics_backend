import BaseService from "../../../service/base-service";

class Service extends BaseService{
    getFolders(){
        return this.get(`/api/folders`);
    }

    addToFolder(id: number, rating: number, workProgramId: number){
        return this.post(`/api/folders/add`, {
            work_program_rating: rating,
            folder: id,
            work_program: workProgramId,
        });
    }

    removeFromFolder(workProgramId: number){
        return this.get(`/api/folders/remove/${workProgramId}`);
    }

    createFolder(name: string, description: string){
        return this.post(`/api/folders/create`, {
            name: name,
            description: description,
        });
    }
}

export default Service;