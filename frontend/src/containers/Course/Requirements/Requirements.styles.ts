import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    fontSize: '24px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  item: {
    borderBottom: '1px solid #ccc',
    padding: '10px',
  }
}));