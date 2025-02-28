import React, { useEffect } from "react";
import { Filter } from "../../components/molecules/index";
import { Box, Typography } from "@mui/material";
import {DropdownCustom} from "../../components/atoms/DropdownCustom";

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
            <DropdownCustom
              row={row}
              placeholder={labels}
              onSelectedValuesChange={onSelectedValuesChange}
              input={props[key] || []}
              props= {props}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
}
