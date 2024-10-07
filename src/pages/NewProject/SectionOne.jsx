import React from 'react';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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

export default function SectionOne() {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);


    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
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
                    <Typography style={{ marginBottom: "10px", fontSize: "15px", color:`${grey[500]}` }}>(pdf, jpg, docx accepted)</Typography>
                    <Button sx={{ padding: '10px', backgroundColor: "#0E5FD9" }} component="label" variant="contained">
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
