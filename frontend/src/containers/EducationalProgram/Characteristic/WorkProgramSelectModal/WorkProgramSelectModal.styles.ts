import {createStyles, makeStyles} from "@mui/styles";

export const useStyles = makeStyles(() => createStyles({
  dialog: {
    padding: 20,
  },
  actions: {
    marginTop: '10px'
  },
  title: {
    padding: 0,
    marginBottom: '30px'
  },
  dialogContent: {
    padding: '10px 24px 20px 24px !important',
  },
}));
