import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import get from 'lodash/get'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import actions from './actions'
import { getPersonality } from './getters'
import { useStyles } from './Personality.styles'
import { rootState } from '../../store/reducers'
import {fields} from './enum'
import {groupType} from './AddModal/types'
import Button  from '@material-ui/core/Button'
import { AddModal } from './AddModal/AddModal'
import ConfirmDialog from "../../components/ConfirmDialog";

export const Personality: React.FC = () => {
    const [isDelitingProcess, setIsDeletingProcess] = useState(false);
    const [modal, setModal] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [rolesDel, setRolesDel] = useState([{id: -1, name: '', permissions: [-1]}]);
    const classes = useStyles()
    const dispatch = useDispatch()
    const params = useParams()
    const personality = useSelector((state: rootState) => getPersonality(state))
    useEffect(() => {
        dispatch(actions.getPersonality(get(params, 'id', null)))
      }, [])

    const toggle = () => setModal(!modal);
    const groups: Array<groupType> = personality[fields.GROUPS];

    const getGroups = (groups: Array<groupType>) => {
        let roleClass: string;
        if (isDelitingProcess) {
            roleClass = `${classes.role} btn btn-outline-danger`;
            return groups.map(group => {
            return(<div id={group?.name} className={roleClass} onClick={(ev) => {
                const isSelected = rolesDel.includes(group)
                changeRoleForDelStyle(ev.target as HTMLDivElement, isSelected);
                if (!(rolesDel.includes(group))) {
                    setRolesDel(prev => [...prev, group])} else {
                        setRolesDel(prev => prev.filter(role => role != group))
                    }
                 }}>{group?.name}</div>)})
        } else {
            roleClass = `${classes.role} ${classes.roleNotWhileDeliting}`;
            return groups.map(group => <div className={roleClass}>{group?.name}</div>)
        }
    }

    const changeRoleForDelStyle = (node: HTMLDivElement, isSelected: boolean) => {
            if (isSelected) {
                node.className = `${classes.role} btn btn-outline-danger`;
            } else node.className = `${classes.role} btn btn-danger`;
    }

    const getGroupsId = () => {
        const newRoles = groups.filter(group => !rolesDel.includes(group))
        return newRoles.map(role => role.id)
    }

    const getEmail = () => personality[fields.EMAIL] != '' ? personality[fields.EMAIL] : "Не указана"

    const getISU = () => personality[fields.ISU_NUMBER] != null ? personality[fields.ISU_NUMBER] : "Не указан"

    const deleteText = () => isDelitingProcess ? "Удалить выбранные группы": "Выбрать группы для удаления"

    const getAddButton = () => {
        if (!isDelitingProcess && groups.length < 8) {
            return (<Button onClick={toggle} variant="contained" color="primary" className={classes.add}>+</Button>)
        } else {
            return <></>
        }
    }

    const getCancelButton = () => {
        if (isDelitingProcess) {
            return (<Button className = {classes.cancel} onClick={changeProcess}>Отменить удаление</Button>)
        } else {
            return <></>
        }
    }

    const getDelButtonAction = () => isDelitingProcess ? confirmDeleteDialog: changeProcess;
    
    const deleteRoles = () => {
        updateRoles()
        setRolesDel([{id: -1, name: '', permissions: [-1]}]);
        setIsDeletingProcess(!isDelitingProcess)
    }

    const updateRoles = () => dispatch(actions.updateGroups({newGroups: getGroupsId(), id: personality.id}))

    const changeProcess = () => setIsDeletingProcess(!isDelitingProcess)
    

    const handleConfirmDeleteDialog = () => {
        deleteRoles()
        setConfirmDialog(!confirmDialog)
        changeProcess()
    }

    const confirmDeleteDialog = () => setConfirmDialog(!confirmDialog)
    
  
    return(
        <div className={classes.wrap}>
            <Paper className={classes.root}>
            <Typography className={classes.basicInfo}>
                <div className = {classes.persName}>{personality[fields.FIRST_NAME]} {personality[fields.LAST_NAME]}</div>
                <Typography className={classes.textItem}>
                    <b>Почта:</b> {getEmail()}
                </Typography>
                <Typography className={classes.textItem}>
                    <b>Номер ИСУ:</b> {getISU()}
                </Typography>
            </Typography>
                <div className={classes.content}>
                    <div className={classes.main}>
                        <Typography>
                            <b>Группы:</b> 
                            <div className = {classes.groups}> {getGroups(personality[fields.GROUPS])}
                               {getAddButton()}
                            </div>
                            <Button style={{display: `${groups.length === 0 ? 'none': ''}`}} variant="contained" color="secondary" className = {classes.del} onClick = {getDelButtonAction()}>{deleteText()}</Button>
                            {getCancelButton()}
                        </Typography>
                    </div>
                </div>

                <AddModal persId={personality.id} groups={personality[fields.GROUPS]} modal={modal} setModal={setModal}/>
                <ConfirmDialog onConfirm={handleConfirmDeleteDialog}
                               onDismiss={confirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить группы?'}
                               isOpen={confirmDialog}
                               dialogTitle={'Удалить группы'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        </div>
    )
}

export default Personality;