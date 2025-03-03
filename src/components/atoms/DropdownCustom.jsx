import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export function DropdownCustom({ placeholder, input = [], handleSelect, selectedValues = [] }) {
  const [value, setValue] = useState(null);

  // Convert input array of strings into objects with title property
  const formattedInput = input.map((item) =>
    typeof item === "string" ? item: ""
  );

  return (
    <Autocomplete
      value={selectedValues}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (handleSelect) {
          handleSelect(newValue); // Ensure this function exists in the parent component
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;

        if (inputValue !== "" && !options.some((option) => option.title === inputValue)) {
          filtered.push(`Add "${params.inputValue}"`);
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="custom-dropdown"
      options={formattedInput}
      sx={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.title)}
      renderOption={(props, option) => (
        <li {...props}>{typeof option === "string" ? option : option.title}</li>
      )}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          InputLabelProps={{ shrink: true }} // ✅ Ensures label stays visible
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}

export default DropdownCustom;
