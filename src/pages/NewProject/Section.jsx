import React from 'react';
import { Filter } from "../../components/molecules/index";
import TextField from '@mui/material/TextField';
import { Box, Typography } from "@mui/material";
import EmergencyIcon from '@mui/icons-material/Emergency';

export default function Section({ buhInput, accountInput, ddInput }) {
    const [buhValue, selectBuhValue] = React.useState(null);
    const [accountValue, selectAccountValue] = React.useState(null);
    const [ddValue, selectDdValue] = React.useState(null);
    const [projectName, setProjectName] = React.useState(null);

    const buhFilterPlaceholder = 'Select BUH';
    const accountFilterPlaceholder = 'Select Account';
    const ddFilterPlaceholder = 'Select DD';
    const projectFilterPlaceholder = 'Enter project name here';

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                {/* BUH Filter */}
                <Box sx={{ marginRight: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />BUH
                    </Typography>
                    <Filter
                        input={buhInput}
                        onFocus='Select...'
                        onBlur={buhFilterPlaceholder}
                        handleOnSelect={(event, newValue) => selectBuhValue(newValue)}
                        selectedValues={buhValue}
                        isMultiSelect={false}
                        placeholder={buhFilterPlaceholder}
                        showIcon={false}
                    />
                </Box>

                {/* Account Filter */}
                <Box sx={{ marginRight: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />Account
                    </Typography>
                    <Filter
                        input={accountInput}
                        onFocus="Select..."
                        onBlur={accountFilterPlaceholder}
                        handleOnSelect={(event, newValue) => selectAccountValue(newValue)}
                        selectedValues={accountValue}
                        isMultiSelect={false}
                        placeholder={accountFilterPlaceholder}
                        showIcon={false}
                    />
                </Box>

                {/* DD Filter */}
                <Box sx={{ marginRight: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />DD
                    </Typography>
                    <Filter
                        input={ddInput}
                        onFocus='Select...'
                        onBlur={ddFilterPlaceholder}
                        handleOnSelect={(event, newValue) => selectDdValue(newValue)}
                        selectedValues={ddValue}
                        isMultiSelect={false}
                        placeholder={ddFilterPlaceholder}
                    />
                </Box>

                {/* Project Name Filter */}
                <Box sx={{ marginRight: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />Project Name
                    </Typography>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '360px' } }} noValidate autoComplete="off">
                        <TextField id="outlined-basic" placeholder={projectFilterPlaceholder} variant="outlined" onChange={(e) => setProjectName(e.target.value)} />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
