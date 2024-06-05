import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  title: {
    width: '80% !important',
    fontSize: '24px !important',
  },
  courseName: {
    fontWeight: 500,
  },
  textItem: {
    marginBottom: '10px !important'
  },
  description: {
    marginBottom: '10px !important',
  },
  content: {
    display: 'flex',
    justifyContent: 'row',
  },
  main: {
    marginTop: 15,
    width: '80%',
  },
  btn: {
    minWidth: '120px !important',
    background: theme.palette.primary.main,
    marginBottom: '20px !important',
  },
  link: {
    minWidth: '120px',
    textDecoration: 'none',
  },
  btnLink: {
    width: '100%',
    background: theme.palette.primary.main,
    marginBottom: '20px !important',
  },
  options: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
  },
}));
