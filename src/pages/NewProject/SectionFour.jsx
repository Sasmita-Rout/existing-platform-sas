import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Filter } from "../../components/molecules/Filter";

const SectionFour = (props) => {
  const [selectedValue, setSelectedValue] = React.useState(null); // For single select
  const technologies = [
    { title: "Frontend Technology" },
    { title: "Domain" },
    { title: "Cloud Technology" },
    { title: "Data Engineering" },
  ];

  // Handler for single select autocomplete
  const [selectedValues, setSelectedValues] = React.useState({});

    const handleSelect = (key, newValue) => {
        setSelectedValues((prevState) => ({
            ...prevState,
            [key]: newValue
        }));
    };

  const inputs = [
    { key: 'SelectManualTestingMgmt', labels: 'Select Manual Testing & Mgmt' },
    { key: 'FunctionalandIntegration', labels: 'Select Functional and Integration...' },
    { key: 'PerformanceandLoadTest', labels: 'Select Performance and Load Test' },
    { key: 'ApplicationSecurityTesting', labels: 'Select Application Security Testing' },
    { key: 'devops', labels: 'Select Devops' },
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
                            selectedValues={selectedValues[key]}
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
