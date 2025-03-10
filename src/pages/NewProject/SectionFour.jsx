import React, { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import { DropdownCustom } from "../../components/atoms/DropdownCustom";

const SectionFour = ({ row, viewProject, onSelectedValuesChange, onSelectedViewValuesChange, ...props }) => {
  const [selectedValues, setSelectedValues] = useState({});
  const [viewValues, setViewValues] = useState({});
  const [updateValues, setUpdateValues] = useState({})

  const handleSelect = (key, newValue) => {

    setSelectedValues((prevValues) => {
      const updatedValues = { ...prevValues, [key]: newValue };
      onSelectedValuesChange?.(updatedValues);
      return updatedValues;
    });
  };

  const handleViewSelect = (key, newValue) => {
    setUpdateValues((prevValues) => {
      const updatedValues = { ...prevValues, [key]: newValue }; // Update only selected dropdowns
      onSelectedViewValuesChange?.(updatedValues); // Send only the latest selections
      return updatedValues;
    });
  };
  
  
  


  useEffect(() => {
    onSelectedValuesChange(viewValues);
  }, [viewValues]);

  const handleFilterSelect = (key, newValue) => {
    viewProject ? handleViewSelect(key, newValue) : handleSelect(key, newValue);
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
            <DropdownCustom
              input={props[key] || []}
              row={row}
              onFocus="Select..."
              onBlur={labels}
              handleSelect={(newValue) => handleFilterSelect(key, newValue)}
              selectedValues={viewProject ? viewValues[key] : selectedValues[key]}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default SectionFour;
