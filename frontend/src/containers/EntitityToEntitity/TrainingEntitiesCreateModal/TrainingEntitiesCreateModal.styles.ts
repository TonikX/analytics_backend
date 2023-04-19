import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
  input: {
    width: '550px',
    marginTop: 30,
  },
  dialogContent: {
    padding: '10px 24px 20px 24px !important',
  },
  lastInput: {
    width: '550px',
  },
  selector: {
    width: '550px !important',
    margin: '0px 0px 30px'
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
  },
  marginBottom30: {
    marginBottom: '30px'
  },
  wrapSelector: {
    '& .MuiInputLabel-shrink': {
      transform: 'translate(13px, -6.5px) scale(0.75) !important',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '50px !important'
    },
    marginBottom: '30px',
  }
});