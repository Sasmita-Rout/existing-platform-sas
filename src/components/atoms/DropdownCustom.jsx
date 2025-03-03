import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export function DropdownCustom({
  input = [],
  handleSelect,
  selectedValues = [],
  onFocus = "",
  onBlur = ""
}) {
  const [value, setValue] = useState(null);

  // Convert input array of strings into a valid format
  const formattedInput = input.map((item) => (typeof item === "string" ? item : ""));

  return (
    <Autocomplete
      value={selectedValues}
      onChange={(event, newValue) => {
        setValue(newValue);
        handleSelect?.(newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;

        if (inputValue !== "" && !options.some((option) => option.title === inputValue)) {
          filtered.push(`${params.inputValue}`);
        }

        return filtered;
      }}
      handleHomeEndKeys
      id="custom-dropdown"
      options={formattedInput}
      sx={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === "string" ? option : "")}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
          placeholder={onBlur} // ✅ Set initial placeholder
          onFocus={(event) => event.target.setAttribute("placeholder", onFocus)} // ✅ Updates on focus
          onBlur={(event) => event.target.setAttribute("placeholder", onBlur)} // ✅ Restores on blur
        />
      )}
    />
  );
}

export default DropdownCustom;
