import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Filter } from "../../components/molecules/Filter";

const SectionFive = ({register}) => {
    console.log(register)
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
    <Box sx={{display:"flex"}}>
      <Filter
        input={technologies}
        handleOnSelect={onChangeSingleFilter}
        selectedValues={selectedValue}
        isMultiSelect={false}
        placeholder="Al and Machine Learning Technology"
        onFocus="Select..."
        onBlur="Al and Machine Learning Technology"
        showIcon={true} // Show icon for this filter
        // {...register("securityTesting")}
      />
    </Box>
  );
};

export default SectionFive;
