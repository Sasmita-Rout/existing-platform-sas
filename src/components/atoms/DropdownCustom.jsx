import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export function DropdownCustom({ placeholder, input = [], row, onSelectedValuesChange, viewProject,selectedValues }) {
  const [value, setValue] = useState(null);
  const [selectedValuess, setSelectedValuess] = useState({});
  const [viewValues, setViewValues] = React.useState({});

  // Convert input array of strings into objects with title property
  const formattedInput = input.map((item) =>
    typeof item === "string" ? { title: item } : item
  );

  const handleSelect = (key, newValue) => {
    setSelectedValuess((prevValues) => {
      const updatedValues = { ...prevValues, [key]: newValue };
      if (onSelectedValuesChange) {
        onSelectedValuesChange(updatedValues);
      }
      return updatedValues;
    });
  };
  

  useEffect(() => {
    if (viewProject) {
      alert("123");
      const updatedValues = {
        AnalyticsReporting: row["analytics_reporting"], SelectUserFeedbackandAnalytics: row["user_feedback_analytics_tools"],
      };
      setViewValues(updatedValues);
    }
  }, [viewProject])

  useEffect(() => {
    onSelectedValuesChange(viewValues);
}, [viewValues])

  return (
    <Autocomplete
      value={selectedValues}
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
            title: `Add "${inputValue}"`,
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
          value={selectedValues}
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
