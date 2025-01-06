import React, { useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { Filter } from "../../components/molecules/Filter";

const SectionFour = ({ row, viewProject, onSelectedValuesChange, ...props }) => {
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

  useEffect(() => {
    onSelectedValuesChange(viewValues);
}, [viewValues])

  const handleFilterSelect = (key, newValue) => {
    if (viewProject) {
      handleViewSelect(key, newValue);
    } else {
      handleSelect(key, newValue);
    }
  };

  useEffect(() => {
    if (viewProject) {
      setViewValues({
        SelectManualTestingMgmt: row["manual_testing_management_tools"],
        FunctionalandIntegration: row["functional_integration_testing"],
        PerformanceandLoadTest: row["performance_load_testing_tools"],
        ApplicationSecurityTesting: row["application_security_testing_tools"],
        devopsInfrastructureAsCodeIac: row["devops_infrastructure_as_code_iac"],
      });
    }
  }, [viewProject]);

  const inputs = [
    { key: 'SelectManualTestingMgmt', labels: 'Select Manual Testing & Mgmt' },
    { key: 'FunctionalandIntegration', labels: 'Select Functional and Integration...' },
    { key: 'PerformanceandLoadTest', labels: 'Select Performance and Load Test' },
    { key: 'ApplicationSecurityTesting', labels: 'Select Application Security Testing' },
    { key: 'devopsInfrastructureAsCodeIac', labels: 'Select DevOps' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
      <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        {inputs.map(({ key, labels }) => (
          <Box sx={{ marginRight: 2, marginTop: 2 }} key={key}>
            <Typography variant="subtitle1" sx={{ fontSize: 14 }} gutterBottom>
              {labels}
            </Typography>
            <Filter
              input={props[key] || []}
              onFocus="Select..."
              onBlur={labels}
              handleOnSelect={(event, newValue) => handleFilterSelect(key, newValue)}
              selectedValues={viewProject ? viewValues[key] : selectedValues[key]}
              isMultiSelect={false}
              placeholder={labels}
              showIcon={false}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default SectionFour;
