import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
  textField: {
    width: '100%',
    marginBottom: '30px !important'
  },
  checkbox: {
    margin: '10px 0px 10px -12px'
  },
  selectorWrap: {
    width: '100%',
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6.5px) scale(0.75) !important',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '100px !important'
    }
  },
  moduleName: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  semesterError: {
    color: theme.palette.secondary.main,
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
  root: {
    padding: '20px 50px 20px 50px',
    boxShadow: 'none',
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    flexDirection: 'row',
  },
  headerTextHoursCount: {
    border: 'none',
    textAlign: 'center'
  },
  textItem: {
    marginBottom: '10px'
  },
  header: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: '#fff !important',
    '& th': {
      background: theme.palette.primary.main,
      color: '#fff !important',
      fontWeight: '400',
      fontSize: '14px',
      padding: '0px 10px !important',
    }
  },
  title: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& p': {
      fontSize: '24px',
    }
  },
  content: {
    width: '100%',
    alignSelf: 'stretch',
  },
  editors: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '10px !important',
  },
  wrap: {
    padding: '0px 30px 30px',
    boxSizing: 'border-box',
    marginTop: '30px',
  },
  editorsTitle: {
    lineHeight: '32px',
    marginRight: '10px !important',
  },
  editorsItem: {
    marginLeft: '5px !important',
  },
  editorsAdd: {
    height: '32px',
    marginLeft: 'auto !important',
  },
  moduleNameWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  createModuleButtonWrap: {
    display: 'flex',
    marginTop: 20,
    gap: 20,
    justifyContent: 'flex-end'
  },
  moduleButtons: {
    display: 'flex',
    justify: 'flex-end',
    'button': {
      padding: '5px 10px !important',
      marginLeft: '5px',
    }
  },
  hourCell: {
    width: '30px'
  },
  displayFlex: {
    display: 'flex'
  },
  subTitle: {
    marginBottom: '10px !important',
    fontSize: '20px !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  workProgramLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  textInfo: {
    marginBottom: '10px',
  },
  actions: {
    textAlign: 'end',
    width: '112px',
    '& svg': {
      cursor: 'pointer'
    }
  },
  deleteIcon: {
    marginRight: 5,
    cursor: 'pointer'
  },
  dialog: {
    padding: '40px',
  },
  stepper: {
    width: '250px',
    height: 'fit-content',
    padding: 0,
    minWidth: '210px',
    marginRight: '15px',
  },
  plansTitle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  addEducationalProgramButtonWrap: {
    display: 'flex',
    marginTop: 10,
    justifyContent: 'flex-end'
  },
  errorBlock: {
    border: '1px solid',
    borderRadius: '4px',
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    padding: '10px',
    width: 'fit-content',
    display: 'flex',
  }
});
