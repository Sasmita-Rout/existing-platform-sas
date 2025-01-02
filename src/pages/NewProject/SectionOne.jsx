import React, { useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
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
  const { startDate, endDate, setValue, selectedFile, viewProject, apiUrl, projectName, disableButton, accountValue, accountName, projectValue, onSubmit, architectureSelectedFile } = props
  const { pmoUser } = useUserStore();
  const [uploadFiles, setUploadFiles] = useState();
  const [sowFileName, setsowFileName] = useState();
  const [archFileName, setArchFileName] = useState()
  const [isFileFound, setIsFileFound] = useState(true);
  const [isArchFileFound, setIsArchFileFound] = useState(true)
  const [startsowDate, setStartsowDate] = useState()
  const [endsowDate, setEndsowDate] = useState()
  const [loading, setLoading] = useState(false)
  const [archLoading, setArchLoading] = useState(false)

  async function uploadFile(endpoint, sowFile, archFile) {
    const formData = new FormData();
    // Append sow_file (either with a file or as empty)
    if (sowFile) {
      formData.append("sow_file", sowFile, sowFile.name); // With file
    } else {
      formData.append("sow_file", ""); // Empty field
    }
    // Append architecture_file (either with a file or as empty)
    if (archFile) {
      formData.append("architecture_file", archFile, archFile.name); // With file
    } else {
      formData.append("architecture_file", ""); // Empty field
    }

    const config = {
      method: "POST",
      mode: "cors",
      body: formData,
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
      const projectDetails = result && result.files.find((item) => (
        item["project_name"] === projectValue && item["account_name"] === accountName
      ))
      if (projectDetails) {
        projectDetails["sow_filename"] && setsowFileName(projectDetails["sow_filename"])
        projectDetails["ad_filename"] && setArchFileName(projectDetails["ad_filename"])

        const startDate = projectDetails ? projectDetails["start_date"] : ""
        const endDate = projectDetails ? projectDetails["end_date"] : ""

        setStartsowDate(startDate);
        setEndsowDate(endDate);
      }

    }
    viewProjectDates();
  }, [])

  const downloadFile = async () => {
    setLoading(true)
    if (!sowFileName) {
      setIsFileFound(false)
      setLoading(false)
      return
    }
    const file = await downloadSowFile(apiUrl, sowFileName)

    const url = URL.createObjectURL(file);

    // Trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = sowFileName; // Set desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up URL
    URL.revokeObjectURL(url);
    setLoading(false)

  }

  const downloadArchFile = async () => {
    setArchLoading(true)
    if (!archFileName) {
      setIsArchFileFound(false)
      setArchLoading(false)
      return
    }
    const file = await downloadSowFile(apiUrl, archFileName)

    const url = URL.createObjectURL(file);

    // Trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = archFileName; // Set desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up URL
    URL.revokeObjectURL(url);
    setArchLoading(false)

  }
  useEffect(() => {
    if (startDate && endDate && accountValue && projectName && selectedFile && onSubmit) {


      const callUpload = async () => {
        const file = selectedFile ? selectedFile : null;
        const archFile = architectureSelectedFile ? architectureSelectedFile : null;
        const sowEnd = endDate ? (endDate).toISOString() : "";
        const sowStart = startDate ? (startDate).toISOString() : "";
        const url = `${apiUrlConfig?.apiUrl}/upload?user=${pmoUser["email"]}&start_date=${sowStart}&end_date=${sowEnd}&account_name=${accountValue}&project_name=${projectName}`;

        if (file) {
          setValue("sowSelectedFile", file[0]); // Store file info in state
          if (architectureSelectedFile) {
            setValue("architectureSelectedFile", archFile[0]); // Store file info in state

            // await uploadFile(url, file[0], archFile[0]);
          }
          // await uploadFile(url, file[0], null);
        }
        await uploadFile(url, file ? file[0] : null, archFile ? archFile[0] : null);

      };

      callUpload()
    }
  }, [onSubmit])

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
          <>
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
              <Typography style={{ fontSize: "15px", marginTop: "20px" }}>
                UPLOAD SOW
              </Typography>
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
                  onChange={(event) => setValue("sowSelectedFile", event?.target?.files)}
                  multiple
                />
              </Button>
              {selectedFile && (
                <Typography sx={{ marginTop: "10px", color: `${grey[600]}` }}>
                  Selected file: {selectedFile?.name} (
                  {(selectedFile?.size / 1024).toFixed(2)} KB)
                </Typography>
              )}
            </Box>
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
              <Typography style={{ fontSize: "15px", marginTop: "20px" }}>
                UPLOAD ARCHITECHTURE
              </Typography>
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
                  onChange={(event) => setValue("architectureSelectedFile", event?.target?.files)}
                  multiple
                />
              </Button>
              {architectureSelectedFile && (
                <Typography sx={{ marginTop: "10px", color: `${grey[600]}` }}>
                  Selected file: {architectureSelectedFile?.name} (
                  {(architectureSelectedFile?.size / 1024).toFixed(2)} KB)
                </Typography>
              )}
            </Box>
          </>
          :
          <>
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
              <Typography style={{ fontSize: "15px", marginTop: "20px", color: "red", fontFamily: "bold" }}>
                DOWNLOAD SOW
              </Typography>
              <Typography style={{ fontSize: "15px", marginTop: "20px" }}>
                Download the Uploaded SOW File here...
              </Typography>
              <FileDownloadIcon />
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                onClick={downloadFile}
                variant="contained">Download File</LoadingButton>
              {!isFileFound &&
                <>
                  <Typography style={{ fontSize: "15px", marginTop: "20px", color: "red" }}>
                    No File Found to Download
                  </Typography>
                  <FileDownloadOffIcon />
                </>
              }
            </Box>
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
              <Typography style={{ fontSize: "15px", marginTop: "20px", color: "red", fontFamily: "bold" }}>
                DOWNLOAD ARCHITECHTURE
              </Typography>
              <Typography style={{ fontSize: "15px", marginTop: "20px" }}>
                Download the Uploaded Architecture File here...
              </Typography>
              <FileDownloadIcon />
              <LoadingButton
                loading={archLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                onClick={downloadArchFile}
                variant="contained">Download File</LoadingButton>
              {!isArchFileFound &&
                <>
                  <Typography style={{ fontSize: "15px", marginTop: "20px", color: "red" }}>
                    No File Found to Download
                  </Typography>
                  <FileDownloadOffIcon />
                </>
              }
            </Box>
          </>
        }
        {/* Date Pickers Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            width: "30%",
            paddingRight: "90px",
            marginRight: "130px",
          }}
        >
          <Typography sx={{ fontSize: 14 }} variant="subtitle1">SOW Start Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* {startsowDate} {endsowDate} */}
            {viewProject && startsowDate}
            {!viewProject && <DatePicker
              value={startDate}
              // disabled={!disableButton}
              onChange={(newValue) => setValue("sowStartDate", newValue)}
              inputFormat="DD-MM-YYYY"
              format="DD-MM-YYYY"
              renderInput={(params) => <TextField {...params} />}
            />}
            <Typography sx={{ fontSize: 14 }} variant="subtitle1">SOW End Date</Typography>
            {viewProject && endsowDate}
            {!viewProject && <DatePicker
              value={endDate}
              minDate={startDate}
              // disabled={!disableButton}
              onChange={(newValue) => setValue("sowEndDate", newValue)}
              inputFormat="DD-MM-YYYY"
              format="DD-MM-YYYY"
              renderInput={(params) => <TextField {...params} />}
            />}
          </LocalizationProvider>
        </Box>
      </Box>
    </div>
  );
}
