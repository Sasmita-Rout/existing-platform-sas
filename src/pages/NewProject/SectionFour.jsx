import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { Filter } from "../../components/molecules/Filter";

const SectionFour = ({ row, viewProject,disableButton, onSelectedValuesChange, ...props }) => {
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
        SelectManualTestingMgmt: row["manual_testing_management_tools"], FunctionalandIntegration: row["functional_integration_testing"],
        PerformanceandLoadTest: row["performance_load_testing_tools"], ApplicationSecurityTesting: row["application_security_testing_tools"], devopsInfrastructureAsCodeIac: row["devops_infrastructure_as_code_iac"]
      };
      setViewValues(updatedValues);
    }
  }, [])

  const inputs = [
    { key: 'SelectManualTestingMgmt', labels: 'Select Manual Testing & Mgmt' },
    { key: 'FunctionalandIntegration', labels: 'Select Functional and Integration...' },
    { key: 'PerformanceandLoadTest', labels: 'Select Performance and Load Test' },
    { key: 'ApplicationSecurityTesting', labels: 'Select Application Security Testing' },
    { key: 'devopsInfrastructureAsCodeIac', labels: 'Select Devops' },
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

export default SectionFour;
