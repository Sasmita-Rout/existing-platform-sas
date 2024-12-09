import React, { useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useUserStore } from "../../zustand";
import apiUrlConfig from "../../config/apiUrlConfig";
import { getUploadSowFileDetails, downloadSowFile } from "../../modules/FilterApiCall";
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function SectionOne(props) {
  const { startDate, endDate, setValue, selectedFile, viewProject, apiUrl, projectName, disableButton, accountValue, accountName, projectValue } = props
  const { pmoUser } = useUserStore();
  const [uploadFiles, setUploadFiles] = useState();
  const [fileName, setFileName] = useState();
  const [isFileFound, setIsFileFound] = useState(true)

  async function uploadFile(endpoint, file) {
    const formData = new FormData();
    formData.append("file", file, file.name);

    const config = {
      method: "POST",
      mode: "cors",
      body: formData,
      cache: "default",
    };

    try {
      const response = await fetch(endpoint, config);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
  useEffect(() => {
    async function viewProjectDates() {
      const result = await getUploadSowFileDetails(apiUrl);
      setUploadFiles(result);
      const details = uploadFiles && Array.isArray(uploadFiles["files"]) ? uploadFiles["files"] : [];
      const projectDetails = details.find((item) => (
        item["project_name"] === projectValue && item["account_name"] === accountName
      ))
      // const fileName = projectDetails ? projectDetails["filename"] : null
      projectDetails["filename"]&&setFileName(projectDetails["filename"])

      const startDate = projectDetails ? projectDetails["start_date"] : ""
      const endDate = projectDetails ? projectDetails["end_date"] : ""

      console.log(fileName, startDate, endDate, '123');
    }
    viewProjectDates();
  }, [viewProject])

  const downloadFile = async () => {
    // const result = await getUploadSowFileDetails(apiUrl)
    // const details = result && Array.isArray(result["files"]) ? result["files"] : [];
    // const projectDetails = details.find((item) => (
    //   item["project_name"] === projectName && item["account_name"] === accountName
    // ))
    // const fileName = projectDetails ? projectDetails["filename"] : null

    // const startDate = projectDetails ? projectDetails["start_date"] : ""
    // const endDate = projectDetails ? projectDetails["end_date"] : ""

    // console.log(fileName, startDate, endDate, '456');
    if(!fileName) {
      setIsFileFound(false)
      }
    if (fileName) {
      const file = await downloadSowFile(apiUrl, fileName)

      const url = URL.createObjectURL(file);

      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName; // Set desired file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up URL
      URL.revokeObjectURL(url);
    }
  }

  const callUpload = (files) => {
    const file = files[0];
    if (file) {
      setValue("sowSelectedFile", file); // Store file info in state
      const url = `${apiUrlConfig?.apiUrl}/upload?user=${pmoUser["email"]}&start_date=${startDate}&end_date=${endDate}&account_name=${accountValue}&project_name=${projectName}`;
      uploadFile(url, file);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      {/* Browse Button and Date Pickers Together */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "15px",
          gap: 3,
        }}
      >
        {/* Browse Button Section */}
        {!viewProject ?
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "5px",
              padding: "20px",
              gap: 1,
              width: "60%",
              border: `3px solid ${grey[400]}`,
              borderStyle: "dotted",
            }}
          >
            <CloudUploadOutlinedIcon
              style={{ marginBottom: "10px", fontSize: "40px", color: `red` }}
            />
            <Typography style={{ marginBottom: "3px", fontSize: "15px" }}>
              Select your file or drag and drop
            </Typography>
            <Typography
              style={{
                marginBottom: "10px",
                fontSize: "15px",
                color: `${grey[500]}`,
              }}
            >
              (pdf, jpg, docx accepted)
            </Typography>
            <Button
              sx={{ padding: "10px", backgroundColor: "#0E5FD9" }}
              component="label"
              variant="contained"
            >
              Browse
              <VisuallyHiddenInput
                type="file"
                accept=".pdf, .jpg, .jpeg, .docx"
                onChange={(event) => callUpload(event?.target?.files)}
                multiple
              />
            </Button>
            {selectedFile && (
              <Typography sx={{ marginTop: "10px", color: `${grey[600]}` }}>
                Selected file: {selectedFile?.name} (
                {(selectedFile?.size / 1024).toFixed(2)} KB)
              </Typography>
            )}
          </Box> :
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "5px",
              padding: "20px",
              gap: 1,
              width: "60%",
              border: `3px solid ${grey[400]}`,
              borderStyle: "dotted",
            }}
          >
            <Typography style={{ fontSize: "15px", marginTop: "50px" }}>
              Download the Uploaded File here...
            </Typography>
            <FileDownloadIcon />
            <Button
              onClick={downloadFile}
              variant="contained">Download File</Button>
              {!isFileFound &&
              <>
              <Typography style={{ fontSize: "15px", marginTop: "20px", color:"red" }}>
              No File Found to Download
            </Typography>
            <FileDownloadOffIcon/>
            </>
              }
          </Box>
        }

        {/* Date Pickers Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "30%",
            paddingRight: "90px",
            marginRight: "130px",
          }}
        >
          <Typography variant="subtitle1">SOW Start Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={startDate}
              disabled={!disableButton}
              onChange={(newValue) => setValue("sowStartDate", newValue)}
              inputFormat="DD-MM-YYYY"

              renderInput={(params) => <TextField {...params} />}
            />
            <Typography variant="subtitle1">SOW End Date</Typography>
            <DatePicker
              value={endDate}
              minDate={startDate}
              disabled={!disableButton}
              onChange={(newValue) => setValue("sowEndDate", newValue)}
              inputFormat="DD-MM-YYYY"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </div>
  );
}
