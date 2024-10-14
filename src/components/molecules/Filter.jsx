import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputAdornment from '@mui/material/InputAdornment';

export function Filter({
    input = [], // Ensure default to an empty array if `input` is undefined
    handleOnSelect,
    selectedValues = [],
    isMultiSelect = false, // Default to single-select if not passed
    placeholder = 'Select...', // Default placeholder
    onFocus,
    onBlur,
    showIcon = false,
    ...rest
}) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Autocomplete
                multiple={isMultiSelect} // Toggle between multi-select and single-select
                disableCloseOnSelect={isMultiSelect}
                options={input}
                getOptionLabel={(option) => option.name || ''} // Ensure option has title
                onChange={handleOnSelect} // Pass the handler function
                value={selectedValues} // Selected values dynamically passed
                sx={{ width: 300, marginRight: 2 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        {...rest} // Pass react-hook-form properties here
                        placeholder={placeholder}
                        onFocus={(event) => event.target.placeholder = onFocus || placeholder}
                        onBlur={(event) => event.target.placeholder = onBlur || placeholder}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <>
                                    {showIcon && (
                                        <InputAdornment position="start">
                                            <FilterListIcon />
                                        </InputAdornment>
                                    )}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </Box>
    );
}

export default Filter;
