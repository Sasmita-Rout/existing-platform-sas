import * as React from "react";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Filter } from "../components/molecules/index";
import { Stack } from "@mui/material";

export default function FilterComponent({ technologyInput, languageInput }) {
  const [selectedValues, setSelectedValues] = React.useState([]); // For multi-select
  const [selectedValue, setSelectedValue] = React.useState(null); // For single select
  const [languageDropdown, setLanguageDropdown] = React.useState([]); // Language dropdown dynamically

  // Get multi-select filter dropdown based on the selected technology filter
  const getLanguageDropdownValues = (selectedValue) => {
    if (!selectedValue) return;

    // Process the selected technology and set the appropriate language dropdown
    const technologyFilterValue = selectedValue
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word[0].toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
    setLanguageDropdown(languageInput[technologyFilterValue] || []);
  };

  // Clear all multi-selected values
  const handleClearAll = () => {
    setSelectedValues([]);
  };

  // Handler for removing a specific multi-selected value
  const handleRemove = (valueToRemove) => {
    setSelectedValues((prev) => prev.filter((item) => item !== valueToRemove));
  };

  // Handler for single select autocomplete
  const onChangeSingleFilter = (event, newValue) => {
    setSelectedValue(newValue);
    setSelectedValues([]); // Reset multi-select when a new single select is chosen
    getLanguageDropdownValues(newValue);
  };

  // Handler for multi-select autocomplete
  const handleOnSelect = (event, newValue) => {
    const uniqueValues = [...selectedValues];
    newValue.forEach((newItem) => {
      if (!uniqueValues.some((item) => item === newItem)) {
        uniqueValues.push(newItem);
      }
    });
    setSelectedValues(uniqueValues);
  };

  // Function to display selected items
  const displaySelectedItem = (selectedItem, onRemove) => (
    <Box
      key={selectedItem}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "2px 4px",
        borderRadius: "20px",
        border: `1px solid ${grey[500]}`,
        backgroundColor: grey[50],
        flexShrink: 0,
        fontSize: "0.75rem",
        height: "35px",
        marginBottom: "10px",
        marginLeft: 2,
      }}
    >
      <Typography sx={{ fontSize: "0.75rem", paddingRight: "8px" }}>
        {selectedItem}
      </Typography>
      <IconButton onClick={onRemove} size="small">
        <ClearIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );

  return (
    <>
      <h3>RESULTS</h3>
      <Stack flexDirection="row">
        {/* Single-select Autocomplete */}
        <Filter
          input={technologyInput}
          handleOnSelect={onChangeSingleFilter}
          selectedValues={selectedValue}
          isMultiSelect={false}
          placeholder="Filter By Technologies"
          onFocus="Select..."
          onBlur="Filter By Technologies"
          showIcon={true} // Show icon for this filter
        />

        {/* Multi-select Autocomplete */}
        <Filter
          input={languageDropdown}
          handleOnSelect={handleOnSelect}
          selectedValues={[]}
          isMultiSelect={true}
          placeholder="Select Options"
          onFocus="Select..."
          onBlur="Select Options"
          showIcon={true}
        />

        <Button variant="contained">Apply</Button>

        {/* Display selected items */}
        {selectedValues.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}>
            {selectedValues.map((selectedItem) =>
              displaySelectedItem(selectedItem, () =>
                handleRemove(selectedItem)
              )
            )}
          </Box>
        )}

        {/* Clear All Button */}
        <Box ml="auto">
          <Button
            style={{
              backgroundColor: "grey",
              color: "white",
              borderRadius: "20px",
              marginBottom: "5px",
            }}
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </Box>
      </Stack>
    </>
  );
}
