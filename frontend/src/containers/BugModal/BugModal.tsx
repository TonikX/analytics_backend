import React, { useEffect, useState } from "react";
import useStyles from './BugModal.styles';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from "../../store/reducers";
import { getShowBugModal } from "../../layout/getters";
import Dialog from '@mui/material/Dialog';
import BugModalLocalStorage from './bugModalLocalStorage';
import actions from "../../layout/actions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const bugModalLocalStorage = new BugModalLocalStorage();

export const BugModal = () => {
  const dispatch = useDispatch();
  const bugModal = useSelector((state: rootState) => getShowBugModal(state))
  const location = useLocation();
  const currentPath = location.pathname;
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const classes = useStyles();
  const [showCheckBox, setShowCheckBox] = useState(false);

  useEffect(() => {
    bugModalLocalStorage.updatePageTransition();
    if (bugModalLocalStorage.getPageTransitions() >= 20) {
      dispatch(actions.setShowBugModalTrue());
      setShowCheckBox(true);
      bugModalLocalStorage.resetPageTransitions();
    } else {
      setShowCheckBox(false);
    }
  }, [currentPath]);

  const handleChange = (event:any) => {
    setChecked(event.target.checked);
    bugModalLocalStorage.setDisableAutoShowModal(checked);
  };

  const handleTitleFieldChange = (event:any) => {
    setTitle(event.target.value);
  };

  const handleDescriptionFieldChange = (event:any) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  const closeBugModal = () => {
    dispatch(actions.setShowBugModalFalse());
  };

  const handleSave = () => {
    dispatch(actions.sendBug({title, description, selectedFile}));
  };

  console.log(bugModalLocalStorage.getPageTransitions())

  return (
    <Dialog
      open={bugModal}
      onClose={closeBugModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>Нашли баг?</DialogTitle>
      <DialogContent className={classes.formInput}>
        <TextField label='Заголовок'
                   onChange={handleTitleFieldChange}
                   variant="outlined"
                   value={title}
                   InputLabelProps={{
                     shrink: true,
                   }}
                   className={classes.formInput_margin}
        />
        <TextField label='Описание'
                   onChange={handleDescriptionFieldChange}
                   variant="outlined"
                   value={description}
                   InputLabelProps={{
                     shrink: true,
                   }}
                   className={classes.formInput_margin}
        />
        <Button
          variant="contained"
          component="label"
          className={classes.formInput_margin}
        >
          {!selectedFile ? 'Загрузить файл' : 'Обновить файл'}
          <input
            type="file"
            onChange={handleFileChange}
            hidden
          />
        </Button>

        {selectedFile ? <>{selectedFile?.name}
          <DeleteIcon onClick={() => setSelectedFile(null)} />
        </> : null}
      </DialogContent>

      <DialogActions>
        {showCheckBox && (<FormControlLabel
          control={
            <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name="checked"
                  color="primary"
                />
              }
              label="Больше не показывать"
            />
        )}
        <Button onClick={closeBugModal}
                variant="text">
          Отмена
        </Button>
        <Button variant="contained"
                color="primary"
                onClick={handleSave}
        >
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
