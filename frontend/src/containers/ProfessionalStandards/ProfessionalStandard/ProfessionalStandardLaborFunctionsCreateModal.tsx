import {useDispatch} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import {Button, FormControl, InputLabel, MenuItem} from "@material-ui/core";
import actions from "../actions";
import {useParams} from "react-router-dom";
import Select from "@material-ui/core/Select";
import {useStyles} from "./ProfessionalStandard.styles"
import DialogActions from "@material-ui/core/DialogActions";

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

    const disableButton = code.length === 0 && name.length === 0 && qualificationLevel.length == 0;

    return (
        <Dialog open={isOpen}>
            <DialogTitle> Трудовая функция </DialogTitle>
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
                    <Select className={classes.input}
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
                                getContentAnchorEl: null
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

            <DialogActions className={classes.actions}>
                <Button onClick={handleCancel}>Отмена</Button>
                <Button
                  onClick={handleSave}
                  disabled={disableButton}
                >
                  Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
}