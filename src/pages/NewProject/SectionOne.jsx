import React from 'react';
import { Filter } from "../../components/molecules/index";
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import EmergencyIcon from '@mui/icons-material/Emergency';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function SectionOne({ buhInput, accountInput, ddInput }) {
    const [buhValue, selectBuhValue] = React.useState(null);
    const [accountValue, selectAccountValue] = React.useState(null);
    const [ddValue, selectDdValue] = React.useState(null);
    const [projectName, setProjectName] = React.useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

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

            <Box sx={{ display: 'flex', borderRadius: '5px', border: `1px solid ${grey[500]}`, padding: '10px', gap: 1, width: "100%", backgroundColor: `${grey[200]}` }}>
                <Avatar sx={{ bgcolor: 'grey', width: 30, height: 30 }}>
                    <Typography variant="body2" color="white">1</Typography>
                </Avatar>
                <Typography variant="subtitle1" gutterBottom>
                    <EmergencyIcon style={{ fontSize: "small", color: "red" }} />Upload SOW
                </Typography>
            </Box>

            {/* Browse Button and Date Pickers Together */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: "100%",
                marginTop: "15px",
                gap: 3,
            }}>
                {/* Browse Button Section */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '5px',
                    padding: '20px',
                    gap: 1,
                    width: "60%",
                    border: `3px solid ${grey[400]}`,
                    borderStyle: 'dotted',
                }}>
                    <CloudUploadOutlinedIcon style={{ marginBottom: "10px", fontSize: "40px", color: `red` }} />
                    <Typography style={{ marginBottom: "3px", fontSize: "15px" }}>Select your file or drag and drop</Typography>
                    <Typography style={{ marginBottom: "10px", fontSize: "15px" }}>(pdf, jpg, docx accepted)</Typography>
                    <Button sx={{ padding: '10px' }} component="label" variant="contained">
                        Browse
                        <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
                    </Button>
                </Box>

                {/* Date Pickers Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: "30%", paddingRight: "90px", marginRight: "130px" }}>
                    <Typography variant="subtitle1">
                        SOW Start Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            inputFormat="DD-MM-YYYY"
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Typography variant="subtitle1">
                            SOW End Date
                        </Typography>
                        <DatePicker
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            inputFormat="DD-MM-YYYY"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
        </div>
    );
}
