import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  workProgramLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  cell: {
    width: '10%',
  },
  addZUNButton: {
    marginLeft: '20px !important'
  },
  header: {
    background: `${theme.palette.primary.main} !important`,
    color: '#fff !important',
    fontWeight: 400,
    height: '45px'
  },
  tab: {
    width: '50%',
    maxWidth: 'initial !important'
  }
}))
