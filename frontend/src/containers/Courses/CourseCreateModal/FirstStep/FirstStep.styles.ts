import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  input: {
    width: '490px',
    marginBottom: '30px',
    marginLeft: '30px',
    marginRight: '30px',
  },
  addIcon: {
    position: 'absolute',
    top: '5px',
    left: '536px',
  },
  inputAddWrapper: {
    position: 'relative',
  }
}));
