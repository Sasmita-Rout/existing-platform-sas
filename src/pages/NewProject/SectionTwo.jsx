import React from 'react';
import { Filter } from "../../components/molecules/index";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmergencyIcon from '@mui/icons-material/Emergency';

export default function SectionTwo({ domainInput, applicationInput, domainValue, selectDomainValue, applicationValue, selectApplicationValue }) {

    const domainPlaceholder = 'Select Domain';
    const applicationClassPlaceholder = 'Feature Enhancements, New Production';

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
            <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Box sx={{ marginRight: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />Domain
                    </Typography>
                    <Filter
                        input={domainInput}
                        onFocus="Select..."
                        onBlur={domainPlaceholder}
                        handleOnSelect={(event, newValue) => selectDomainValue(newValue)}
                        selectedValues={domainValue}
                        isMultiSelect={false}
                        placeholder={domainPlaceholder}
                        showIcon={false}
                    />
                </Box>

                <Box sx={{ marginRight: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />Application Class
                    </Typography>
                    <Filter
                        input={applicationInput}
                        onFocus="Select..."
                        onBlur={applicationClassPlaceholder}
                        handleOnSelect={(event, newValue) => selectApplicationValue(newValue)}
                        selectedValues={applicationValue}
                        isMultiSelect={false}
                        placeholder={applicationClassPlaceholder}
                        showIcon={false}
                    />
                </Box>
            </Box>


        </div>
    );
}
