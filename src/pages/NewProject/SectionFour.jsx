import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Filter } from "../../components/molecules/Filter";

const SectionFour = () => {
  // console.log(register)
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
        placeholder="Select Manual Testing & Mgmt"
        onFocus="Select..."
        onBlur="Select Manual Testing & Mgmt"
        showIcon={false} // Show icon for this filter
      // {...register("manualTesting")}
      />
      <Filter
        input={technologies}
        handleOnSelect={onChangeSingleFilter}
        selectedValues={selectedValue}
        isMultiSelect={false}
        placeholder="Select Functional & Integration"
        onFocus="Select..."
        onBlur="Select Functional & Integration"
        showIcon={false} // Show icon for this filter
      // {...register("functional")}
      />
      <Filter
        input={technologies}
        handleOnSelect={onChangeSingleFilter}
        selectedValues={selectedValue}
        isMultiSelect={false}
        placeholder="Select Performance and Load Testing"
        onFocus="Select..."
        onBlur="Select Performance and Load Testing"
        showIcon={false} // Show icon for this filter
      // {...register("performance")}
      />
      <Filter
        input={technologies}
        handleOnSelect={onChangeSingleFilter}
        selectedValues={selectedValue}
        isMultiSelect={false}
        placeholder="Select Application Security Testing"
        onFocus="Select..."
        onBlur="Select Application Security Testing"
        showIcon={false} // Show icon for this filter
      // {...register("securityTesting")}
      />
    </Box>
  );
};

export default SectionFour;
