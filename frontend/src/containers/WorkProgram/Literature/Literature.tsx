import React from 'react';
import Scrollbars from "react-custom-scrollbars-2";

import Typography from "@mui/material/Typography";
import {withStyles} from '@mui/styles';
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import {FourthStepProps} from './types';
import {fields} from "../enum";
import {literatureFields} from '../../Literature/enum';

import LiteratureAddModal from "./LiteratureModal";

import connect from './Literature.connect';
import styles from './Literature.styles';

class Literature extends React.PureComponent<FourthStepProps> {
    handleCreateNewTopic = () => {
        const {literatureList} = this.props;

        this.props.actions.openDialog({dialogType: fields.ADD_NEW_LITERATURE, data: literatureList});
    };

    handleClickDelete = (id: number) => () => {
        this.props.actions.deleteLiterature(id);
    };

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {literatureList, isCanEdit} = this.props;

        return (
            <div className={classes.root}>
                <Scrollbars style={{height: 'calc(100vh - 400px)'}} >
                    <div className={classes.list}>
                        {literatureList.map((literature) => (
                            <div className={classes.item}>
                                <Typography className={classes.title}>
                                    {literature[literatureFields.DESCRIPTION] || literature[literatureFields.DESCRIPTION_EBSCO]}
                                </Typography>

                                {isCanEdit &&
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

                {isCanEdit &&
                    <div className={classes.iconWrapper}>
                        <Button color="secondary"
                            className={classes.addIcon}
                            onClick={this.handleCreateNewTopic}
                        >
                            <AddIcon/> Добавить источник
                        </Button>
                    </div>
                }

                {isCanEdit && <LiteratureAddModal />}
            </div>
        );
    }
}

export default connect(withStyles(styles)(Literature));
