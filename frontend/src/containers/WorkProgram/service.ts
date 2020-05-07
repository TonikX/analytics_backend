import {ReactText} from "react";
import BaseService from "../../service/base-service";
import {Section} from "./ThirdStep/types";

class WorkProgramService extends BaseService{
    getWorkProgram(id: string){
        return this.get(`/api/workprogram/detail/${id}`);
    }

    saveWorkProgram(destination: string, value: string, id: string){
        const formData = new FormData();

        formData.append(destination, value);

        return this.patch(`/api/workprogram/update/${id}`, formData);
    }

    saveSection(section: Section){
        const formData = new FormData();

        Object.keys(section).forEach((key: string) => {
            if (key !== 'topics' && key !== 'evaluation_tools'){
                // @ts-ignore
                formData.append(key, section[key]);
            }
        })


        return this.patch(`/api/sections/${section.id}`, formData);
    }

    createNewSection(section: Section, workProgramId: ReactText){
        const formData = new FormData();

        Object.keys(section).forEach((key: string) => {
            // @ts-ignore
            formData.append(key, section[key]);
        })

        // @ts-ignore
        formData.append('work_program', workProgramId);

        return this.post(`/api/sections/`, formData);
    }

    deleteSection(id: ReactText){
        return this.delete(`/api/sections/${id}`);
    }
}

export default WorkProgramService;