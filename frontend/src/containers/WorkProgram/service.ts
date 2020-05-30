import {ReactText} from "react";
import BaseService from "../../service/base-service";
import {Section, Topic} from "./types";
import {workProgramTopicFields} from "./enum";

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
                if (section[key]){
                    // @ts-ignore
                    formData.append(key, section[key]);
                }
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

    changeSectionNumber(newNumber: ReactText, sectionId: ReactText){
        const formData = new FormData();

        // @ts-ignore
        formData.append('new_ordinal_number', newNumber);
        // @ts-ignore
        formData.append('descipline_section', sectionId);

        return this.post(`/api/sections/NewOrdinalNumbers`, formData);
    }

    deleteSection(id: ReactText){
        return this.delete(`/api/sections/${id}`);
    }

    saveTopic(topic: Topic){
        const formData = new FormData();

        formData.append(workProgramTopicFields.DESCRIPTION, topic[workProgramTopicFields.DESCRIPTION]);
        formData.append(workProgramTopicFields.SECTION, topic[workProgramTopicFields.SECTION]);

        if (topic[workProgramTopicFields.COURSE].length){
            formData.append(workProgramTopicFields.COURSE, topic[workProgramTopicFields.COURSE]);
        }

        Object.keys(topic).forEach((key: string) => {
            // @ts-ignore
            if (topic[key]){
                // @ts-ignore
            }
        })

        return this.patch(`/api/topics/${topic[workProgramTopicFields.ID]}`, formData);
    }

    createNewTopic(topic: Topic, workProgramId: ReactText){
        const formData = new FormData();

        Object.keys(topic).forEach((key: string) => {
            // @ts-ignore
            formData.append(key, topic[key]);
        })

        // @ts-ignore
        formData.append('work_program', workProgramId);

        return this.post(`/api/topics/`, formData);
    }

    changeTopicNumber(newNumber: ReactText, topicId: ReactText){
        const formData = new FormData();

        // @ts-ignore
        formData.append('new_ordinal_number', newNumber);
        // @ts-ignore
        formData.append('descipline_section', topicId);

        return this.post(`/api/topics/NewOrdinalNumbers`, formData);
    }

    deleteTopic(id: ReactText){
        return this.delete(`/api/topics/${id}`);
    }
}

export default WorkProgramService;