import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export function DropdownCustom({ placeholder, input = [], row, onSelectedValuesChange }) {
  const [value, setValue] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});

  // Convert input array of strings into objects with title property
  const formattedInput = input.map((item) =>
    typeof item === "string" ? { title: item } : item
  );

  const handleSelect = (key, newValue) => {
    setSelectedValues((prevValues) => {
      const updatedValues = { ...prevValues, [key]: newValue };
      if (onSelectedValuesChange) {
        onSelectedValuesChange(updatedValues);
      }
      return updatedValues;
    });
  };

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        console.log("New Value:", newValue);
        handleSelect(row?.id || "defaultKey", newValue);
        
        if (typeof newValue === "string") {
          setValue({ title: newValue });
        } else if (newValue?.inputValue) {
          setValue({ title: newValue.inputValue });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;

        if (inputValue !== "" && !options.some((option) => option.title === inputValue)) {
          filtered.push({
            inputValue,
            title: inputValue,
          });
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
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
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
