import React, { useEffect, useState, useCallback } from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";
import { groupType } from './types';
import actions from '../actions';
import {useDispatch} from 'react-redux'


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';
import {allGroups} from './AllGroups'

// import {CompetenceFields} from '../enum';
import { useStyles } from './AddModal.styles'
import classNames from "classnames";
import { useStore } from 'react-redux';
import { group } from 'console';

interface AddProps {
    persId: number,
    groups: groupType[],
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddModal: React.FC<AddProps> = ({persId, groups, modal, setModal}: AddProps,) => {

    const dispatch = useDispatch()
    const [rolesAdd, setRolesAdd] = useState([{id: -1, name: '', permissions: [-1]}])
    const [errVisible, setErrVisible] = useState(false)
    const [i, setI] = useState(0)

    const classes = useStyles()

    const Toggle = () => setModal(!modal)

    const getGroupsId = () => {
        const newRoles = [...rolesAdd, ...groups]
        return newRoles.map(role => role.id).slice(1)
    }

    const notAddedGroupClass = `${classes.role} btn btn-outline-primary`
    const addedGroupClass = `${classes.role} ${classes.roleNotToAdd}`

    const getGroups = () => {
        return groups.map(group => 
            !allGroups.includes(group) ?
             <div className={addedGroupClass}>{group?.name}</div>:<></>)
    } 

    const getGroupsToAdd = () => {
        return allGroups.map(group => 
            !groups.some(groupAdded => groupAdded.name == group.name) ? 
            <div id={group.name} className={notAddedGroupClass} 
            onClick={() => {
                const isSelected = rolesAdd.includes(group)
                changeRoleForAddStyle(group?.name, isSelected);
                if (!(rolesAdd.includes(group))) {
                    setRolesAdd(prev => [...prev, group])} else {
                        setRolesAdd(prev => prev.filter(role => role != group))
                    }
                 }}>{group.name}</div>: <></>
        )
    }

    const changeRoleForAddStyle = (id: string, isSelected: boolean) => {
        const button = document.getElementById(id);
        if (button) {
            if (isSelected) {
                button.className = `${classes.role} btn btn-outline-primary`;
            } else button.className = `${classes.role} btn btn-primary`;
        } 
    }

    const addRoles = () => {
        if (rolesAdd.length > 1) {
            updateRoles()
            setRolesAdd([{id: -1, name: '', permissions: [-1]}]);
            Toggle()
        } else setErrVisible(!errVisible)
        
    }

    const updateRoles = useCallback(() => {
        dispatch(actions.updateGroups({newGroups: getGroupsId(), id: persId}))
    }, [rolesAdd])

    const changeProcess = () => {
        setRolesAdd([{id: -1, name: '', permissions: [-1]}]);
        Toggle()
    }

    return (
        <Dialog
                style={{overflow: 'hidden'}}
                open={modal}
                maxWidth={'md'}
                classes={{
                    paper: classes.dialog
                }}
        >
            <DialogTitle>Выберете группы для добавления</DialogTitle>
            <div className = {classes.groups}>{getGroups()} {getGroupsToAdd()}</div>
        <DialogActions>
            <Button onClick={changeProcess}>Отменить добавление</Button>
            <Button variant="contained" color="primary" onClick={addRoles}>Добавить группы</Button>
        </DialogActions>
        <p style={{color: 'red', paddingTop: '10px', display: `${errVisible ? 'block': 'none'}`}}>Вы не выбрали ни одной группы</p>
        </Dialog>
    )
}

