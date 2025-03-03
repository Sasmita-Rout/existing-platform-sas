import React, { useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { Filter } from "../../components/molecules/Filter";
import { DropdownCustom } from "../../components/atoms/DropdownCustom";

const SectionFive = ({ row, viewProject, disableButton, onSelectedValuesChange, ...props }) => {

  // Handler for single select autocomplete
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
    onSelectedValuesChange(viewValues);
  }, [viewValues])

  useEffect(() => {
    if (viewProject) {
      const updatedValues = {
        AnalyticsReporting: row["analytics_reporting"], SelectUserFeedbackandAnalytics: row["user_feedback_analytics_tools"],
      };
      setViewValues(updatedValues);
    }
  }, [viewProject])
  const inputs = [
    { key: 'AnalyticsReporting', labels: 'Select Analytics & Reporting' },
    { key: 'SelectUserFeedbackandAnalytics', labels: 'Select User Feedback and Analytics' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
      <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        {inputs.map(({ key, labels }) => (
          <Box sx={{ marginRight: 2, marginTop: 2 }} key={key}>
            <Typography variant="subtitle1" sx={{ fontSize: 14 }} gutterBottom>
              {labels}
            </Typography>
            <DropdownCustom
              input={props[key] || []}
              row={row}
              placeholder={labels}
              onFocus="Select..."
              onBlur={labels}
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
};

export default SectionFive;
