import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../../actions";
import {getAllSectionsForSelect, isOpenDialog, getDialogData} from '../../getters';
import {WorkProgramActions} from "../../types";
import {fields} from "../../enum";

const mapStateToProps = (state: rootState) => {
    return {
        sections: getAllSectionsForSelect(state),
        isOpen: isOpenDialog(state, fields.CREATE_NEW_EVALUATION_TOOLS),
        evaluationTool: getDialogData(state, fields.CREATE_NEW_EVALUATION_TOOLS),
        types: [
            'Аннотация',
            'Видеоролик',
            'Дебаты',
            'Деловая (ролевая) игра',
            'Деловая игра',
            'Дискуссия',
            'Доклад',
            'Домашнее задание',
            'Проектное задание',
            'Задача',
            'Исследовательская работа',
            'Кейс',
            'Коллоквиум',
            'Контрольная работа',
            'Круглый стол',
            'Лабораторная работа',
            'Опрос',
            'Отчет',
            'Портфолио',
            'Практическая работа',
            'Презентация',
            'Проект',
            'Расчетно-графические работы',
            'Резюме',
            'Реферат',
            'Рецензия',
            'Ситуационное (проблемное) задание',
            'Сообщение',
            'Тезисы',
            'Тест',
            'Расчет',
            'Эссе',
            'Электронное тестирование в ЦДО',
        ]
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
