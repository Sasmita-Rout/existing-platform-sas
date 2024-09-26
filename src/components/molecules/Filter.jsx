import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputAdornment from '@mui/material/InputAdornment';

export default function Filter({ input, handleOnSelect, selectedValues = [], isMultiSelect, placeholder, onFocus, onBlur }) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Autocomplete
                multiple={isMultiSelect} // Toggle between multi-select and single-select
                disableCloseOnSelect={isMultiSelect} // Only disable close for multi-select
                options={input}
                getOptionLabel={(option) => option.title}
                onChange={handleOnSelect}
                value={selectedValues} // Pass selected values dynamically
                sx={{ width: 300, marginRight: 2 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        onFocus={(event) => event.target.placeholder = onFocus}
                        onBlur={(event) => event.target.placeholder = onBlur}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FilterListIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </Box>
    );
}
