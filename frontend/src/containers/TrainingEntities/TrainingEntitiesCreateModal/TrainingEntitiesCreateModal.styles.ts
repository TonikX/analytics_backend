import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
  input: {
    width: '550px',
    marginBottom: '30px !important',
  },
  dialogContent: {
    padding: '10px 24px 20px 24px !important',
  },
  lastInput: {
    width: '550px',
  },
  selector: {
    width: '550px'
  },
  actions: {
    padding: '15px 24px 20px'
  },
  dialog: {
    padding: 20,
  },
  link: {
    marginRight: 'auto',
    textDecoration: 'none',
    color: theme.palette.primary.main,
  }
});