import {createTheme, responsiveFontSizes} from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

export const PRIMARY = '#1d51a3';
export const PRIMARY_HOVERED = '#163ea4';

export const SECONDARY = '#ec1946';
export const SECONDARY_HOVERED = '#bf1338';

export const ERROR = '#d00000';
export const TEXT_COLOR = '#333';

let muiTheme = createTheme({
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
        fontSize: 13
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
            },
            stickyHeader: {
                backgroundColor: PRIMARY,
                color: '#fff',
                fontWeight: '400',
                fontSize: '14px',
                padding: '0px 10px !important',
                whiteSpace: 'nowrap'
            }
        },
        MuiFab: {
            root: {
                width: '40px',
                height: '40px',
                boxShadow: 'none'
            }
        },
        MuiPaper: {
            root: {
                borderRadius: '0'
            }
        },
        MuiListItem: {
            root: {
                "&$selected": {
                    backgroundColor: "rgb(29 81 163 / 25%)",
                    "&:hover": {
                        backgroundColor: "rgb(29 81 163 / 25%)",
                    },
                },
            },
        },
    }
}, ruRU);

muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;
