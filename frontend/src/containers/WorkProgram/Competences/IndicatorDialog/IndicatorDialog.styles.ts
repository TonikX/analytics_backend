import {createStyles, makeStyles} from "@mui/styles";

export const useStyles = makeStyles(() => createStyles({
  dialog: {
    padding: 20,
  },
  selectorWrap: {
    width: '100%',
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6.5px) scale(0.75) !important',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '321px !important'
    }
  },
  planSelectorWrap: {
    width: '100%',
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6.5px) scale(0.75) !important',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '250px !important'
    }
  },
  marginBottom30: {
    marginBottom: '30px !important'
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
    marginBottom: '10px',
    flexWrap: 'wrap'
  },
  chip: {
    marginRight: '10px !important',
    marginBottom: '10px !important',
    '& span': {
      whiteSpace: 'initial !important'
    }
  },
  indicatorDialiogInfoMassage: {
    margin: '20px 0 !important',
  },
  switcher: {
    marginBottom: '20px',
  },
  deleteIndicatorIcon: {
    position: "absolute",
    cursor: 'pointer',
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
  }
}));
