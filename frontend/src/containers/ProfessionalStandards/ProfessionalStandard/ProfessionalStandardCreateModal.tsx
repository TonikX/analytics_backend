import {useDispatch} from "react-redux";
import {useStyles} from "../../DodProfile/DodProfile.styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {ProfessionalStandardFields} from "../enum";
import classNames from "classnames";
import React, {useState} from "react";
import {Button} from "@material-ui/core";
import actions from "../actions";
import {useParams} from "react-router-dom";


export default ({isOpen, handleCloseModal}: any,) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const {id } = useParams()
    const [code, setCode] = useState('')
    const [ name, setName] = useState('')
    const [qualificationLevel, setQualificationLevel] = useState('')

    const professionalStandardFields={
        id:id,
        name:name,
        code:code,
        qualificationLevel:qualificationLevel
    }

    const handleSave = () => {
        dispatch(actions.createProfessionalStandardAdditionalFields(professionalStandardFields))
        handleCloseModal()
    }

    return (

        <Dialog open={isOpen}>
            <DialogTitle> профессиональный стандарт </DialogTitle>
            <DialogContent>

                <TextField

                    label="Код"
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    InputLabelProps={{
                    shrink: true,
                }}/>
                <TextField
                    label="Наименование"
                    onChange={e => setName(e.target.value)}
                    value={name}

                    InputLabelProps={{
                    shrink: true,
                }}/>
                <TextField
                    label="Уровень квалификации"
                    onChange={e => setQualificationLevel(e.target.value)}
                    value={qualificationLevel}

                    InputLabelProps={{
                    shrink: true,
                }}/>
            </DialogContent>


            <DialogContent>
                <Button>Отмена</Button>
                <Button onClick={handleSave}>Сохранить</Button>
            </DialogContent>
        </Dialog>

    )

}