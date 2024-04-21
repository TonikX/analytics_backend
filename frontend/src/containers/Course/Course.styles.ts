import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  wrap: {
    padding: '0px 30px 30px',
    boxSizing: 'border-box'
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px 0px',
  },
  root: {
    padding: '20px 50px 20px 50px',
    minHeight: 'calc(100vh - 200px)',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
  },
  stepper: {
    width: '250px',
    height: 'fit-content',
    padding: 0,
    minWidth: '210px',
    marginRight: '15px',
  },
  content: {
    width: '100%',
    alignSelf: 'stretch',
  },
  title: {
    fontSize: '24px !important',
  },
  courseName: {
    fontWeight: 500,
  },
}));
