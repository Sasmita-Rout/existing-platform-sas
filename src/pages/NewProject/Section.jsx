import React from 'react';
import { Filter } from "../../components/molecules/index";
import TextField from '@mui/material/TextField';
import { Box, Typography } from "@mui/material";
import EmergencyIcon from '@mui/icons-material/Emergency';

export default function Section({ buhInput, accountInput, ddInput, setValue, buhValue, ddValue, accountValue, projectName, viewProject, disableButton }) {

    const buhFilterPlaceholder = 'Select BUH';
    const accountFilterPlaceholder = 'Select Account';
    const ddFilterPlaceholder = 'Select DD';
    const projectFilterPlaceholder = 'Enter project name here';

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                {/* BUH Filter */}
                <Box sx={{ marginRight: 2 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontSize: 14 }}>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />BUH
                    </Typography>
                    <Filter
                        input={buhInput}
                        onFocus='Select...'
                        onBlur={buhFilterPlaceholder}
                        handleOnSelect={(event, newValue) => setValue("buhValue", newValue)}
                        selectedValues={buhValue}
                        isMultiSelect={false}
                        placeholder={buhFilterPlaceholder}
                        showIcon={false}
                        // disabled={!disableButton}
                    />
                </Box>

                {/* Account Filter */}
                <Box sx={{ marginRight: 2 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontSize: 14 }}>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />Account
                    </Typography>
                    <Filter
                        input={accountInput}
                        onFocus="Select..."
                        onBlur={accountFilterPlaceholder}
                        handleOnSelect={(event, newValue) => setValue("accountValue", newValue)}
                        selectedValues={accountValue}
                        isMultiSelect={false}
                        placeholder={accountFilterPlaceholder}
                        showIcon={false}
                        // disabled={!disableButton}
                    />
                </Box>

                {/* DD Filter */}
                <Box sx={{ marginRight: 2 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontSize: 14 }}>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />DD
                    </Typography>
                    <Filter
                        input={ddInput}
                        onFocus='Select...'
                        onBlur={ddFilterPlaceholder}
                        handleOnSelect={(event, newValue) => setValue("ddValue", newValue)}
                        selectedValues={ddValue}
                        isMultiSelect={false}
                        placeholder={ddFilterPlaceholder}
                        // disabled={!disableButton}
                    />
                </Box>

                {/* Project Name Filter */}
                <Box sx={{ marginRight: 2 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontSize: 14 }}>
                        <EmergencyIcon style={{ fontSize: "small", color: "red" }} />Project Name
                    </Typography>
                    <Box component="form" sx={{ '& > :not(style)': { width: '360px' } }} noValidate autoComplete="off">
                    {/* disabled={!disableButton} */}
                        <TextField id="outlined-basic" placeholder={projectFilterPlaceholder} variant="outlined" value={!viewProject ? null : projectName} onChange={(e) => setValue("projectName", e.target.value)} />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
