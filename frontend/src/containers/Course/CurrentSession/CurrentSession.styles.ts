import {createStyles, Theme, makeStyles} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    fontSize: '24px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  textItem: {
    marginBottom: '10px'
  },
}));