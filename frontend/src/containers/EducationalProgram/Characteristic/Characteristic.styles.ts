import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
  wrap: {
    padding: '0px 30px 30px',
    boxSizing: 'border-box'
  },
  chipLabel: {
    overflow: 'auto',
    whiteSpace: 'normal',
  },
  chip: {
    height: 'auto',
    marginRight: 10,
    maxWidth: '500px',
    padding: '5px'
  },
  opSelector: {
    marginBottom: '5px'
  },
  root: {
    padding: '20px 50px 20px 50px',
    boxShadow: 'none',
    borderRadius: '0px',
    minHeight: '100%',
    boxSizing: 'border-box',
    display: 'flex',
  },
  stepper: {
    width: '250px',
    height: 'fit-content',
    padding: 0,
    minWidth: '210px'
  },
  content: {
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: '50px',
  },
  title: {
    fontSize: '24px !important',
    marginBottom: '20px !important',
    display: 'flex',
    alignItems: 'center'
  },
  tableWrap: {
    height: 'calc(100% - 60px)',
    maxheight: 'calc(100% - 60px)',
    '& td': {
      padding: '5px 10px !important',
      fontSize: '14px'
    },
    '& p': {
      fontSize: '14px'
    }
  },
  header: {
    background: theme.palette.primary.main,
    '& th': {
      color: '#fff',
      background: theme.palette.primary.main,
      fontWeight: '400',
      fontSize: '14px',
      padding: '0px 10px !important',
      whiteSpace: 'initial'
    },
    '& tr': {
      height: '41px'
    }
  },
  label: {
    fontSize: '14px',
    marginBottom: '10px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  editorWrap: {
    marginBottom: '30px',
  },
  wrapSelector: {
    width: '100%',
    '& .MuiInputLabel-shrink': {
      transform: 'translate(13px, -6.5px) scale(0.75) !important',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '100px !important'
    },
    marginTop: '30px !important',
  },
  paperHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0px',
  },
  sendToCheckButton: {
    height: '36px',
    width: '250px'
  },
  formatRealizationWrapSelector: {
    width: '100%',
    '& .MuiInputLabel-shrink': {
      transform: 'translate(13px, -6.5px) scale(0.75) !important',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '115px !important'
    },
  },
  realizationBlockItem: {
    display: "flex",
    alignItems: 'center',
    marginBottom: '10px',
  },
  opTypeBlockItem: {
    display: "flex",
    alignItems: 'center',
    marginBottom: '10px',
  },
  realizationBlockItemTitle: {
    flex: 'none',
  },
  realizationAdditionalBlockItemTitle: {
    flex: 'none',
    marginRight: '10px',
  },
  checkbox: {
    marginRight: '5px'
  },
  dowloadFileButtonPosition: {
    marginLeft: 'auto'
  }
});