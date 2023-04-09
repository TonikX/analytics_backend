import React, {SyntheticEvent} from 'react';
import Scrollbars from "react-custom-scrollbars-2";
import get from 'lodash/get';

import Paper from '@mui/material/Paper';

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {withStyles} from '@mui/styles';
import TableBody from "@mui/material/TableBody";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";

import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import SortingButton from "../../../components/SortingButton";
import Search from "../../../components/Search";
import {SortingType} from "../../../components/SortingButton/types";
import TableSettingsMenu from "../../../components/TableSettingsMenu/TableSettingsMenu";
import CustomizeExpansionPanel from "../../../components/CustomizeExpansionPanel";
import {getUserFullName, parseJwt} from "../../../common/utils";

import {DirectionFields} from "../../Direction/enum";
import {DirectionType} from "../../Direction/types";

import TrainingModuleCreateModal from "./TrainingModuleCreateModal";

import {appRouter} from "../../../service/router-service";
import UserService from "../../../service/user-service";

import {TrainingModulesProps, TrainingModuleType} from './types';
import {fields, TrainingModuleFields} from "./enum";
import {typesListObject} from './constants';

import connect from './TrainingModules.connect';
import styles from './TrainingModules.styles';

import Filters from "./Filters";
import Switch from "@mui/material/Switch";
import {withRouter} from "../../../hoc/WithRouter";
import Pagination from "@mui/lab/Pagination";

const userService = UserService.factory();

class TrainingModules extends React.Component<TrainingModulesProps> {
    state = {
        anchorsEl: {},
        deleteConfirmId: null,
    }

    componentDidMount() {
        this.props.actions.getTrainingModulesList();
    }

    componentWillUnmount() {
        this.props.actions.trainingModulesPageDown();
    }

    componentDidUpdate(prevProps: TrainingModulesProps) {
        if (prevProps.trainingModuleIdForRedirect !== this.props.trainingModuleIdForRedirect && this.props.trainingModuleIdForRedirect) {
            this.goToTrainingModule()
        }
    }

    goToTrainingModule = () => {
        // @ts-ignore
        const {navigate, trainingModuleIdForRedirect} = this.props;

        this.props.actions.setTrainingModuleIdForRedirect(null)
        navigate(appRouter.getTrainingModuleDetailLink(trainingModuleIdForRedirect));
    }

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getTrainingModulesList();
    }

    changeSorting = (field: string) => (mode: SortingType) => {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getTrainingModulesList();
    }

    handleChangeSearchQuery = (search: string) => {
        this.props.actions.changeSearchQuery(search);
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getTrainingModulesList();
    }

    handleMenu = (id: number) => (event: SyntheticEvent): void => {
        this.setState({
            anchorsEl: {
                [id]: event.currentTarget
            }
        });
    };

    handleCloseMenu = () => {
        this.setState({anchorsEl: {}});
    };

    handleConfirmDeleteDialog = () => {
        this.props.actions.deleteTrainingModule(this.state.deleteConfirmId);

        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleClickEdit = (trainingModule: TrainingModuleType) => () => {
        this.props.actions.openDialog({
            data: trainingModule,
            dialog: fields.CREATE_TRAINING_MODULE_DIALOG,
        });
        this.handleCloseMenu()
    }

    handleClickCreate = () => {
        this.props.actions.openDialog({
            data: {},
            dialog: fields.CREATE_TRAINING_MODULE_DIALOG
        });
    }

    handleOpenMenu = (id: number) => (event: SyntheticEvent): void => {
        this.setState({
            anchorsEl: {
                [id]: event.currentTarget
            }
        });
    };

    onShowOnlyMyChange = () => {
        const {showOnlyMy} = this.props;

        this.props.actions.showOnlyMy(!showOnlyMy);

        this.props.actions.getTrainingModulesList();
    }

    getMenuItems = (trainingModule: TrainingModuleType) => {
        const accessToken = userService.getToken();

        if (!accessToken) {
            return [];
        }

        const userId: number = parseJwt(accessToken).user_id;
        const menuItems = [
            {
                text: 'Удалить',
                icon: <DeleteIcon />,
                handleClickItem: this.handleClickDelete(trainingModule[TrainingModuleFields.ID])
            },
            {
                text: 'Редактировать',
                icon: <EditIcon />,
                handleClickItem: this.handleClickEdit(trainingModule)
            },
            {
                text: 'Смотреть детально',
                icon: <EyeIcon />,
                link: appRouter.getTrainingModuleDetailLink(trainingModule[TrainingModuleFields.ID])
            }
        ];

        if (!trainingModule.editors.map((editor) => editor.id).includes(userId)) {
            menuItems.splice(1, 1);
        }

        return menuItems;
    }

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {trainingModules, allCount, currentPage, sortingField, sortingMode, canEdit, showOnlyMy} = this.props;
        const {deleteConfirmId, anchorsEl} = this.state;

        return (
            <Paper className={classes.root}>
                <div className={classes.titleWrap}>
                    <Typography className={classes.title}> Образовательные модули </Typography>

                    <Typography className={classes.switch}>
                        <Switch checked={showOnlyMy}
                                onChange={this.onShowOnlyMyChange}
                                color="primary"
                        />
                        Показать только мои модули
                    </Typography>

                    <Search handleChangeSearchQuery={this.handleChangeSearchQuery}/>
                </div>

                <CustomizeExpansionPanel label="Фильтрация" details={<Filters />}/>

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.headerCell}>
                                        Название
                                        <SortingButton changeMode={this.changeSorting(TrainingModuleFields.NAME)}
                                                       mode={sortingField === TrainingModuleFields.NAME ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.headerCell}>
                                        Тип
                                        <SortingButton changeMode={this.changeSorting(TrainingModuleFields.TYPE)}
                                                       mode={sortingField === TrainingModuleFields.TYPE ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.headerCell}>
                                        КОП ИД
                                    </TableCell>
                                    <TableCell className={classes.headerCell}>
                                        ИСУ ИД
                                    </TableCell>
                                    <TableCell className={classes.headerCell}>
                                        Редакторы
                                    </TableCell>

                                    {canEdit && <TableCell className={classes.headerCell} />}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trainingModules.map((trainingModule: TrainingModuleType) => {
                                    const profile = get(trainingModule, [TrainingModuleFields.DISCIPLINE, TrainingModuleFields.ACADEMIC_PLAN, TrainingModuleFields.EDUCATIONAL_PROFILE], '');
                                    const plans = get(trainingModule, [TrainingModuleFields.DISCIPLINE, TrainingModuleFields.ACADEMIC_PLAN, TrainingModuleFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY], []);
                                    // @ts-ignore
                                    const type = typesListObject[trainingModule[TrainingModuleFields.TYPE]];

                                    return (
                                        <TableRow key={trainingModule[TrainingModuleFields.ID]}>
                                            <TableCell>
                                                {trainingModule[TrainingModuleFields.NAME]}
                                            </TableCell>
                                            <TableCell>
                                                {type}
                                            </TableCell>
                                            <TableCell>
                                                {trainingModule[TrainingModuleFields.ID]}
                                            </TableCell>
                                            <TableCell>
                                                {trainingModule[TrainingModuleFields.ISU_ID]}
                                            </TableCell>
                                            <TableCell>
                                                {trainingModule[TrainingModuleFields.EDITORS].map((editor) => getUserFullName(editor)).join(', ')}
                                            </TableCell>
                                            {canEdit &&
                                                <TableCell>
                                                    <TableSettingsMenu
                                                        menuItems={this.getMenuItems(trainingModule)}
                                                        handleOpenMenu={this.handleOpenMenu(trainingModule[TrainingModuleFields.ID])}
                                                        handleCloseMenu={this.handleCloseMenu}
                                                        anchorEl={get(anchorsEl, trainingModule[TrainingModuleFields.ID])}
                                                    />
                                                </TableCell>

                                                // <TableCell className={classes.actions}>
                                                //     <IconButton
                                                //         onClick={this.handleClickDelete(trainingModule[TrainingModuleFields.ID])}>
                                                //         <DeleteIcon/>
                                                //     </IconButton>
                                                //     <IconButton onClick={this.handleClickEdit(trainingModule)}>
                                                //         <EditIcon/>
                                                //     </IconButton>
                                                // </TableCell>
                                            }
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Scrollbars>


                <div className={classes.footer}>
                    <Pagination count={Math.ceil(allCount / 10)}
                                page={currentPage}
                                onChange={this.handleChangePage}
                                color="primary"
                    />
                    {canEdit &&
                        <Fab color="secondary"
                             classes={{
                                 root: classes.addIcon
                             }}
                             onClick={this.handleClickCreate}
                        >
                            <AddIcon/>
                        </Fab>
                    }
                </div>

                {canEdit &&
                    <>
                        <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                                       onDismiss={this.closeConfirmDeleteDialog}
                                       confirmText={'Вы точно уверены, что хотите удалить учебный модуль?'}
                                       isOpen={Boolean(deleteConfirmId)}
                                       dialogTitle={'Удалить учебнуй модуль'}
                                       confirmButtonText={'Удалить'}
                        />

                        <TrainingModuleCreateModal/>
                    </>
                }
            </Paper>
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(withRouter(TrainingModules)));
