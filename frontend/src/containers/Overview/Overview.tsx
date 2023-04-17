import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import Button from '@mui/material/Button'
import { useStyles } from './Overview.styles'
import actions from '../../layout/actions'

export default () => {
    const classes = useStyles();
    const [selectedMenu, setSelectedMenu] = useState([1])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.setMockMenu(selectedMenu))
    }, [selectedMenu])

    const toggleMenu = (id: number): void => {
        if (!selectedMenu.find((menu) => menu === id)) {
            setSelectedMenu([...selectedMenu, id])
        } else {
            const newSelectedMenu = selectedMenu.filter((menu) => menu !== id)
            setSelectedMenu(newSelectedMenu)
        }
        
    }
    return (
        <>
        <div className={classes.cardList}>
            <Button 
                className={classNames(classes.card, {[classes.selectedCard]: selectedMenu.find((menu) => menu === 1)})}
                onClick={() => toggleMenu(1)}
            >
                Индивидуальные образовательные траектории
            </Button>
            <Button 
                className={classNames(classes.card, {[classes.selectedCard]: selectedMenu.find((menu) => menu === 2)})} 
                onClick={() => toggleMenu(2)}
            > 
                Конструктор РПД
            </Button>
            <Button 
                className={classNames(classes.card, {[classes.selectedCard]: selectedMenu.find((menu) => menu === 3)})} 
                onClick={() => toggleMenu(3)}
            > 
                Навигатор дисциплин 
            </Button>
            <Button 
                className={classNames(classes.card, {[classes.selectedCard]: selectedMenu.find((menu) => menu === 4)})} 
                onClick={() => toggleMenu(4)}
            > 
                Навигатор по образовательным модулям 
            </Button>
            <Button 
                className={classNames(classes.card, {[classes.selectedCard]: selectedMenu.find((menu) => menu === 5)})} 
                onClick={() => toggleMenu(5)}
            > 
                Навигатор по образовательным траекториям 
            </Button>
            <Button 
                className={classNames(classes.card, {[classes.selectedCard]: selectedMenu.find((menu) => menu === 6)})} 
                onClick={() => toggleMenu(6)}
            > 
                Навигатор по онлайн курсам 
            </Button>
            <Button 
                className={classNames(classes.card, {[classes.selectedCard]: selectedMenu.find((menu) => menu === 7)})} 
                onClick={() => toggleMenu(7)}
            > 
                Навигатор по образовательным программам 
            </Button>
            <Button 
                className={classNames(classes.card, {[classes.selectedCard]: selectedMenu.find((menu) => menu === 8)})} 
                onClick={() => toggleMenu(8)}
            > 
                Сервис проектирования образовательным программ 
            </Button>
        </div>
        </>
    )
}