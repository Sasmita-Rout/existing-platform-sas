import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Filter } from "../../components/molecules/Filter";

const SectionFive = () => {
  const [selectedValue, setSelectedValue] = React.useState(null); // For single select
  const technologies = [
    { title: "Frontend Technology" },
    { title: "Domain" },
    { title: "Cloud Technology" },
    { title: "Data Engineering" },
  ];

  // Handler for single select autocomplete
  const onChangeSingleFilter = (event, newValue) => {
    setSelectedValue(newValue);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Filter
        input={technologies}
        handleOnSelect={onChangeSingleFilter}
        selectedValues={selectedValue}
        isMultiSelect={false}
        placeholder="Select User Feedback and Analyst"
        onFocus="Select..."
        onBlur="Select User Feedback and Analyst"
        showIcon={false} // Show icon for this filter
      />
      <Filter
        input={technologies}
        handleOnSelect={onChangeSingleFilter}
        selectedValues={selectedValue}
        isMultiSelect={false}
        placeholder="Select Analytics & Reporting"
        onFocus="Select..."
        onBlur="Select Analytics & Reporting"
        showIcon={false} // Show icon for this filter
      />
    </Box>
  );
};

export default SectionFive;
