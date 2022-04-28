import { createStyles, makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => createStyles({
  dialog: {
    padding: 20,
  },
  marginBottom30: {
    marginBottom: '30px'
  },
  actions: {
    marginTop: '10px'
  },
  title: {
    padding: 0,
    marginBottom: '30px'
  },
  chipsList: {
    display: 'flex',
    marginTop: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  chip: {
    marginRight: '10px',
    marginBottom: '10px',
    '& span': {
      whiteSpace: 'initial !important'
    }
  }
}))