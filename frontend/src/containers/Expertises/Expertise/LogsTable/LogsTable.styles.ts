import createStyles from "@mui/styles/createStyles";
import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  header: {
    '& th': {
      height: '41px',
      background: theme.palette.primary.main,
      color: '#fff',
    }
  },
}));
