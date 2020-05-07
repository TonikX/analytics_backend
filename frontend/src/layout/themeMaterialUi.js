import {createMuiTheme} from '@material-ui/core/styles';

export const PRIMARY = '#1d51a3';
export const PRIMARY_HOVERED = '#163ea4';

export const SECONDARY = '#ec1946';
export const SECONDARY_HOVERED = '#bf1338';

export const ERROR = '#d00000';
export const TEXT_COLOR = '#333';

const muiTheme = createMuiTheme({
    fontWeight: 200,
    typography: {
        useNextVariants: true,
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        fontSize: 15
    },
    palette: {
        primary: {
            main: PRIMARY,
            dark: PRIMARY_HOVERED,
        },
        secondary: {
            main: SECONDARY,
            dark: SECONDARY_HOVERED,
        },
        error: {
            main: ERROR
        },
        text: {
            primary: TEXT_COLOR,
        },
    },
    appBarHeight: 64
});

export default muiTheme;