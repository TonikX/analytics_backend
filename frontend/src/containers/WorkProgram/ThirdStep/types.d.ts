import {WorkProgramActions} from '../types';

export interface ThirdStepProps {
    actions: WorkProgramActions;
    sections: Array<Section>;
}

export type Section = {
    id: number;
    ordinal_number: number;
    name: string;
    SRO: number;
    contact_work: number;
    lecture_classes: number;
    practical_lessons: number;
    total_hours: number;
    laboratory: number;
};

