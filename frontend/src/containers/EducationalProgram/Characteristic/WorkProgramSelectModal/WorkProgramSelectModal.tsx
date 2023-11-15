import Dialog from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import {useStyles} from "./WorkProgramSelectModal.styles";
import {useSelector} from "react-redux";
import {rootState} from "../../../../store/reducers";
import {getCharacteristicsWorkProgram} from "../../getters";
import SearchSelector from "../../../../components/SearchSelector";
import DialogContent from "@mui/material/DialogContent";

interface Props {
  onSelect: (wpId: number) => void;
  onCancel: () => void;
}

export const WorkProgramSelectModal = ({
  onSelect,
  onCancel,
}: Props) => {
  const classes = useStyles();
  const [selectedWp, setSelectedWp] = useState<{value?: number; label: string}>({value: undefined, label: ''})
  const [searchedText, setSearchedText] = useState('')
  const characteristicsWorkPrograms = useSelector((state: rootState) => getCharacteristicsWorkProgram(state))

  const workProgramList = characteristicsWorkPrograms.reduce((wpList, item) => {
    const title = item?.title?.toLowerCase();
    const id = item?.id?.toString();
    const searchedTextLowerCase = searchedText.toLowerCase();
    if (searchedTextLowerCase.length === 0 || title?.includes(searchedTextLowerCase) || id?.includes(searchedTextLowerCase)) {
      return [
        ...wpList,
        {
          value: item?.id,
          label: item?.title
        }
      ]
    }
    return wpList;
  }, [])

  return (
    <Dialog
      open
      fullWidth
      maxWidth="sm"
      classes={{
        paper: classes.dialog
      }}
    >
      <DialogTitle className={classes.title}>В какую РПД добавить индикатор?</DialogTitle>

      <DialogContent className={classes.dialogContent}>
        <SearchSelector label="Рабочая программа* "
                        changeSearchText={setSearchedText}
                        list={workProgramList}
                        changeItem={(value: number, label: string) => {
                          setSelectedWp({
                            value,
                            label
                          })
                        }}
                        value={selectedWp.value}
                        valueLabel={selectedWp.label}
        />
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button onClick={onCancel}
                variant="text">
          Отмена
        </Button>
        <Button onClick={() => selectedWp.value ? onSelect(selectedWp.value) : undefined}
                variant="contained"
                disabled={!selectedWp.value}
                color="primary">
          Продолжить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
