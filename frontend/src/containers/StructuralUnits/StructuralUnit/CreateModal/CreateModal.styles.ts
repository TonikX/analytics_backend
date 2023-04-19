import createStyles from "@mui/styles/createStyles";

export default () => createStyles({
  input: {
    width: '550px',
    marginBottom: '30px',
  },
  selector: {
    width: '550px'
  },
  dialogContent: {
    padding: '10px 24px 20px 24px !important',
  },
  actions: {
    padding: '15px 24px 20px'
  },
  dialog: {
    padding: 20,
  },
  wrapSelector: {
    width: '100%',
    '& .MuiInputLabel-shrink': {
      transform: 'translate(13px, -6.5px) scale(0.75) !important',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '80px !important'
    },
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '30px',
    width: '550px'
  },
});