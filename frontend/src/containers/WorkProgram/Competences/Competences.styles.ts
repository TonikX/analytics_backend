import { createStyles, makeStyles, Theme } from '@material-ui/core'

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
  deleteIcon: {
    position: 'relative',
    top: '6px',
    cursor: "pointer",
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  addZUNButton: {
    marginTop: '10px',
    marginLeft: 'auto'
  },
  subTitle: {
    marginBottom: '10px',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center'
  },
}))