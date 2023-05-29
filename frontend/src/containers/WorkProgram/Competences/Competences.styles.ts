import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  smallButton: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  },
  cell: {
    width: '10%',
  },
  header: {
    background: `${theme.palette.primary.main} !important`,
    color: '#fff !important',
    fontWeight: 400,
    height: '45px'
  },
  deleteIcon: {
    position: 'relative',
    top: '6px',
    cursor: "pointer",
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  addZUNButton: {
    marginLeft: 'auto !important'
  },
  subTitle: {
    marginBottom: '6px !important',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  workProgramButtonPanel: {
    display: 'flex'
  },
  workProgramTabPanel: {
    padding: '24px 0 !important',
  },
  bigCell: {
    width: '35%',
  }
}))
