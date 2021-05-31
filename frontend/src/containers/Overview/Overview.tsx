import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import { useStyles } from './Overview.styles'
import actions from '../../layout/actions'

export default () => {
    const classes = useStyles();
    const [selectedMenu, setSelectedMenu] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.setMockMenu(selectedMenu))
    }, [selectedMenu])

    return (
        <div className={classes.cardList}>
            <div className={classNames(classes.card, {[classes.selectedCard]: selectedMenu === 1})} onClick={() => setSelectedMenu(1)}>
                <Button> Индивидуальные образовательные траектории </Button>
            </div>
            <div className={classNames(classes.card, {[classes.selectedCard]: selectedMenu === 2})} onClick={() => setSelectedMenu(2)}>
                <Button> Конструктор РПД </Button>
            </div>
            <div className={classNames(classes.card, {[classes.selectedCard]: selectedMenu === 3})} onClick={() => setSelectedMenu(3)}>
                <Button> Навигатор дисциплин </Button>
            </div>
            <div className={classNames(classes.card, {[classes.selectedCard]: selectedMenu === 4})} onClick={() => setSelectedMenu(4)}>
                <Button> Навигатор по образовательным модулям </Button>
            </div>
            <div className={classNames(classes.card, {[classes.selectedCard]: selectedMenu === 5})} onClick={() => setSelectedMenu(5)}>
                <Button> Навигатор по образовательным траекториям </Button>
            </div>
            <div className={classNames(classes.card, {[classes.selectedCard]: selectedMenu === 6})} onClick={() => setSelectedMenu(6)}>
                <Button> Навигатор по онлайн курсам </Button>
            </div>
            <div className={classNames(classes.card, {[classes.selectedCard]: selectedMenu === 7})} onClick={() => setSelectedMenu(7)}>
                <Button> Навигатор по образовательным программам </Button>
            </div>
            <div className={classNames(classes.card, {[classes.selectedCard]: selectedMenu === 8})} onClick={() => setSelectedMenu(8)}>
                <Button> Сервис проектирования образовательным программ </Button>
            </div>
        </div>
    )
}