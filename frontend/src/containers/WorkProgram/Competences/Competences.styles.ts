import { createStyles, makeStyles, Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => createStyles({
  smallButton: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  },
  cell: {
    width: '25%'
  },
  header: {
    background: theme.palette.primary.main,
    color: '#fff',
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
    marginLeft: 'auto'
  },
  subTitle: {
    marginBottom: '6px',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center'
  },
}))