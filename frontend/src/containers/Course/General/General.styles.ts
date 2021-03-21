import {createStyles, Theme, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  title: {
    width: '80%',
    fontSize: '24px',
  },
  courseName: {
    fontWeight: 500,
  },
  textItem: {
    marginBottom: '10px'
  },
  description: {
    marginBottom: '10px',
    whiteSpace: 'pre-wrap',
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
    minWidth: '120px',
    background: theme.palette.primary.main,
    marginBottom: '20px',
  },
  link: {
    minWidth: '120px',
  },
  btnLink: {
    width: '100%',
    background: theme.palette.primary.main,
    marginBottom: '20px',
  },
  options: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
  },
}));