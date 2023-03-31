import { createStyles, makeStyles, Theme } from '@mui/material'

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
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  chip: {
    marginRight: '10px',
    marginBottom: '10px',
    '& span': {
      whiteSpace: 'initial !important'
    }
  },
  info: {
    marginTop: '10px',
    cursor: 'pointer',
    color: '#ec1946'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  }
}));
