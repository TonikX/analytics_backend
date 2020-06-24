import {createMuiTheme} from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';

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
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        // fontFamily: [
        //     'Montserrat',
        //     'Roboto Slab',
        //     'Source Sans Pro',
        //     '-apple-system',
        // ].join(','),
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
    overrides: {
        MuiStepIcon: {
            root: {
                '&$completed': {
                    color: SECONDARY,
                },
                '&$active': {
                    color: SECONDARY,
                },
            },
            active: {},
            completed: {},
        },
        MuiButton: {
            root: {
                padding: '5px 25px !important'
            },
        },
        MuiTableCell: {
            root: {
                padding: '10px !important'
            }
        },
        MuiFab: {
            root: {
                width: '50px',
                height: '50px'
            }
        }
    }
}, ruRU);

export default muiTheme;