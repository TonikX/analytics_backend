import React from 'react';
import Scrollbars from "react-custom-scrollbars";

import Typography from "@mui/material/Typography";
import withStyles from '@mui/material/styles/withStyles';
import Button from "@mui/material/Button";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

import {LiteratureProps} from './types';

import connect from './connect';
import styles from './styles';
import AddLiteratureModal from "../../../../components/AddLiteratureModal";
import {literatureFields} from "../../../Literature/enum";
import {LiteratureType} from "../../../Literature/types";
import {PracticeFields, PracticeSteps} from "../../enum";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

class Literature extends React.PureComponent<LiteratureProps> {

    state = {
        isModalOpen: false,
    }

    handleOpenModal = () => {
        this.setState({
            isModalOpen: true,
        });
    };

    handleClickDelete = (id: string) => () => {
        const refs = this.props.literatureList.filter(ref => ref.id !== id).map(ref => ref.id);
        this.props.actions.saveField({field: PracticeFields.BIBLIOGRAPHIC_REFERENCE, value: refs});
    };

    handleSave = ({ selectedLiterature }: { selectedLiterature: Array<LiteratureType>}) => {
        const ids = selectedLiterature.map(literature => literature.id);
        this.props.actions.saveField({field: PracticeFields.BIBLIOGRAPHIC_REFERENCE, value: ids});
        this.handleClose();
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false,
        });
    }

    render() {
        const {classes, literatureList} = this.props;

        const {isModalOpen} = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography variant='h5'>
                        {PracticeSteps.REFERENCES}
                    </Typography>
                    <Tooltip arrow title={
                        <Typography variant='body1'>
                            Указать разработанные на Вашем факультете методические рекомендации или общие источники. Если есть.
                        </Typography>
                    }>
                        <HelpOutlineIcon fontSize='small' className={classes.helpIcon}/>
                    </Tooltip>
                </div>
                <Scrollbars style={{height: 'calc(100vh - 400px)'}}>
                    <div className={classes.list}>
                        {literatureList.map((literature) => (
                            <div className={classes.item}>
                                <Typography className={classes.title}>
                                    {literature[literatureFields.DESCRIPTION]}
                                </Typography>

                                {
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(literature[literatureFields.ID])}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </Scrollbars>

                {
                    <div className={classes.iconWrapper}>
                        <Button color="secondary"
                                variant="outlined"
                                className={classes.addIcon}
                                onClick={this.handleOpenModal}
                        >
                            <AddIcon/> Добавить источник
                        </Button>
                    </div>
                }

                {<AddLiteratureModal isOpen={isModalOpen}
                                     handleSave={this.handleSave}
                                     selectedItems={literatureList}
                                     handleClose={this.handleClose}/>}
            </div>
        );
    }
}

export default connect(withStyles(styles)(Literature));
