import React, {ChangeEvent} from 'react';
import get from "lodash/get";

import {shallowEqual} from "recompose";

import Scrollbars from "react-custom-scrollbars";

import {LiteratureModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from "@material-ui/icons/Add";

import SearchOutlined from "@material-ui/icons/SearchOutlined";

import {fields} from '../../enum';

import {literatureFields} from "../../../Literature/enum";
import {LiteratureType} from "../../../Literature/types";
import CreateLiteratureModal from '../../../Literature/LiteratureCreateModal';

import connect from './LiteratureModal.connect';
import styles from './LiteratureModal.styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

class LiteratureModal extends React.PureComponent<LiteratureModalProps> {
    state = {
        selectedLiterature: []
    };

    componentDidMount() {
        this.props.literatureActions.getLiterature();
    }

    componentDidUpdate(prevProps: Readonly<LiteratureModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {selectedItems} = this.props;

        if (!shallowEqual(selectedItems, prevProps.selectedItems)){
            this.setState({
                selectedLiterature: selectedItems
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog(fields.ADD_NEW_LITERATURE);
    }

    handleSave = () => {
        this.props.actions.addLiterature(this.state.selectedLiterature);
    }

    handleChangeLiteratureSearchText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.props.literatureActions.changeSearchQuery(get(event, 'target.value', ''));
        this.props.literatureActions.getLiterature();
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.literatureActions.changeCurrentPage(page + 1);
        this.props.literatureActions.getLiterature();
    }

    handleChangeSelect = (item: LiteratureType) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const {selectedLiterature} = this.state;

        if (checked){
            this.setState({selectedLiterature: [...selectedLiterature, item]});
        } else {
            this.setState({selectedLiterature: selectedLiterature.filter(selectedItem =>
                    selectedItem[literatureFields.ID] !== item[literatureFields.ID])});
        }
    }

    render() {
        const {isOpen, classes, allCount, literatureList, currentPage} = this.props;
        const {selectedLiterature} = this.state;

        const disableButton = selectedLiterature.length === 0;

        return (
            <>
                <Dialog
                    open={isOpen}
                    onClose={this.handleClose}
                    classes={{
                        root: classes.root,
                        paper: classes.dialog
                    }}
                    fullScreen
                    //@ts-ignore
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Добавить источник
                            </Typography>
                            <div className={classes.link}
                                 onClick={()=> {this.props.literatureActions.openDialog();}}
                            >
                                <Button autoFocus
                                        color="inherit"
                                >
                                    <AddIcon />
                                    Создать источник литературы
                                </Button>
                            </div>
                        </Toolbar>
                    </AppBar>

                    <DialogContent className={classes.dialogContent}>
                        <div className={classes.dialogSearch}>
                            <TextField placeholder="Поиск"
                                       variant="outlined"
                                       InputProps={{
                                           classes: {
                                               root: classes.searchInput
                                           },
                                           startAdornment: <SearchOutlined />,
                                       }}
                                       onChange={this.handleChangeLiteratureSearchText}
                            />
                        </div>

                        <Scrollbars>
                            <div className={classes.list}>
                                {selectedLiterature.map && selectedLiterature.map((item: LiteratureType) =>
                                    <div className={classes.item}>
                                        <Typography>{item[literatureFields.DESCRIPTION]}</Typography>
                                        <Checkbox checked={true}
                                                  onChange={this.handleChangeSelect(item)}/>
                                    </div>
                                )}
                                {literatureList.map((item: LiteratureType) => {
                                    const findItem = selectedLiterature.find && selectedLiterature.find((selectedItem: LiteratureType) =>
                                        selectedItem[literatureFields.ID] === item[literatureFields.ID]);

                                    if (findItem) return <></>;

                                    return (
                                        <div className={classes.item}>
                                            <Typography>{item[literatureFields.DESCRIPTION]}</Typography>
                                            <Checkbox onChange={this.handleChangeSelect(item)}/>
                                        </div>
                                    );
                                })}
                            </div>
                        </Scrollbars>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <TablePagination count={allCount}
                                         component="div"
                                         page={currentPage - 1}
                                         rowsPerPageOptions={[]}
                                         onChangePage={this.handleChangePage}
                            //@ts-ignore
                                         rowsPerPage={10}
                                         onChangeRowsPerPage={()=>{}}
                        />
                        <div>
                            <Button onClick={this.handleClose}
                                    variant="text">
                                Отмена
                            </Button>
                            <Button onClick={this.handleSave}
                                    variant="contained"
                                    disabled={disableButton}
                                    className={classes.saveButton}
                                    color="primary">
                                Сохранить
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>

                <CreateLiteratureModal />
            </>
        );
    }
}

export default connect(withStyles(styles)(LiteratureModal));
