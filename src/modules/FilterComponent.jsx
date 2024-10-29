import * as React from "react";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Filter } from "../components/molecules/index";
import { Stack } from "@mui/material";
import apiUrlConfig from "../config/apiUrlConfig";
import { fetchRecords } from "../components/apiServices/index";

export default function FilterComponent({ technologyInput, onValuesChange }) {
  const [selectedValues, setSelectedValues] = React.useState([]); // For multi-select
  const [selectedValue, setSelectedValue] = React.useState(null); // For single select
  const [languageDropdown, setLanguageDropdown] = React.useState([]); // Language dropdown dynamically

  const { apiUrl } = apiUrlConfig;

  // Get multi-select filter dropdown based on the selected technology filter
  const getLanguageDropdownValues = async (selectedValue) => {
    if (!selectedValue) {
      setLanguageDropdown([]);
    }
    const languageUrl = `${apiUrl}/platform_data/column_dropdown?dropdown_type=${selectedValue}`;
    const languageResponse = await fetchRecords(
      languageUrl,
      false,
      false,
      false
    );
    setLanguageDropdown(languageResponse["values"] || []);
  };

  // Clear all multi-selected values
  const handleClearAll = () => {
    setSelectedValues([]);
    setSelectedValue([]);
    onValuesChange(null);
  };

  const handleButtonClick = () => {
    onValuesChange(selectedValues);
  }

  // Handler for removing a specific multi-selected value
  const handleRemove = (valueToRemove) => {
    setSelectedValues((prev) => prev.filter((item) => item !== valueToRemove));
  };

  // Handler for single select autocomplete
  const onChangeSingleFilter = (event, newValue) => {
    setSelectedValue(newValue);
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
      <Stack flexDirection="row" style={{ marginBottom: 50 }}>
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

        <Button variant="contained" onClick={handleButtonClick} sx={{ maxHeight: 55, marginRight: 5 }}>
          Apply
        </Button>

        {/* Display selected items */}
        {selectedValues.length > 0 && (
          <Box
            sx={{
              marginTop: 2,
              maxWidth: 400,
              marginLeft: 2,
              display: "flex",
              flexWrap: "noWrap",
              overflowX: "scroll",
            }}
          >
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
