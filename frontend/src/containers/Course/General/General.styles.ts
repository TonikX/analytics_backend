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
    // width: '170px',
    // fontSize: '14px',
    background: theme.palette.primary.main,
    marginBottom: '20px',
  },
  options: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',

  },
}));