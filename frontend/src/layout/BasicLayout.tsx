import React from 'react'
import MomentUtils from "@date-io/moment";
import theme from "./themeMaterialUi";
import Layout from "./Layout";
import {SnackbarProvider} from 'notistack';
import {ThemeProvider} from '@mui/material/styles';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

export const BasicLayout: React.FC = ({children}) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  )
}
