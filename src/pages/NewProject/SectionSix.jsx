import React, { useEffect } from "react";
import { Filter } from "../../components/molecules/index";
import { Box, Typography } from "@mui/material";
import { DropdownCustom } from "../../components/atoms/DropdownCustom";

export default function SectionSix({
  row,
  viewProject,
  disableButton,
  onSelectedValuesChange,
  ...props
}) {
  const [selectedValues, setSelectedValues] = React.useState({});
  const [viewValues, setViewValues] = React.useState({});

  const handleSelect = (key, newValue) => {
    setSelectedValues((prevValues) => {
      const updatedValues = { ...prevValues, [key]: newValue };
      if (onSelectedValuesChange) {
        onSelectedValuesChange(updatedValues);
      }
      return updatedValues;
    });
  };

  const handleViewSelect = (key, newValue) => {

    setViewValues((prevValues) => ({
      ...prevValues,
      [key]: newValue,
    }));
  };

  const handleFilterSelect = (key, newValue) => {
    if (viewProject) {
      handleViewSelect(key, newValue);
    } else {
      handleSelect(key, newValue);
    }
  };


  useEffect(() => {
    if (viewProject) {
      const updatedValues = {
        aiAndMachineLearningTechnologies:
          row["ai_machine_learning_technologies"],
      };
      setViewValues(updatedValues);
    }
  }, [viewProject]);

  const inputs = [
    {
      key: "aiAndMachineLearningTechnologies",
      labels: "Select AI and Machine Learning",
    },
  ];

  useEffect(() => {
    onSelectedValuesChange(viewValues);
  }, [viewValues]);

  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {inputs.map(({ key, labels }) => (
          <Box sx={{ marginRight: 2, marginTop: 2 }} key={key}>
            <Typography variant="subtitle1" sx={{ fontSize: 14 }} gutterBottom>
              {labels}
            </Typography>
            {/* <Filter
              input={props[key] || []}
              onFocus="Select..."
              onBlur={labels}
              handleOnSelect={(event, newValue) =>
                handleFilterSelect(key, newValue)
              }
              selectedValues={
                viewProject ? viewValues[key] : selectedValues[key]
              }
              isMultiSelect={false}
              placeholder={labels}
              showIcon={false}
              // disabled={!disableButton}
            /> */}
            <DropdownCustom
              input={props[key] || []}
              row={row}
              onFocus="Select..."
              onBlur={labels}
              placeholder={labels}
              handleSelect={(newValue) =>
                handleFilterSelect(key, newValue)
              }
              selectedValues={
                viewProject ? viewValues[key] : selectedValues[key]
              }
              onSelectedValuesChange={onSelectedValuesChange}
              props={props}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
}
