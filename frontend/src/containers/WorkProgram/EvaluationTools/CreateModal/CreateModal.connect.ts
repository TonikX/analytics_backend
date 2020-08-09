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
            'Дебаты / Дискуссия / Круглый стол',
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

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
