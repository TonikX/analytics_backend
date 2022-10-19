import React, {ChangeEvent} from 'react';
import get from "lodash/get";

import {shallowEqual} from "recompose";

import Scrollbars from "react-custom-scrollbars";

import {AddLiteratureModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import withStyles from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from "@material-ui/icons/Add";

import SearchOutlined from "@material-ui/icons/SearchOutlined";

import {literatureEbscoFields, literatureFields} from "../../containers/Literature/enum";
import {LiteratureEbscoType, LiteratureType} from "../../containers/Literature/types";
import CreateLiteratureModal from '../../containers/Literature/LiteratureCreateModal';
import {literatureSource} from "../../containers/WorkProgram/constants";

import connect from './connect';
import styles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

class AddLiteratureModal extends React.PureComponent<AddLiteratureModalProps> {
    state = {
        selectedLiterature: [],
        selectedLiteratureEbsco: [],
        source: literatureSource.EBSCO
    };

    componentDidMount() {
        this.props.literatureActions.getLiterature();
        this.setState({
            selectedLiterature: this.props.selectedItems,
        });
    }

    componentDidUpdate(prevProps: Readonly<AddLiteratureModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {selectedItems} = this.props;

        if (!shallowEqual(selectedItems, prevProps.selectedItems)){
            this.setState({
                selectedLiterature: selectedItems
            });
        }
    }


    handleChangeLiteratureSearchText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.props.literatureActions.changeSearchQuery(get(event, 'target.value', ''));
        this.props.literatureActions.getLiterature({ source: this.state.source });
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.literatureActions.changeCurrentPage(page + 1);
        this.props.literatureActions.getLiterature({ source: this.state.source });
    }

    handleChangeSelect = (item: any) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const {selectedLiterature, source, selectedLiteratureEbsco} = this.state;

        if (source === literatureSource.EBSCO) {
            if (checked){
                this.setState({selectedLiteratureEbsco: [...selectedLiteratureEbsco, item]});
            } else {
                this.setState({selectedLiteratureEbsco: selectedLiteratureEbsco.filter(selectedItem =>
                      selectedItem[literatureEbscoFields.ID] !== item[literatureEbscoFields.ID])});
            }
        } else {
            if (checked){
                this.setState({selectedLiterature: [...selectedLiterature, item]});
            } else {
                this.setState({selectedLiterature: selectedLiterature.filter(selectedItem =>
                      selectedItem[literatureFields.ID] !== item[literatureFields.ID])});
            }
        }
    }

    handleChangeSource = (e: any, value: literatureSource) => {
        this.setState({ source: value })
        this.props.literatureActions.changeCurrentPage(1);
        this.props.literatureActions.getLiterature({ source: value });
    }

    render() {
        const {isOpen, classes, allCount, literatureList, currentPage, handleClose, handleSave} = this.props;
        const {selectedLiterature, source, selectedLiteratureEbsco} = this.state;
        const disableButton = source === literatureSource.EBSCO ? selectedLiteratureEbsco.length === 0 : selectedLiterature.length === 0;

        return (
            <>
                <Dialog
                    open={isOpen}
                    onClose={handleClose}
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
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
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
                        <div className={classes.header}>
                            <Tabs value={source} onChange={this.handleChangeSource}>
                                <Tab value={literatureSource.EBSCO} label="Эбско" />
                                <Tab value={literatureSource.ANALITYCS} label="Аналитика" />
                            </Tabs>

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
                                {source !== literatureSource.EBSCO && selectedLiterature.map && selectedLiterature.map((item: LiteratureType) =>
                                    <div className={classes.item}>
                                        <Typography>{item[literatureFields.DESCRIPTION] || item[literatureFields.DESCRIPTION_EBSCO]}</Typography>
                                        <Checkbox checked={true}
                                                  onChange={this.handleChangeSelect(item)}/>
                                    </div>
                                )}
                                {source === literatureSource.EBSCO && selectedLiteratureEbsco.map && selectedLiteratureEbsco.map((item: LiteratureEbscoType) =>
                                    <div className={classes.item}>
                                        <Typography>{item[literatureEbscoFields.DESCRIPTION]}</Typography>
                                        <Checkbox checked={true}
                                                  onChange={this.handleChangeSelect(item)}/>
                                    </div>
                                )}
                                {literatureList.map((item: any) => {
                                    const findItem = selectedLiterature.find && selectedLiterature.find((selectedItem: LiteratureType) =>
                                        selectedItem[literatureFields.ID] === item[literatureFields.ID]);
                                    const findItemEbsco = selectedLiteratureEbsco.find && selectedLiteratureEbsco.find((selectedItem: LiteratureEbscoType) =>
                                        selectedItem[literatureEbscoFields.ID] === item[literatureEbscoFields.ID]);

                                    if (findItem || findItemEbsco) return <></>;

                                    return (
                                        <div className={classes.item}>
                                            <Typography>{item[literatureFields.DESCRIPTION] || item[literatureEbscoFields.DESCRIPTION]}</Typography>
                                            <Checkbox onChange={this.handleChangeSelect(item)}/>
                                        </div>
                                    );
                                })}
                            </div>
                        </Scrollbars>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        {source !== literatureSource.EBSCO && <TablePagination count={allCount}
                                         component="div"
                                         page={currentPage - 1}
                                         rowsPerPageOptions={[]}
                                         onChangePage={this.handleChangePage}
                            //@ts-ignore
                                         rowsPerPage={10}
                                         onChangeRowsPerPage={()=>{}}
                        />}
                        <div>
                            <Button onClick={handleClose}
                                    variant="text">
                                Отмена
                            </Button>
                            <Button onClick={() => {handleSave({ selectedLiterature, selectedLiteratureEbsco })}}
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

export default connect(withStyles(styles)(AddLiteratureModal));
