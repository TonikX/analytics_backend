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
            'Активность на занятиях',
            'Активность на практических занятиях',
            'Аналитический отчет',
            'Видеоролик',
            'Дебаты',
            'Деловая (ролевая) игра',
            'Деловая игра',
            'Дискуссия',
            'Доклад',
            'Домашнее задание и работа на практических занятиях',
            'Домашняя работа (рабочая тетрадь)',
            'Домашняя работа (эссе)',
            'Задание',
            'Задача/домашнее задание',
            'Индивидуальное задание',
            'Исследовательская работа',
            'Кейс',
            'Коллоквиум',
            'Контрольная работа',
            'Круглый стол',
            'Лабораторная работа',
            'Лабораторно-проектная деятельность',
            'Опрос',
            'Отчет',
            'Отчет по практической работе',
            'Портфолио',
            'Практическое задание',
            'Презентация',
            'Проверка работ сокурсников и представление обратной связи',
            'Проект',
            'Проектное задание',
            'Работа на практических занятиях',
            'Расчетно-графическая работа (типовик)',
            'Расчетно-графические работы',
            'Реферат',
            'Рубежное тестирование',
            'Ситуационное (проблемное) задание',
            'Ситуационное задание',
            'Сообщение',
            'Текущее тестирование',
            'Теоретический тест',
            'Тест',
            'Тестирование в аудитории',
            'Типовой расчет',
            'Устный опрос',
            'Устный практикум',
            'Электронное тестирование (тест в ЦДО)',
            'Эссе',
        ]
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
