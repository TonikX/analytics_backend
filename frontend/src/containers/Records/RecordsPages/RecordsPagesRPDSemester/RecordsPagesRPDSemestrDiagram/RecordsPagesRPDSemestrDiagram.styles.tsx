import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
  wrapperChart: {
    display: 'flex',
    flexDirection: 'column',
    width: 350 + 'px',
    height: 350 + 'px',
    alignItems: 'center'
  },
  btnChart: {
    marginTop: 20 + 'px'
  },
  recordChart: {
    marginBottom: 64 + 'px'
  }
});