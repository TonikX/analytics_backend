import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    fontSize: '24px !important',
    marginTop: '10px !important',
    marginBottom: '10px !important',
  },
  textItem: {
    marginBottom: '10px !important'
  },
}));
