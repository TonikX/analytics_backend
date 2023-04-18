import React from 'react';

import debounce from "lodash/debounce";
import get from "lodash/get";

import {withStyles} from '@mui/styles';
import TextField from "@mui/material/TextField";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

import {SearchProps} from './types';

import styles from './Search.styles';

const Search = ({handleChangeSearchQuery, classes} : SearchProps) => {
    const handleChangeSearch = (event: React.ChangeEvent) => {
        debounceSearch(get(event, 'target.value', ''));
    };

    const debounceSearch = debounce((value: string): void => {
        handleChangeSearchQuery(value);
    }, 500);

    return (
        <TextField placeholder="Поиск"
                   variant="outlined"
                   InputProps={{
                       classes: {
                           root: classes.searchInput
                       },
                       startAdornment: <SearchOutlined />,
                   }}
                   onChange={handleChangeSearch}
        />
    )
}
export default withStyles(styles)(Search);
