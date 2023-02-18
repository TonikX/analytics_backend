import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Dialog, Button, DialogTitle, DialogContent, Box
} from "@material-ui/core";
import {useStyles} from "./AddModuleToPlan.styles";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {Modules} from "./Modules";
import {EducationalPlans} from "./EducationalPlans";
import {BlockSelector} from "./BlockSelector";
import {SelectedPlans} from "./SelectedPlans";
import actions from "./actions";
import {getSelectAll, getSelectedBlock, getSelectedModules, getSelectedPlans} from "./getters";

export const AddModuleToPlan = () => {
        const dispatch = useDispatch();
        const classes = useStyles();

        const [isOpen, setOpen] = useState(false);

        const selectedModules = useSelector(getSelectedModules);
        const selectedPlans = useSelector(getSelectedPlans);
        const selectedBlock = useSelector(getSelectedBlock);
        const selectAll = useSelector(getSelectAll);

        const disabled = selectedModules.length === 0 || (selectedPlans.length === 0 && !selectAll) || !selectedBlock;

        const openDialog = () => {
            setOpen(true);
        };

        const closeDialog = () => {
            setOpen(false);
        };

        const applyChanges = () => {
            dispatch(actions.addModuleToPlan());
            setOpen(false);
        };

        return <Box>
            <Button variant="outlined" color="secondary" onClick={openDialog}>Добавить модули в УП</Button>
            <Dialog
                open={isOpen}
                fullScreen
            >
                <DialogTitle>
                    <Typography variant="h4" align="center">
                        Добавить модули в учебный план
                    </Typography>
                </DialogTitle>
                <DialogContent className={classes.addModulesModal}>
                    <div className={classes.upperContent}>
                        <div className={classes.upperContentLeft}>
                            <Typography variant="h6">
                                Выберите блок для добавления
                            </Typography>
                            <BlockSelector/>
                        </div>
                        <div className={classes.upperContentRight}>
                            <Typography variant="h6">
                                Выбранные планы
                            </Typography>
                            <SelectedPlans/>
                        </div>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.contentLeft}>
                            <Modules/>
                        </div>
                        <div className={classes.contentRight}>
                            <EducationalPlans/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className={classes.footer}>
                    <Button color="primary" onClick={applyChanges} disabled={disabled}>Применить</Button>
                    <Button color="secondary" onClick={closeDialog}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </Box>
    }
;
