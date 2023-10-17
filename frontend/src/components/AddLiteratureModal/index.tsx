import React, {ChangeEvent} from 'react';
import get from "lodash/get";

import {shallowEqualObjects} from "shallow-equal";

import Scrollbars from "react-custom-scrollbars-2";

import {AddLiteratureModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import Slide from '@mui/material/Slide';
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {withStyles} from '@mui/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@mui/icons-material/Add";

import SearchOutlined from "@mui/icons-material/SearchOutlined";

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
        source: this.props.showEBSCO ? literatureSource.EBSCO : literatureSource.ANALITYCS
    };

    componentDidMount() {
        this.props.literatureActions.getLiterature();
        this.setState({
            selectedLiterature: this.props.selectedItems,
        });
    }

    componentDidUpdate(prevProps: Readonly<AddLiteratureModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {selectedItems} = this.props;

        if (!shallowEqualObjects(selectedItems, prevProps.selectedItems)){
            this.setState({
                selectedLiterature: selectedItems
            });
        }
    }


    handleChangeLiteratureSearchText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.props.literatureActions.changeSearchQuery(get(event, 'target.value', ''));
        this.props.literatureActions.getLiterature({ source: this.state.source });
    }

    handleChangePage = (event: any, page: number) => {
        this.props.literatureActions.changeCurrentPage(page);
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
        const {isOpen, classes, allCount, literatureList, currentPage, handleClose, handleSave, showEBSCO} = this.props;
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
                                {showEBSCO ? <Tab value={literatureSource.EBSCO} label="Эбско" /> : null}
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
                                         page={currentPage - 1}
                                         rowsPerPageOptions={[]}
                                         onPageChange={this.handleChangePage}
                                         rowsPerPage={10}
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
//@ts-ignore
export default connect(withStyles(styles)(AddLiteratureModal));
