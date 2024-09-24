import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import FilterListIcon from '@mui/icons-material/FilterList'
import InputAdornment from '@mui/material/InputAdornment';;

export default function MultiSelectFilter({ languages, handleOnSelect }) {

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                    multiple
                    disableCloseOnSelect
                    options={languages}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => handleOnSelect(event, newValue)}
                    sx={{
                        width: 300,
                        marginRight: 2,
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Select Options"
                            onFocus={(event) => event.target.placeholder = "Select"}
                            onBlur={(event) => event.target.placeholder = "Select Options"}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment>
                                        <FilterListIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    value={[]} // Keep the value of Autocomplete empty so it doesn't display selected items
                />
            </Box>
        </div>
    );
}
