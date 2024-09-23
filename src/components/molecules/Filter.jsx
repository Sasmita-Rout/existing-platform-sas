import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MultiSelectFilter from "./MultiselectFilter";
import FilterListIcon from '@mui/icons-material/FilterList'
import InputAdornment from '@mui/material/InputAdornment';;
export default function Filter({ technologies }) {
    const [selectedValues, setSelectedValues] = React.useState([]);  // For multi-select
    const [selectedValue, setSelectedValue] = React.useState(null);  // For single select
    const [label, setLabel] = React.useState('Filter By Technologies');

    const languages = [
        { title: 'Nodejs' },
        { title: 'Reactjs' },
        { title: 'Angular' },
        { title: 'Bootstrap' },
    ];

    // Handler for removing the single selected value
    const handleRemove = () => {
        setLabel('Filter By');
        setSelectedValue(null);
    };

    // Handler for clearing both single and multi-selected values
    const handleClearAll = () => {
        setSelectedValue(null);
        setSelectedValues([]);
    };

    // Handler for removing a specific multi-selected value
    const handleMultiSelectRemove = (valueToRemove) => {
        setSelectedValues((prev) => prev.filter((item) => item !== valueToRemove));
    };

    // Function to render a single selected item (used in both single and multi-selected boxes)
    const renderSelectedItem = (selectedItem, onRemove) => (
        <Box
            key={selectedItem.title}
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '2px 4px',
                borderRadius: '20px',
                border: `1px solid ${grey[500]}`,
                backgroundColor: grey[50],
                flexShrink: 0,
                fontSize: '0.75rem',
                position: 'relative',
                height: '35px',
                marginBottom: '10px',
                marginLeft: 2,
            }}
        >
            <Typography sx={{ fontSize: '0.75rem', paddingRight: '8px' }}>{selectedItem.title}</Typography>
            <IconButton
                sx={{
                    top: '50%',
                    right: '4px',
                    transform: 'translateY(-50%)',
                }}
                onClick={onRemove}
                size="small"
            >
                <ClearIcon fontSize="inherit" />
            </IconButton>
        </Box>
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Single-select Autocomplete */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                    disablePortal
                    options={technologies}
                    getOptionLabel={(option) => option.title}
                    value={selectedValue}
                    onChange={(event, newValue) => setSelectedValue(newValue)}
                    sx={{
                        width: 300,
                        marginRight: 2
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={label}
                            onFocus={() => setLabel('Select')}
                            onBlur={() => setLabel('Filter By Technologies')}
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
                />
            </Box>

            {/* Multi-select Autocomplete */}
            <MultiSelectFilter
                languages={languages}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
            />
            <Button variant="contained">Apply</Button>

            {/* Unified selected items box (for both single and multi-select) */}
            {(selectedValue || selectedValues.length > 0) && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: 2,
                    }}
                >
                    {/* Render the single selected value (if exists) */}
                    {selectedValue && renderSelectedItem(selectedValue, handleRemove)}

                    {/* Render the multi-selected values (if any exist) */}
                    {selectedValues.map((selectedItem) =>
                        renderSelectedItem(selectedItem, () => handleMultiSelectRemove(selectedItem))
                    )}
                </Box>
            )}

            {/* Clear All Button */}
            <Box sx={{ position: 'absolute', right: '20px' }}>
                <Button
                    style={{ backgroundColor: 'grey', color: 'white', borderRadius: '20px', marginBottom: '5px' }}
                    onClick={handleClearAll}
                >
                    Clear All
                </Button>
            </Box>
        </div>
    );
}
