import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  workProgramLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  headerCell: {
    background: `${theme.palette.primary.main} !important`,
    color: '#fff !important'
  },
}));
