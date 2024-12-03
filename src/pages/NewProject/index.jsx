import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, Button, Snackbar, SnackbarContent } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { grey } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import EmergencyIcon from '@mui/icons-material/Emergency';
import Section from "./Section";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionSix from "./SectionSix";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from "react";
import { DialogBox } from "../../components/molecules";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import { fetchFilterData, fetchColumnData, columnValues, addNewProject } from "../../modules/FilterApiCall"
import apiUrlConfig from "../../config/apiUrlConfig";
import { useUserStore } from "../../zustand";


const NewProject = () => {
  const location = useLocation();
  const row = location.state?.row;
  const onClick = location.state?.onClick;
  const {
    setValue,
    watch
  } = useForm({
    defaultValues: {
      open: false,
      openPlatFormReport: false,
      allSelectedValues: {},
      allSelectedValuesFour: {},
      allSelectedValuesFive: {},
      allSelectedValuesSix: {},
      accountName: [],
      buhName: [],
      ddName: [],
      loader: false,
      technologyData: [],
      domain: "",
      domainValue: null,
      applicationValue: null,
      app: [],
      openDialog: false,
      env: [],
      cloudTechnologies: [],
      dataEngineeringEtlMdmTools: [],
      mobileCloudComputing: [],
      edgeComputing: [],
      enterprisePlatforms: [],
      cmsApplications: [],
      relationalDatabasesSql: [],
      noSqlDatabases: [],
      inMemoryDatabases: [],
      systemMonitoringPerformanceTools: [],
      ides: [],
      versionControlSystemVcs: [],
      frontendDevelopment: [],
      serverSideBackendFrameworks: [],
      mobileDevelopment: [],
      fullStackDevelopment: [],
      programmingLanguages: [],
      apiDevelopmentDataAccessTechnologies: [],
      applicationIntegrationTools: [],
      analyticsReporting: [],
      testCoverage: [],
      productivityMeasurement: [],
      tracing: [],
      unitTestingFrameworks: [],
      functionalIntegrationTesting: [],
      performanceLoadTestingTools: [],
      manualTestingManagementTools: [],
      applicationSecurityTestingTools: [],
      devopsInfrastructureAsCodeIac: [],
      directoryServicesIdentityManagement: [],
      codeQualityTools: [],
      ipaasIntegrationPlatformAsAService: [],
      aiMachineLearningTechnologies: [],
      userFeedbackAnalyticsTools: [],
      lowCodeEnvironments: [],
      buhValue: null,
      accountValue: null,
      ddValue: null,
      projectName: null,
      errorDailogBox: false,
      message: '',
      sowStartDate: null,
      sowEndDate: null,
      sowSelectedFile: null,
    }
  });
  const navigate = useNavigate();
  const { pmoUser } = useUserStore();

  const settersMap = {
    "domains": (value) => setValue("domain", value),
    "application_class": (value) => setValue("app", value),
    "environment": (value) => setValue("env", value),
    "cloud_technologies": (value) => setValue("cloudTechnologies", value),
    "data_engineering_etl_mdm_tools": (value) => setValue("dataEngineeringEtlMdmTools", value),
    "mobile_cloud_computing": (value) => setValue("mobileCloudComputing", value),
    "edge_computing": (value) => setValue("edgeComputing", value),
    "enterprise_platforms": (value) => setValue("enterprisePlatforms", value),
    "cms_applications": (value) => setValue("cmsApplications", value),
    "relational_databases_sql": (value) => setValue("relationalDatabasesSql", value),
    "nosql_databases": (value) => setValue("noSqlDatabases", value),
    "in_memory_databases": (value) => setValue("inMemoryDatabases", value),
    "system_monitoring_performance_tools": (value) => setValue("systemMonitoringPerformanceTools", value),
    "ides": (value) => setValue("ides", value),
    "version_control_system_vcs": (value) => setValue("versionControlSystemVcs", value),
    "frontend_development": (value) => setValue("frontendDevelopment", value),
    "server_side_backend_frameworks": (value) => setValue("serverSideBackendFrameworks", value),
    "mobile_development": (value) => setValue("mobileDevelopment", value),
    "full_stack_development": (value) => setValue("fullStackDevelopment", value),
    "programming_languages": (value) => setValue("programmingLanguages", value),
    "api_development_data_access_technologies": (value) => setValue("apiDevelopmentDataAccessTechnologies", value),
    "application_integration_tools": (value) => setValue("applicationIntegrationTools", value),
    "analytics_reporting": (value) => setValue("analyticsReporting", value),
    "test_coverage": (value) => setValue("testCoverage", value),
    "productivity_measurement": (value) => setValue("productivityMeasurement", value),
    "tracing": (value) => setValue("tracing", value),
    "unit_testing_frameworks": (value) => setValue("unitTestingFrameworks", value),
    "functional_integration_testing": (value) => setValue("functionalIntegrationTesting", value),
    "performance_load_testing_tools": (value) => setValue("performanceLoadTestingTools", value),
    "manual_testing_management_tools": (value) => setValue("manualTestingManagementTools", value),
    "application_security_testing_tools": (value) => setValue("applicationSecurityTestingTools", value),
    "devops_infrastructure_as_code_iac": (value) => setValue("devopsInfrastructureAsCodeIac", value),
    "directory_services_identity_management": (value) => setValue("directoryServicesIdentityManagement", value),
    "code_quality_tools": (value) => setValue("codeQualityTools", value),
    "ipaas_integration_platform_as_a_service": (value) => setValue("ipaasIntegrationPlatformAsAService", value),
    "ai_machine_learning_technologies": (value) => setValue("aiMachineLearningTechnologies", value),
    "user_feedback_analytics_tools": (value) => setValue("userFeedbackAnalyticsTools", value),
    "low_code_environments": (value) => setValue("lowCodeEnvironments", value),
  };
  useEffect(() => {
    if (onClick) {
      console.log("Setting values", row);
      setValue("accountValue", row["account_name"]);
      setValue("buhValue", row["buh_name"]);
      setValue("ddValue", row["dd_name"]);
      setValue("projectName", row["project_name"])
      setValue("domainValue", row["domains"])
      setValue("applicationValue", row["application_class"])

    }
  }, [onClick]);

  const handleClose = () => {
    setValue("open", false);
  };

  const handleSelectedValuesChangeSectionThree = (selectedValues) => {
    setValue("allSelectedValues", selectedValues);
  };
  const handleSelectedValuesChangeSectionFour = (selectedValues) => {
    setValue("allSelectedValuesFour", selectedValues);
  };
  const handleSelectedValuesChangeSectionFive = (selectedValues) => {
    setValue("allSelectedValuesFive", selectedValues);
  };
  const handleSelectedValuesChangeSectionSix = (selectedValues) => {
    setValue("allSelectedValuesSix", selectedValues);
  };

  const handleOpenDialog = () => {
    const requiredFields = [
      watch("buhValue"), watch("accountValue"), watch("ddValue"), watch("projectName").trim(),
      watch("domainValue"), watch("applicationValue"), watch("sowStartDate"), watch("sowEndDate"), watch("sowSelectedFile")
    ];

    const fieldNames = {
      buhValue: "BUH",
      accountValue: "Account",
      ddValue: "DD",
      projectName: "Project Name",
      domainValue: "Domain",
      applicationValue: "Application",
      sowStartDate: "Upload SOW Start Date",
      sowEndDate: "Upload SOW End Date",
      sowSelectedFile: "Upload SOW Select File"
    };

    // Identify missing required fields
    const nullValues = requiredFields
      .map((field, index) => (((field === null) || (field === "")) ? Object.keys(fieldNames)[index] : ""))
      .filter(Boolean);

    // Map missing fields to their display names
    const formattedNullValues = nullValues.map(field => fieldNames[field]);

    // Set error display for missing fields
    setValue("errorDisplay", formattedNullValues);

    // Check if there are missing fields to determine dialog display
    if (watch("buhValue") === null || watch("accountValue") === null || watch("ddValue") === null || (watch("projectName").trim() === "") || (watch("projectName").trim() === null) || watch("domainValue") === null || watch("applicationValue") === null || watch("sowStartDate") === null || watch("sowEndDate") === null || watch("sowSelectedFile") === null) {
      setValue("errorDailogBox", true);
    } else {
      setValue("openDialog", true);
    }
  };

  const handleCloseDialog = () => {
    setValue("openDialog", false);
  };

  const handleConfirmSubmit = async () => {
    const response = await createNewProject();
    console.log("Form submitted!", response);
    if (response.id) {
      setValue("message", `Your Project "${watch("projectName").trim()}" Created Successfully`);
      setValue("open", true);
      setTimeout(() => {
        navigate("/PlatformProject");
      }, 1500);
    }
    setValue("openDialog", false);
  };

  const goToPlatformPage = () => {
    navigate("/PlatformProject");
  };
  const { apiUrl } = apiUrlConfig;
  const typeOfDropdown = [
    "account_name",
    "buh_name",
    "dd_name",
  ];

  useEffect(() => {
    const fetchData = async () => {
      await fetchFilterData(apiUrl, typeOfDropdown, setValue);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDropdownData = async () => {
      const responseData = await fetchColumnData(apiUrl, setValue);
      responseData.map(async (data) => {
        const result = await columnValues(apiUrl, data);
        if (settersMap[data]) {
          settersMap[data](result);
        }
      });
    };
    fetchDropdownData();
  }, []);
  const createNewProject = async () => {
    const response = await addNewProject(
      pmoUser,
      watch("accountValue"),
      watch("projectName").trim(),
      watch("buhValue"),
      watch("ddValue"),
      watch("domainValue"),
      watch("applicationValue"),
      watch("allSelectedValues"),
      watch("allSelectedValuesFour"),
      watch("allSelectedValuesFive"),
      watch("allSelectedValuesSix")
    );
    return response;
  };

  const errorMessage = `Please fill up these fields as they are mandotory: ${watch("errorDisplay")}`.replace(/,/g, ", ")
  return (
    <>
      <Snackbar
        open={watch("open")}
        autoHideDuration={8000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "white",
            color: "black",
          }}
          message={
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ color: 'green', marginRight: '8px' }} />
                Success
              </Box>
              <Box>{watch("message")}</Box>
            </Box>

          }
        />
      </Snackbar>

      <Dialog
        open={watch("errorDailogBox")}
        onClose={() => setValue("errorDailogBox", false)}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title" sx={{ textAlign: "center" }}>{"Error Form Submission"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description"
            sx={{ color: "red" }}>
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setValue("errorDailogBox", false)} sx={{
            marginTop: "10px",
            marginRight: "260px"
          }} color="primary" variant="contained" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <DialogBox
        size="sm"
        actions={true}
        buttonAlignment="center"
        openDialog={watch("openPlatFormReport")}
        closeDialog={() => setValue("openPlatFormReport", false)}
      >
        <DialogTitle sx={{ textAlign: "center", color: "#D94A56" }}>Cancel Alert</DialogTitle>
        <DialogContent sx={{ alignItems: "center", marginLeft: 8 }}>Are you sure you want to cancel adding this project?</DialogContent>
        <Box sx={{ alignItems: "center", marginLeft: 20 }}>
          <Button
            variant="outlined"
            sx={{
              color: `${grey[600]}`,
              borderColor: `${grey[400]}`,
              fontWeight: "bold",
              textTransform: "none",
              alignItems: "center",
              marginRight: "15px"
            }}
            onClick={() => setValue("openPlatFormReport", false)}

          >
            No, Continue
          </Button>
          <Button
            variant="contained"

            sx={{ textTransform: "none", backgroundColor: "#0E5FD9", alignItems: "center" }}
            onClick={() => goToPlatformPage()}
          >
            Yes, Cancel
          </Button>
        </Box>


      </DialogBox>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {!onClick ?
          <Typography ml={1} variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            New Project
          </Typography>
          : <Typography ml={1} variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            View Project
          </Typography>}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginRight: 30 }}>
          <Button
            variant="outlined"
            sx={{
              color: `${grey[600]}`,
              borderColor: `${grey[400]}`,
              fontWeight: "bold",
              textTransform: "none",
              alignItems: "center",
              marginRight: "15px"
            }}
            onClick={() => setValue("openPlatFormReport", true)}

          >
            Cancel
          </Button>
          {!onClick &&
            <Button
              variant="contained"
              sx={{ textTransform: "none", backgroundColor: "#0E5FD9" }}
              onClick={handleOpenDialog}
            >
              Submit
            </Button>}
        </Stack>
      </Stack>
      <Dialog
        open={watch("openDialog")}
        onClose={handleCloseDialog}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title" sx={{ textAlign: "center", }}>{"Confirm Submission"}</DialogTitle>
        <DialogContent sx={{ textAlign: "center", }}>
          <DialogContentText id="confirmation-dialog-description">
            Are you sure you want to submit the project details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined" sx={{
            color: `${grey[600]}`,
            borderColor: `${grey[400]}`,
            fontWeight: "bold",
            textTransform: "none",
            alignItems: "center",
            marginRight: "15px",
            marginBottom: "15px"
          }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} variant="contained" sx={{
            fontWeight: "bold",
            marginRight: "120px",
            textTransform: "none",
            backgroundColor: "#0E5FD9",
            marginBottom: "15px"
          }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>


      <Accordion sx={{
        boxShadow: 'none', // Remove shadow
        '&:before': {
          display: 'none', // Remove divider line between sections
        }
      }}>
        <AccordionDetails>
          <Section buhInput={watch("buhName")}
            accountInput={watch("accountName")}
            ddInput={watch("ddName")}
            setValue={setValue}
            buhValue={watch("buhValue")} ddValue={watch("ddValue")} accountValue={watch("accountValue")} projectName={watch("projectName")}
            viewProject={onClick} />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={{
        boxShadow: 'none', // Remove shadow
        '&:before': {
          display: 'none', // Remove divider line between sections
        }
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ display: 'flex', borderRadius: '5px', border: `1px solid ${grey[400]}`, padding: '10px', gap: 1, width: "100%", backgroundColor: `${grey[200]}` }}>
            <Avatar sx={{ bgcolor: 'grey', width: 30, height: 30 }}>
              <Typography variant="body" color="white">1</Typography>
            </Avatar>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: `${grey[600]}` }}>
              <EmergencyIcon style={{ fontSize: "small", color: "red" }} />
              Upload SOW
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionOne
            startDate={watch("sowStartDate")}
            endDate={watch("sowEndDate")}
            setValue={setValue}
            selectedFile={watch("sowSelectedFile")}
          />
        </AccordionDetails>
      </Accordion>
      {/* Section Two */}
      <Accordion defaultExpanded sx={{
        boxShadow: 'none', // Remove shadow
        '&:before': {
          display: 'none', // Remove divider line between sections
        }
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ display: 'flex', borderRadius: '5px', border: `1px solid ${grey[400]}`, padding: '10px', gap: 1, width: "100%", backgroundColor: `${grey[200]}` }}>
            <Avatar sx={{ bgcolor: 'grey', width: 30, height: 30 }}>
              <Typography variant="body" color="white">2</Typography>
            </Avatar>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: `${grey[600]}` }}>
              Domains and Application Class
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionTwo
            domainInput={watch("domain")}
            applicationInput={watch("app")}
            domainValue={watch("domainValue")}
            applicationValue={watch("applicationValue")}
            setValue={setValue}
          />
        </AccordionDetails>
      </Accordion>
      {/* </Accordion> */}
      <Accordion defaultExpanded sx={{
        boxShadow: 'none', // Remove shadow
        '&:before': {
          display: 'none', // Remove divider line between sections
        }
      }}>
        {/* Section Three */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {/* <Typography>Expanded by default</Typography> */}
          <Box sx={{ display: 'flex', borderRadius: '5px', border: `1px solid ${grey[400]}`, padding: '10px', gap: 1, width: "100%", backgroundColor: `${grey[200]}` }}>
            <Avatar sx={{ bgcolor: 'grey', width: 30, height: 30 }}>
              <Typography variant="body" color="white">3</Typography>
            </Avatar>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: `${grey[600]}` }}>
              {/* <EmergencyIcon style={{ fontSize: "small", color: "red" }} /> */}
              Environment, Infrastructure, System Related Info
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionThree
            viewProject={onClick}
            row={row}
            environmentInput={watch("env")}
            cloudTechnologies={watch("cloudTechnologies")}
            enterprisePlatforms={watch("enterprisePlatforms")}
            etlAndMdmTools={watch("dataEngineeringEtlMdmTools")}
            devops={watch("devopsInfrastructureAsCodeIac")}
            lowCodeEnv={watch("lowCodeEnvironments")}
            vcs={watch("versionControlSystemVcs")}
            edgeComputing={watch("edgeComputing")}
            relationalDb={watch("relationalDatabasesSql")}
            nosqlDb={watch("noSqlDatabases")}
            inMemoryDbs={watch("inMemoryDatabases")}
            mobileCloudComputing={watch("mobileCloudComputing")}
            systemMonitoringAndPerformance={watch("systemMonitoringPerformanceTools")}
            directoryServices={watch("directoryServicesIdentityManagement")}
            ides={watch("ides")}
            cmsApp={watch("cmsApplications")}
            iPaas={watch("ipaasIntegrationPlatformAsAService")}
            frontendDevelopment={watch("frontendDevelopment")}
            serverSide={watch("serverSideBackendFrameworks")}
            fullStack={watch("fullStackDevelopment")}
            mobileDevelopment={watch("mobileDevelopment")}
            apiDevelopment={watch("apiDevelopmentDataAccessTechnologies")}
            applicationIntegrationTools={watch("applicationIntegrationTools")}
            unitTestingFrameworks={watch("unitTestingFrameworks")}
            programmingLanguages={watch("programmingLanguages")}
            codeQualityTools={watch("codeQualityTools")}
            testCoverage={watch("testCoverage")}
            productivityMeasurement={watch("productivityMeasurement")}
            tracing={watch("tracing")}
            onSelectedValuesChange={handleSelectedValuesChangeSectionThree}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={{
        boxShadow: 'none', // Remove shadow
        '&:before': {
          display: 'none', // Remove divider line between sections
        }
      }}>
        {/* Section Four */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ display: 'flex', borderRadius: '5px', border: `1px solid ${grey[400]}`, padding: '10px', gap: 1, width: "100%", backgroundColor: `${grey[200]}` }}>
            <Avatar sx={{ bgcolor: 'grey', width: 30, height: 30 }}>
              <Typography variant="body" color="white">4</Typography>
            </Avatar>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: `${grey[600]}` }}>
              {/* <EmergencyIcon style={{ fontSize: "small", color: "red" }} /> */}
              QA & DevOps
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionFour
            // SelectManualTestingMgmt={SelectManualTestingMgmt}
            // FunctionalandIntegration={FunctionalandIntegration}
            // PerformanceandLoadTest={PerformanceandLoadTest}
            // ApplicationSecurityTesting={ApplicationSecurityTesting}
            viewProject={onClick}
            row={row}
            SelectManualTestingMgmt={watch("manualTestingManagementTools")}
            FunctionalandIntegration={watch("functionalIntegrationTesting")}
            PerformanceandLoadTest={watch("performanceLoadTestingTools")}
            ApplicationSecurityTesting={watch("applicationSecurityTestingTools")}
            devopsInfrastructureAsCodeIac={watch("devopsInfrastructureAsCodeIac")}
            onSelectedValuesChange={handleSelectedValuesChangeSectionFour}
          />
        </AccordionDetails>
      </Accordion>
      {/* Section Five */}
      <Accordion defaultExpanded sx={{
        boxShadow: 'none', // Remove shadow
        '&:before': {
          display: 'none', // Remove divider line between sections
        }
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Box sx={{ display: 'flex', borderRadius: '5px', border: `1px solid ${grey[400]}`, padding: '10px', gap: 1, width: "100%", backgroundColor: `${grey[200]}` }}>
            <Avatar sx={{ bgcolor: 'grey', width: 30, height: 30 }}>
              <Typography variant="body" color="white">5</Typography>
            </Avatar>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: `${grey[600]}` }}>
              {/* <EmergencyIcon style={{ fontSize: "small", color: "red" }} /> */}
              BI and Marketing
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionFive
            viewProject={onClick}
            row={row}
            AnalyticsReporting={watch("analyticsReporting")}
            SelectUserFeedbackandAnalytics={watch("userFeedbackAnalyticsTools")}
            onSelectedValuesChange={handleSelectedValuesChangeSectionFive} />
        </AccordionDetails>
      </Accordion>
      {/* Section Six */}
      <Accordion defaultExpanded sx={{
        boxShadow: 'none', // Remove shadow
        '&:before': {
          display: 'none', // Remove divider line between sections
        }
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Box sx={{ display: 'flex', borderRadius: '5px', border: `1px solid ${grey[400]}`, padding: '10px', gap: 1, width: "100%", backgroundColor: `${grey[200]}` }}>
            <Avatar sx={{ bgcolor: 'grey', width: 30, height: 30 }}>
              <Typography variant="body" color="white">6</Typography>
            </Avatar>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: `${grey[600]}` }}>
              {/* <EmergencyIcon style={{ fontSize: "small", color: "red" }} /> */}
              AI and Machine Learning Technologies
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionSix
            viewProject={onClick}
            row={row}
            aiAndMachineLearningTechnologies={watch("aiMachineLearningTechnologies")}
            onSelectedValuesChange={handleSelectedValuesChangeSectionSix}
          />
        </AccordionDetails>
      </Accordion>




    </>
  );
};

export default NewProject;
