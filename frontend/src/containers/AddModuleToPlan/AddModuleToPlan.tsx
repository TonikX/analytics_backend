import * as React from "react";
import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {
    Dialog, Button, DialogTitle, DialogContent, TextField, Box, Checkbox
} from "@material-ui/core";
import actions from "./actions";
import {useStyles} from "./AddModuleToPlan.styles";
import Typography from "@material-ui/core/Typography";
import Scrollbars from "react-custom-scrollbars";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {TrainingModuleFields} from "../EducationalPlan/TrainingModules/enum";
import TableBody from "@material-ui/core/TableBody";
import {TrainingModuleType} from "../EducationalPlan/TrainingModules/types";
import {getUserFullName} from "../../common/utils";
import TablePagination from "@material-ui/core/TablePagination";

type SelectItem = {
    label: string;
    value: string;
}

export const AddModuleToPlan = () => {
        const dispatch = useDispatch();
        const classes = useStyles();

        const [isOpen, setOpen] = useState(false);
        const [topic, setTopic] = useState('');
        const [text, setText] = useState('');
        const [sendToAll, setSendToAll] = useState(false);
        const [users, setUsers] = useState([] as SelectItem[]);

        const clearData = () => {
            setText('');
            setTopic('');
            setUsers([]);
            setSendToAll(false);
        };

        const openDialog = () => {
            setOpen(true);
        };

        const closeDialog = () => {
            setOpen(false);
            clearData();
        };

        const sendEmails = () => {
            dispatch(actions.sendEmail({send_to_all: sendToAll, topic, text, users: users.map(it => it.value)}));
            closeDialog();
        };


        const trainingModules: Partial<TrainingModuleType>[] = [
            {
                "id": 108175,
                "module_isu_id": "126",
                "name": "Модуль с практикой без уп для Полины",
                "type": "faculty_module",
                "editors": [{
                    "id": 1,
                    "username": "op_admin",
                    "first_name": "Anton",
                    "last_name": "Govorov",
                }]
            }, {
                "id": 108174,
                "module_isu_id": "124",
                "name": "Новый модуль для примера Полине",
                "type": "faculty_module",
                "editors": [{
                    "id": 1,
                    "username": "op_admin",
                    "first_name": "Anton",
                    "last_name": "Govorov",
                }]
            }, {
                "id": 108166,
                "module_isu_id": "123",
                "name": "Модуль\"Основы клеточного метаболизма и сигналинга / Fundamentals of Cell Metabolism and Signaling\"",
                "type": "faculty_module",
                "editors": [{
                    "id": 1612,
                    "username": "upirop",
                    "first_name": "",
                    "last_name": "",
                }]
            }
        ];
        const allCount = 10;
        const currentPage = 1;

        const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
            // this.props.actions.changeCurrentPage(page + 1);
            // this.props.actions.getTrainingModulesList();
        }

        const someFieldsAreEmpty = !text.trim() || !topic.trim() || (!users.length && !sendToAll);

        return <Box>
            <Button variant="outlined" color="secondary" onClick={openDialog}>Добавить модули в УП</Button>
            <Dialog
                open={isOpen}
                fullScreen
            >
                <DialogTitle>Добавить модули в учебный план</DialogTitle>
                <DialogContent className={classes.addModulesModal}>
                    <div className={classes.content}>
                        <div className={classes.contentLeft}>
                            <Typography className={classes.textItem}>
                                Выберите модули
                            </Typography>
                            <Scrollbars>
                                <div className={classes.tableWrap}>
                                    <Table stickyHeader size='small'>
                                        <TableHead className={classes.header}>
                                            <TableRow>
                                                <TableCell>
                                                    Название
                                                </TableCell>
                                                <TableCell>
                                                    Выбрать
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {trainingModules.map((trainingModule: Partial<TrainingModuleType>) => {
                                                return (
                                                    <TableRow key={trainingModule[TrainingModuleFields.ID]}>
                                                        <TableCell>
                                                            {trainingModule[TrainingModuleFields.NAME]} / {trainingModule[TrainingModuleFields.ID]} / {trainingModule[TrainingModuleFields.ISU_ID]} / {trainingModule[TrainingModuleFields.EDITORS]?.map((editor) => getUserFullName(editor)).join(', ')}
                                                        </TableCell>
                                                        <TableCell className={classes.selectModule}>
                                                            <Checkbox checked={true}
                                                                      onChange={(event) => {
                                                                      }}/>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </Scrollbars>
                            <div>
                                <TablePagination count={allCount}
                                                 component="div"
                                                 page={currentPage - 1}
                                                 rowsPerPageOptions={[]}
                                                 onChangePage={handleChangePage}
                                                 rowsPerPage={10}
                                                 onChangeRowsPerPage={() => {
                                                 }}
                                />
                            </div>
                        </div>
                        <div className={classes.contentRight}>
                            <Typography className={classes.textItem}>
                                Выберите учебный план
                            </Typography>
                            <TextField
                                label="Тема сообщения"
                                variant="outlined"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Button color="primary" disabled={someFieldsAreEmpty} onClick={sendEmails}>Применить</Button>
                        <Button color="secondary" onClick={closeDialog}>Отмена</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    }
;
