import {useDispatch} from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {Button, FormControl, InputLabel, MenuItem} from "@mui/material";
import actions from "../actions";
import {useParams} from "react-router-dom";
import Select from "@mui/material/Select";
import {useStyles} from "./ProfessionalStandard.styles"
import DialogActions from "@mui/material/DialogActions";

export default ({ isOpen, handleCloseModal, laborFunction }: any,) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { id: profStandardId } = useParams()
    const [code, setCode] = useState(laborFunction?.code || '')
    const [name, setName] = useState(laborFunction?.name || '')
    const [qualificationLevel, setQualificationLevel] = useState(laborFunction?.qualification_level || '')

    const handleSave = () => {
        const professionalStandardFields = {
            profStandardId,
            name: name,
            code: code,
            id: laborFunction?.id,
            qualificationLevel: qualificationLevel
        }

        if (laborFunction?.id) {
            dispatch(actions.updateProfessionalStandardAdditionalFields(professionalStandardFields))
        } else {
            dispatch(actions.createProfessionalStandardAdditionalFields(professionalStandardFields))
        }

        handleCloseModal()
    }

    const handleCancel = () => {
        handleCloseModal()
    }

    const disableButton = code.length === 0 || name.length === 0 || qualificationLevel.length === 0;

    return (
        <Dialog open={isOpen}>
            <DialogTitle> {laborFunction?.id ? 'Редактировать трудовую функцию' : 'Создать трудовую функцию'} </DialogTitle>
            <DialogContent>
                <TextField
                    label="Код"
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    variant="outlined"
                    className={classes.input}
                    InputLabelProps={{
                        shrink: true,
                    }}/>
                <TextField
                    label="Наименование"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    variant="outlined"
                    className={classes.input}
                    InputLabelProps={{
                        shrink: true,
                    }}/>

                <FormControl variant="outlined">
                    <InputLabel>Выберите уровень квалификации </InputLabel>
                    <Select className={classes.select}
                            label="Выберите уровень квалификации"
                            value={qualificationLevel}
                            onChange={(e: any) => setQualificationLevel(e.target.value)}
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left"
                                },
                            }}
                    >
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions className={classes.buttonActions}>
                <Button onClick={handleCancel}>Отмена</Button>
                <Button
                  onClick={handleSave}
                  disabled={disableButton}
                  color="primary"
                  variant="contained"
                >
                  Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
}