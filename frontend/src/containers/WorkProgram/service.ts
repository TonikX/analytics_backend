import {ReactText} from "react";
import get from 'lodash/get';
import AnalyticsService from "../../service/analytics-service";
import {Section, Topic} from "./types";
import {
    EvaluationToolFields,
    IntermediateCertificationFields,
    PrerequisiteFields,
    ResultsFields,
    workProgramTopicFields
} from "./enum";
import {CourseFields} from "../Courses/enum";
import {TrainingEntitiesFields} from "../TrainingEntities/enum";
import {UserExpertResultEnum} from "../Expertises/enum";

class WorkProgramService extends AnalyticsService{
    getWorkProgram(id: string){
        return this.get(`/api/workprogram/detail/${id}`);
    }

    getWorkProgramByCode(code: string){
        return this.get(`/api/workprogram/fullitemrelations/${code}/`);
    }

    getWorkProgramEvaluationTools(id: string){
        return this.get(`/api/toolsinworkprogram/${id}`);
    }

    cloneWorkProgram(id: string){
        const formData = new FormData();

        formData.append('program_id', id);

        return this.post(`/api/workprogram/clone`, formData);
    }

    sendToExpertise(id: string){
        return this.post(`/api/expertise/create`, {
            work_program: id
        });
    }

    returnWorkProgramToWork(expertiseId: number){
        return this.patch(`/api/expertise/user/update/${expertiseId}`, {
            user_expertise_status: UserExpertResultEnum.REWORK,
        });
    }

    approveWorkProgram(expertiseId: number){
        return this.patch(`/api/expertise/user/update/${expertiseId}`, {
            user_expertise_status: UserExpertResultEnum.APPROVED,
        });
    }

    saveWorkProgram(destination: string, value: string|Array<number>, id: string){
        // const formData = new FormData();
        //
        // if (typeof value === 'string'){
        //     formData.append(destination, value);
        // }
        //
        // if (Array.isArray(value)){
        //     value.forEach((value, index) => {
        //         formData.append(`${destination}[${index}]`, value.toString());
        //     });
        // }

        return this.patch(`/api/workprogram/update/${id}`, {
            [destination]: value
        });
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

    changePrerequisites(prerequisite: any, workProgramId: ReactText){
        const formData = new FormData();
        const id = prerequisite[PrerequisiteFields.ID];

        // @ts-ignore
        formData.append('workprogram', workProgramId);

        formData.append(PrerequisiteFields.MASTER_LEVEL, prerequisite[PrerequisiteFields.MASTER_LEVEL]);
        formData.append(PrerequisiteFields.ITEM, prerequisite[PrerequisiteFields.ITEM][TrainingEntitiesFields.ID]);

        return this.patch(`/api/prerequisitesofworkprogram/update/${id}`, formData);
    }

    addTopicMaterial(item: any){
        return this.post(`/api/general_ch/additional_material_in_topic_of_rpd/`, {
            topic: item.topicId,
            title: item.title,
            url: item.url
        });
    }

    updateTopicMaterial(item: any){
        return this.patch(`/api/general_ch/additional_material_in_topic_of_rpd/${item.id}/`, {
            topic: item.topicId,
            title: item.title,
            url: item.url
        });
    }

    deleteTopicMaterial(id: number){
        return this.delete(`/api/general_ch/additional_material_in_topic_of_rpd/${id}/`);
    }

    saveTopic(topic: Topic){
        const formData = new FormData();

        formData.append(workProgramTopicFields.DESCRIPTION, topic[workProgramTopicFields.DESCRIPTION]);
        formData.append(workProgramTopicFields.SECTION, topic[workProgramTopicFields.SECTION]);
        formData.append(workProgramTopicFields.NUMBER, topic[workProgramTopicFields.NUMBER]);

        if (topic[workProgramTopicFields.COURSE]){
            // @ts-ignore
            formData.append(workProgramTopicFields.COURSE, topic[workProgramTopicFields.COURSE][CourseFields.ID]);
        }

        return this.patch(`/api/topics/${topic[workProgramTopicFields.ID]}`, formData);
    }

    createNewTopic(topic: Topic, workProgramId: ReactText){
        const formData = new FormData();

        formData.append(workProgramTopicFields.DESCRIPTION, topic[workProgramTopicFields.DESCRIPTION]);
        formData.append(workProgramTopicFields.SECTION, topic[workProgramTopicFields.SECTION]);
        formData.append(workProgramTopicFields.NUMBER, topic[workProgramTopicFields.NUMBER]);

        if (topic[workProgramTopicFields.COURSE]){
            // @ts-ignore
            formData.append(workProgramTopicFields.COURSE, topic[workProgramTopicFields.COURSE][CourseFields.ID]);
        }

        // @ts-ignore
        formData.append('work_program', workProgramId);

        return this.post(`/api/topics/create`, formData);
    }

    addPrerequisites(prerequisite: any, workProgramId: ReactText){
        const formData = new FormData();

        // @ts-ignore
        formData.append('workprogram', workProgramId);

        formData.append(PrerequisiteFields.MASTER_LEVEL, prerequisite[PrerequisiteFields.MASTER_LEVEL]);
        formData.append(PrerequisiteFields.ITEM, prerequisite[PrerequisiteFields.ITEM][TrainingEntitiesFields.ID]);

        return this.post(`/api/prerequisitesofworkprogram/create`, formData);
    }

    addEvaluationTool(evaluationTool: any){
        return this.post(`/api/tools/`, evaluationTool);
    }

    addIntermediateCertification(evaluationTool: any, workProgramId: ReactText){
        return this.post(`/api/certification_tools/`, {
            ...evaluationTool,
            work_program: workProgramId
        });
    }

    addResult(result: any, workProgramId: ReactText){
        return this.post(`/api/outcomesofworkprogram/create`, {
            ...result,
            workprogram: workProgramId,
            item: get(result, [ResultsFields.ITEM, TrainingEntitiesFields.ID])
        });
    }

    changeEvaluationTool(evaluationTool: any){
        const id = evaluationTool[EvaluationToolFields.ID];

        return this.patch(`/api/tools/${id}`, evaluationTool);
    }

    changeIntermediateCertification(evaluationTool: any){
        const id = evaluationTool[IntermediateCertificationFields.ID];

        return this.patch(`/api/certification_tools/${id}`, evaluationTool);
    }

    changeResult(result: any){
        const id = result[ResultsFields.ID];

        return this.patch(`/api/outcomesofworkprogram/update/${id}`, {
            ...result,
            item: get(result, [ResultsFields.ITEM, TrainingEntitiesFields.ID])
        });
    }

    changeTopicNumber(newNumber: ReactText, topicId: ReactText){
        const formData = new FormData();

        // @ts-ignore
        formData.append('new_ordinal_number', newNumber);
        // @ts-ignore
        formData.append('topic', topicId);

        return this.post(`/api/topics/NewOrdinalNumbers`, formData);
    }

    deleteTopic(id: ReactText){
        return this.delete(`/api/topics/${id}`);
    }

    deletePrerequisite(id: ReactText){
        return this.delete(`/api/prerequisitesofworkprogram/delete/${id}`);
    }

    deleteEvaluationTool(id: ReactText){
        return this.delete(`/api/tools/${id}`);
    }

    deleteIntermediateCertification(id: ReactText){
        return this.delete(`/api/certification_tools/${id}`);
    }

    deleteResult(id: ReactText){
        return this.delete(`/api/outcomesofworkprogram/delete/${id}`);
    }

    getResults(workProgramId: ReactText){
        return this.get(`/api/outcomesofworkprogramforacademycplan/${workProgramId}`);
    }

    updateLiterature(literature: Array<number>, workProgramId: ReactText){
        return this.patch(`/api/workprogram/update/${workProgramId}`, {
            bibliographic_reference: literature
        });
    }

    getComments(expertiseId: number, step: string){
        return this.get(`/api/expertise/comments/${expertiseId}?block=${step}`);
    }

    createComment(expertiseId: number, step: string, comment: string){
        return this.post(`/api/expertise/comments/create`, {
            user_expertise: expertiseId,
            comment_block: step,
            comment_text: comment,
        });
    }
}

export default WorkProgramService;