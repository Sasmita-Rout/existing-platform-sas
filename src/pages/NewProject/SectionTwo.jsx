import React from 'react';
import { Filter } from "../../components/molecules/index";
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import EmergencyIcon from '@mui/icons-material/Emergency';

export default function SectionTwo({ domainInput, applicationInput }) {
    const [domainValue, selectDomainValue] = React.useState(null);
    const [applicationValue, selectApplicationValue] = React.useState(null);

    const domainPlaceholder = 'Select Domain';
    const applicationClassPlaceholder = 'Feature Enhancements, New Production';

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
            <Box sx={{ display: 'flex', borderRadius: '5px', border: `1px solid ${grey[500]}`, padding: '10px', gap: 1, width: "100%", backgroundColor: `${grey[200]}` }}>
                <Avatar sx={{ bgcolor: 'grey', width: 30, height: 30 }}>
                    <Typography variant="body2" color="white">2</Typography>
                </Avatar>
                <Typography variant="subtitle1" gutterBottom>
                    <EmergencyIcon style={{ fontSize: "small", color: "red" }} />Domains and Application Class
                </Typography>
            </Box>
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
