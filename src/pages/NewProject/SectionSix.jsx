import React from 'react';
import { Filter } from "../../components/molecules/index";
import Box from '@mui/material/Box';


export default function SectionSix({onSelectedValuesChange,...props}) {
    const [selectedValues, setSelectedValues] = React.useState({});

    const handleSelect = (key, newValue) => {
        setSelectedValues((prevValues) => {
          const updatedValues = { ...prevValues, [key]: newValue };
          onSelectedValuesChange(updatedValues); // Call the callback with updated values
          return updatedValues;
        });
      };

    const inputs = [
        { key: 'aiAndMachineLearningTechnologies', labels: 'Select AI and Machine Learning' },
    ];

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
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
}
