import React from 'react';
import Scrollbars from "react-custom-scrollbars";

import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

import {LiteratureProps} from './types';

import connect from './connect';
import styles from './styles';
import AddLiteratureModal from "../../../../components/AddLiteratureModal";
import {literatureFields} from "../../../Literature/enum";
import {LiteratureType} from "../../../Literature/types";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import get from "lodash/get";

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
        const ids = this.props.literatureIdList.filter(litId => litId !== id);
        this.props.actions.setField({field: PracticeFields.BIBLIOGRAPHIC_REFERENCE, value: ids});
    };

    handleSave = (refs: Array<LiteratureType>) => {
        const ids = refs.map(ref => ref[literatureFields.ID]);
        this.props.actions.setField({field: PracticeFields.BIBLIOGRAPHIC_REFERENCE, value: ids});
        this.handleClose();
    }

    saveInput = (field: string) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        this.props.actions.setField({field, value});
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false,
        });
    }

    render() {
        const {classes, literatureIdList} = this.props;

        const {isModalOpen} = this.state;

        const literatureList = literatureIdList.map(id => ({
            [literatureFields.ID]: id,
            [literatureFields.DESCRIPTION]: `empty description, id: ${id}`
        }))

        return (
            <div className={classes.root}>
                <Typography variant='h5'>
                    {PracticeStepsRussian.REFERENCES}
                </Typography>
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
