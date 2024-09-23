import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import FilterListIcon from '@mui/icons-material/FilterList'
import InputAdornment from '@mui/material/InputAdornment';;

export default function MultiSelectFilter({ languages, selectedValues, setSelectedValues }) {

    const [filterLabel, setFilterlabel] = React.useState("Select Options")

    const handleChange = (event, newValue) => {
        // Iterate over newValue and add it to selectedValues if it doesn't exist already based on title
        const uniqueValues = [...selectedValues];

        newValue.forEach((newItem) => {
            // Check if the item is already in selectedValues based on title
            if (!uniqueValues.some(item => item.title === newItem.title)) {
                uniqueValues.push(newItem);
            }
        });

        setSelectedValues(uniqueValues);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                    multiple
                    disableCloseOnSelect
                    options={languages}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => handleChange(event, newValue)}
                    sx={{
                        width: 300,
                        marginRight: 2,
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={filterLabel}
                            onFocus={() => setFilterlabel("Select")}
                            onBlur={() => setFilterlabel('Select Options')}
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
