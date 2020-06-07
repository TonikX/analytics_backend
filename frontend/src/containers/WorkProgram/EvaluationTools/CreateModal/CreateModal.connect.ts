import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../../actions";
import {getAllSectionsForSelect, isOpenDialog, getDialogData} from '../../getters';
import {WorkProgramActions} from "../../types";
import {fields} from "../../enum";

import trainingEntitiesActions from '../../../TrainingEntities/actions';
import {TrainingEntitiesActions} from '../../../TrainingEntities/types';
import {getTrainingEntitiesForSelect} from "../../../TrainingEntities/getters";

const mapStateToProps = (state: rootState) => {
    return {
        trainingEntities: getTrainingEntitiesForSelect(state),
        sections: getAllSectionsForSelect(state),
        isOpen: isOpenDialog(state, fields.CREATE_NEW_EVALUATION_TOOLS),
        evaluationTool: getDialogData(state, fields.CREATE_NEW_EVALUATION_TOOLS),
        types: [
            'Дебаты / Дскуссия / Круглый стол',
            'Деловая (ролевая) игра',
            'Задача (задание)',
            'Исследовательская работа / Проект / Доклад',
            'Кейс (ситуационное задание)',
            'Коллоквиум',
            'Контрольная работа',
            'Лабораторная работа',
            'Отчет',
            'Портфолио',
            'Презентация',
            'Проектное задание',
            'Реферат',
            'Сообщение',
            'Тест',
            'Эссе',
        ]
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions|TrainingEntitiesActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    trainingEntitiesActions: bindActionCreators(trainingEntitiesActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
