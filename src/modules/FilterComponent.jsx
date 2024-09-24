import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MultiSelectFilter } from "../components/molecules/index";
import FilterListIcon from '@mui/icons-material/FilterList'
import InputAdornment from '@mui/material/InputAdornment';;
export default function Filter({ technologies }) {
    const [selectedValues, setSelectedValues] = React.useState([]);  // For multi-select
    const [selectedValue, setSelectedValue] = React.useState(null);  // For single select
    const [languageDropdown, setLanguageDropdown] = React.useState([]) // To get Language dropdown dynamically

    const languages = {
        frontendTechnology: [{ title: 'Express' }, { title: 'NestJS' }],
        domain: [{ title: 'Redux' }, { title: 'Next.js' }],
        cloudTechnology: [{ title: 'RxJS' }, { title: 'NgRx' }],
        dataEngineering: [{ title: 'Grid' }, { title: 'Utilities' }],
    };

    // Get Multi select Filter dropdown based on Technology Filter
    const getLanguageDropdownValues = (selectedValue) => {
        if (!selectedValue) return;
        const technologyFilterValue = selectedValue.split(' ')
            .map((word, index) => index === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join('');
        setLanguageDropdown(languages[technologyFilterValue])
    }

    // Handler for clearing both single and multi-selected values
    const handleClearAll = () => {
        setSelectedValues([]);
    };

    // Handler for removing a specific multi-selected value
    const handleRemove = (valueToRemove) => {
        setSelectedValues((prev) => prev.filter((item) => item !== valueToRemove));
    };

    //Updating the State for single auto-complete
    const onChangeSingleFilter = (event, newValue) => {
        setSelectedValue(newValue);
        setSelectedValues([]);
        getLanguageDropdownValues(newValue?.title);  // Trigger dropdown update
    };

    //Updating the State for multi select auto-complete
    const handleOnSelect = (event, newValue) => {
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

    // Function to display single selected item
    const displaySelectedItem = (selectedItem, onRemove) => (
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
        <>
            <h3>RESULTS</h3>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Single-select Autocomplete */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Autocomplete
                        disablePortal
                        options={technologies}
                        getOptionLabel={(option) => option.title}
                        value={selectedValue}
                        onChange={onChangeSingleFilter}
                        sx={{
                            width: 300,
                            marginRight: 2
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder='Filter By Technologies'
                                onFocus={(event) => event.target.placeholder = 'Select'}
                                onBlur={(event) => event.target.placeholder = 'Filter By Technologies'}
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
                    languages={languageDropdown}
                    handleOnSelect={handleOnSelect}
                />
                <Button variant="contained">Apply</Button>

                {/* Unified selected items box (for both single and multi-select) */}
                {(selectedValues.length > 0) && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 2,
                        }}
                    >

                        {/* Render the multi-selected values (if any exist) */}
                        {selectedValues.map((selectedItem) =>
                            displaySelectedItem(selectedItem, () => handleRemove(selectedItem))
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
        </>
    );
}
