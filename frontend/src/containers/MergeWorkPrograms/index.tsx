import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import debounce from 'lodash/debounce';
import {Autocomplete} from "@mui/lab";
import {FormControl, Button, Modal, Box, Typography, TextField} from '@mui/material';
import {useStyles} from './MergeWorkProgramsBlock.styles';
import actions from './actions';
import {getWorkProgramList} from './getters';

type WorkProgramSelectType = 'source' | 'target'
type WorkProgramSelectProps = {
    type: WorkProgramSelectType;
    onChange: (x: string, type: WorkProgramSelectType) => void;
};
type OptionItem = { id: string; label: string } | null;

const WorkProgramSelect = ({type, onChange}: WorkProgramSelectProps) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const workPrograms = useSelector(getWorkProgramList);

    const labelText = type === 'source' ? 'Откуда' : 'Куда';
    const options = workPrograms.map((item) => ({
        label: `${item.title} (${item.discipline_code})`,
        id: item.id.toString(),
    }))

    useEffect(() => {
        dispatch(actions.getWorkProgramsList())
    }, []);

    const debounceSearch = debounce((value: string): void => {
        dispatch(actions.setSearchQuery(inputValue));
        dispatch(actions.getWorkProgramsList(value))
    }, 500);

    const handleChange = (event: ChangeEvent<{}>, item: OptionItem) => {
        if (item) {
            onChange(item.id, type);
        }
    };

    const changeSearch = (event: ChangeEvent<{}>, value: string) => {
        setInputValue(value);
        if (event && event.type === "change") {
            debounceSearch(value);
        }
    };

    const resetSearch = (_event: ChangeEvent<{}>) => {
        setInputValue('');
        dispatch(actions.setSearchQuery(''));
        dispatch(actions.getWorkProgramsList())
    };

    return (
        <FormControl fullWidth variant="outlined">
            <Autocomplete
                onClose={resetSearch}
                inputValue={inputValue}
                options={options}
                onChange={handleChange}
                onInputChange={changeSearch}
                getOptionLabel={option => option.label}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label={labelText}/>}
            />
        </FormControl>
    )
};

type ModalProps = {
    open: boolean;
    handleClose: () => void;
    confirm: () => void;
};

const CopyWorkProgramsModal = ({open, handleClose, confirm}: ModalProps) => {
    const classes = useStyles();
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className={classes.modal}>
                <Typography variant="h6" component="h2">
                    Вы уверены, что хотите скопировать содержимое рабочей программы дисциплины?
                </Typography>
                <div className={classes.modalFooter}>
                    <Button color="primary" onClick={confirm}>Да</Button>
                    <Button color="secondary" onClick={handleClose}>Отмена</Button>
                </div>
            </Box>
        </Modal>
    )
};

export default ({className}: { className: string }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [sourceId, setSource] = useState('');
    const [targetId, setTarget] = useState('');
    const [modalIsOpen, handleModalOpen] = useState(false);

    const closeModal = () => handleModalOpen(false);
    const openModal = () => handleModalOpen(true);
    const mergeContent = () => {
        closeModal();
        dispatch(actions.mergeWorkPrograms({sourceId, targetId}));
    };

    const disabled = !sourceId || !targetId;

    const selectWorkProgram = (val: string, type: WorkProgramSelectType) => {
        switch (type) {
            case "source":
                setSource(val);
                break;
            case "target":
                setTarget(val);
                break;
            default:
                break;
        }
    };

    return (
        <Box className={className}>
            <Typography className={classes.itemTitle}>
                Скопировать содержимое рабочей программы дисциплины
            </Typography>
            <div className={classes.root}>
                <div className={classes.controls}>
                    <WorkProgramSelect type="source" onChange={selectWorkProgram}/>
                    <WorkProgramSelect type="target" onChange={selectWorkProgram}/>
                </div>
                <Button disabled={disabled} color="secondary" onClick={openModal}>Копировать</Button>
            </div>
            <CopyWorkProgramsModal
                open={modalIsOpen}
                handleClose={closeModal}
                confirm={mergeContent}
            />
        </Box>
    )
}
