import React, { useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { Filter } from "../../components/molecules/Filter";

const SectionFive = ({ row, viewProject,disableButton, onSelectedValuesChange, ...props }) => {

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


  useEffect(() => {
    if (viewProject) {
      const updatedValues = {
        AnalyticsReporting: row["analytics_reporting"], SelectUserFeedbackandAnalytics: row["user_feedback_analytics_tools"],
      };
      setViewValues(updatedValues);
    }
  }, [])
  const inputs = [
    { key: 'AnalyticsReporting', labels: 'Select Analytics & Reporting' },
    { key: 'SelectUserFeedbackandAnalytics', labels: 'Select User Feedback and Analytics' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
      <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        {inputs.map(({ key, labels }) => (
          <Box sx={{ marginRight: 2, marginTop: 2 }} key={key}>
            <Filter
              input={props[key] || []}
              onFocus="Select..."
              onBlur={labels}
              handleOnSelect={(event, newValue) => handleSelect(key, newValue)}
              // selectedValues={selectedValues[key]}
              selectedValues={viewProject ? viewValues[key] : selectedValues[key]}
              isMultiSelect={false}
              placeholder={labels}
              showIcon={false}
              disabled={!disableButton}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default SectionFive;
