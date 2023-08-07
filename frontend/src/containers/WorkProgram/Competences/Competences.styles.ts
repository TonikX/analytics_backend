import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  selectorWrap: {
    width: '350px',
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6.5px) scale(0.75) !important',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '90px !important'
    }
  },
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
  competenceFilter: {
    display: 'flex',
  },
  competenceFilterDate: {
    maxWidth: '250px',
  },
  competenceFilterSelect: {
    marginLeft: '30px',
    marginBottom: '20px',
    '& label': {
      backgroundColor: '#fff',
      paddingRight: '10px'
    }
  },
  filterMessage: {
    fontSize: '24px !important',
    textAlign: 'center',
    marginTop: '20px !important',
    display: 'block',
  },
  addZUNButton: {
    marginLeft: '20px !important'
  },
  buttonZun: {
    marginLeft: 'auto',
    paddingTop: '10px'
  },
  competencesBlock: {
    marginTop: '20px'
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
