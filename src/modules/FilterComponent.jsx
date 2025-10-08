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
import { columnValues } from "../modules/FilterApiCall"

export default function FilterComponent({ technologyInput, onValuesChange }) {
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [languageDropdown, setLanguageDropdown] = React.useState([]);

  const { apiUrl } = apiUrlConfig;

  const getLanguageDropdownValues = async (selectedValue) => {
    if (!selectedValue) {
      setLanguageDropdown([]);
    }
    const toSnakeCase = (str) => {
      return str
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/\s+/g, '_')
        .toLowerCase();
    };

    const formattedSelectedValue = toSnakeCase(selectedValue);
    const languageResponse = await columnValues(apiUrl, formattedSelectedValue)

    setLanguageDropdown(languageResponse);
  };

  const handleClearAll = () => {
    setSelectedValues([]);
    setSelectedValue([]);
    onValuesChange(null);
  };

  const handleButtonClick = () => {
    onValuesChange(selectedValues);
  }

  const handleRemove = (valueToRemove) => {
    setSelectedValues((prev) => prev.filter((item) => item !== valueToRemove));
    onValuesChange(selectedValues);
    handleButtonClick();
  };

  const onChangeSingleFilter = (event, newValue) => {
    setSelectedValue(newValue);
    getLanguageDropdownValues(newValue);
  };

  const handleOnSelect = (event, newValue) => {
    const uniqueValues = [...selectedValues];
    newValue.forEach((newItem) => {
      if (!uniqueValues.some((item) => item === newItem)) {
        uniqueValues.push(newItem);
      }
    });
    setSelectedValues(uniqueValues);
  };

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
        <Filter
          input={technologyInput}
          handleOnSelect={onChangeSingleFilter}
          selectedValues={selectedValue}
          isMultiSelect={false}
          placeholder="Filter By Technologies"
          onFocus="Select..."
          onBlur="Filter By Technologies"
          showIcon={true}
        />

        <Filter
          input={languageDropdown}
          handleOnSelect={handleOnSelect}
          selectedValues={selectedValues}
          isMultiSelect={true}
          placeholder="Select Options"
          onFocus="Select..."
          onBlur="Select Options"
          showIcon={true}
          disabled={!selectedValue}
        />

        <Button variant="contained" onClick={handleButtonClick} sx={{ maxHeight: 55, marginRight: 5 }}>
          Apply
        </Button>

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