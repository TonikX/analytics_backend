import React, { useEffect, useState } from "react";
import useStyles from './NewsModal.styles';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from "../../store/reducers";
import {getNews, getShowBugModal} from "../../layout/getters";
import Dialog from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import actions from "../../layout/actions";
import Typography from "@mui/material/Typography";

export const NewsModal = () => {
  const dispatch = useDispatch();
  const news = useSelector((state: rootState) => getNews(state))
  const [openNewsModal, setOpenNewsModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    dispatch(actions.getNews());
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      setOpenNewsModal(true);
    }
  }, [news]);

  return (
    <Dialog
      open={openNewsModal}
      onClose={() => setOpenNewsModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>Новости</DialogTitle>
      <DialogContent>
        {news.map((newItem: any) => {
          return (
            <div style={{marginBottom: 30}}>
              <Typography>
                {newItem.title}
              </Typography>
              <Typography>
                {newItem.text}
              </Typography>
            </div>
          )
        })}
      </DialogContent>
      <DialogActions>
        <Button variant="contained"
                color="primary"
                onClick={() => setOpenNewsModal(false)}
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}
