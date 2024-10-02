import React from 'react';
import { Filter } from "../../components/molecules/index";
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import EmergencyIcon from '@mui/icons-material/Emergency';

export default function SectionThree(props) {
    const [selectedValues, setSelectedValues] = React.useState({});

    const handleSelect = (key, newValue) => {
        setSelectedValues((prevState) => ({
            ...prevState,
            [key]: newValue
        }));
    };

    const inputs = [
        { key: 'environmentInput', labels: 'Select Domain' },
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
