import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Button,
  Snackbar,
  SnackbarContent,
  Switch,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { grey } from "@mui/material/colors";
import { Avatar } from "@mui/material";
import Section from "./Section";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionSix from "./SectionSix";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { DialogBox } from "../../components/molecules";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  fetchFilterData,
  fetchColumnData,
  columnValues,
  addNewProject,
  updateProject,
} from "../../modules/FilterApiCall";
import apiUrlConfig from "../../config/apiUrlConfig";
import { useUserStore } from "../../zustand";

const NewProject = () => {
  const [checked, setChecked] = React.useState(false);
  const location = useLocation();
  const row = location.state?.row;
  const onClick = location.state?.onClick;
  const projectName = row ? row["project_name"] : null;
  const accountName = row ? row["account_name"] : null;
  const { setValue, watch } = useForm({
    defaultValues: {
      open: false,
      openPlatFormReport: false,
      updatedValuesTwo: {},
      updatedValuesFour: {},
      updatedValuesThree: {},
      updatedValuesFive: {},
      updatedValuesSix: {},
      allSelectedValuesTwo: {},
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
      cybersecurityTechnologies: [],
      containerizationOrchestration: [],
      serverlessComputing: [],
      headlessCms: [],
      architectureMethodology: [],
      designPatterns: [],
      developmentMaturityAssessment: [],
      softwareCompositionAnalysis: [],
      apiTestingTools: [],
      behavioralTestingTools: [],
      deploymentMethodologies: [],
      cicdTools: [],
      alertingTools: [],
      dependencyAnalysis: [],
      buhValue: null,
      accountValue: null,
      ddValue: null,
      projectName: null,
      errorDailogBox: false,
      message: "",
      sowStartDate: null,
      sowEndDate: null,
      sowSelectedFile: null,
      architectureSelectedFile: null,
      onSubmit: false,
    },
  });
  const navigate = useNavigate();
  const { pmoUser } = useUserStore();

  const settersMap = {
    domains: (value) => setValue("domain", value),
    application_class: (value) => setValue("app", value),
    environment: (value) => setValue("env", value),
    cloud_technologies: (value) => setValue("cloudTechnologies", value),
    data_engineering_etl_mdm_tools: (value) =>
      setValue("dataEngineeringEtlMdmTools", value),
    mobile_cloud_computing: (value) => setValue("mobileCloudComputing", value),
    edge_computing: (value) => setValue("edgeComputing", value),
    enterprise_platforms: (value) => setValue("enterprisePlatforms", value),
    cms_applications: (value) => setValue("cmsApplications", value),
    relational_databases_sql: (value) =>
      setValue("relationalDatabasesSql", value),
    nosql_databases: (value) => setValue("noSqlDatabases", value),
    in_memory_databases: (value) => setValue("inMemoryDatabases", value),
    system_monitoring_performance_tools: (value) =>
      setValue("systemMonitoringPerformanceTools", value),
    ides: (value) => setValue("ides", value),
    version_control_system_vcs: (value) =>
      setValue("versionControlSystemVcs", value),
    frontend_development: (value) => setValue("frontendDevelopment", value),
    server_side_backend_frameworks: (value) =>
      setValue("serverSideBackendFrameworks", value),
    mobile_development: (value) => setValue("mobileDevelopment", value),
    full_stack_development: (value) => setValue("fullStackDevelopment", value),
    programming_languages: (value) => setValue("programmingLanguages", value),
    api_development_data_access_technologies: (value) =>
      setValue("apiDevelopmentDataAccessTechnologies", value),
    application_integration_tools: (value) =>
      setValue("applicationIntegrationTools", value),
    analytics_reporting: (value) => setValue("analyticsReporting", value),
    test_coverage: (value) => setValue("testCoverage", value),
    productivity_measurement: (value) =>
      setValue("productivityMeasurement", value),
    tracing: (value) => setValue("tracing", value),
    unit_testing_frameworks: (value) =>
      setValue("unitTestingFrameworks", value),
    functional_integration_testing: (value) =>
      setValue("functionalIntegrationTesting", value),
    performance_load_testing_tools: (value) =>
      setValue("performanceLoadTestingTools", value),
    manual_testing_management_tools: (value) =>
      setValue("manualTestingManagementTools", value),
    application_security_testing_tools: (value) =>
      setValue("applicationSecurityTestingTools", value),
    devops_infrastructure_as_code_iac: (value) =>
      setValue("devopsInfrastructureAsCodeIac", value),
    directory_services_identity_management: (value) =>
      setValue("directoryServicesIdentityManagement", value),
    code_quality_tools: (value) => setValue("codeQualityTools", value),
    ipaas_integration_platform_as_a_service: (value) =>
      setValue("ipaasIntegrationPlatformAsAService", value),
    ai_machine_learning_technologies: (value) =>
      setValue("aiMachineLearningTechnologies", value),
    user_feedback_analytics_tools: (value) =>
      setValue("userFeedbackAnalyticsTools", value),
    low_code_environments: (value) => setValue("lowCodeEnvironments", value),
    cybersecurity_technologies: (value) => setValue("cybersecurityTechnologies", value),
    containerization_orchestration: (value) => setValue("containerizationOrchestration", value),
    serverless_computing: (value) => setValue("serverlessComputing", value),
    headless_cms: (value) => setValue("headlessCms", value),
    architecture_methodology: (value) => setValue("architectureMethodology", value),
    design_patterns: (value) => setValue("designPatterns", value),
    development_maturity_assessment: (value) => setValue("developmentMaturityAssessment", value),
    software_composition_analysis: (value) => setValue("softwareCompositionAnalysis", value),
    api_testing_tools: (value) => setValue("apiTestingTools", value),
    behavioral_testing_tools: (value) => setValue("behavioralTestingTools", value),
    deployment_methodologies: (value) => setValue("deploymentMethodologies", value),
    cicd_tools: (value) => setValue("cicdTools", value),
    alerting_tools: (value) => setValue("alertingTools", value),
    dependency_analysis: (value) => setValue("dependencyAnalysis", value),
  };
  useEffect(() => {
    if (onClick) {
      setValue("accountValue", row["account_name"]);
      setValue("buhValue", row["buh_name"]);
      setValue("ddValue", row["dd_name"]);
      setValue("projectName", row["project_name"]);
      setValue("domainValue", row["domains"]);
      setValue("applicationValue", row["application_class"]);
      setChecked(row.status);
    }
  }, [onClick]);

  const handleClose = () => {
    setValue("open", false);
  };
  const handleSelectedValuesChangeSectionTwo = (selectedValues) => {
    setValue("allSelectedValuesTwo", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionTwo = (selectedValues) => {
    setValue("updatedValuesTwo", selectedValues);
  };
  const handleSelectedValuesChangeSectionThree = (selectedValues) => {
    setValue("allSelectedValues", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionThree = (selectedValues) => {
    setValue("updatedValuesThree", selectedValues);
  };
  const handleSelectedValuesChangeSectionFour = (selectedValues) => {
    setValue("allSelectedValuesFour", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionFour = (selectedValues) => {
    setValue("updatedValuesFour", selectedValues);
  };
  const handleSelectedValuesChangeSectionFive = (selectedValues) => {
    setValue("allSelectedValuesFive", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionFive = (selectedValues) => {
    setValue("updatedValuesFive", selectedValues);
  };
  const handleSelectedValuesChangeSectionSix = (selectedValues) => {
    setValue("allSelectedValuesSix", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionSix = (selectedValues) => {
    setValue("updatedValuesSix", selectedValues);
  };
  const handleOpenDialog = () => {
    const sectionTwoValues = watch("allSelectedValuesTwo");
    const requiredFields = [
      watch("buhValue"),
      watch("accountValue"),
      watch("ddValue"),
      watch("projectName") && watch("projectName").trim(),
      sectionTwoValues?.domainInput,
      sectionTwoValues?.applicationInput,
      watch("domainValue"),
      watch("applicationValue"),
    ];

    const fieldNames = {
      buhValue: "BUH",
      accountValue: "Account",
      ddValue: "DD",
      projectName: "Project Name",
      domainInput: "Domain",
      applicationInput: "Application",
    };

    const nullValues = requiredFields
      .map((field, index) =>
        field === null || field === "" || field === undefined
          ? Object.keys(fieldNames)[index]
          : ""
      )
      .filter(Boolean);

    const formattedNullValues = nullValues.map((field) => fieldNames[field]);

    setValue("errorDisplay", formattedNullValues);

    if (
      watch("buhValue") === null ||
      watch("accountValue") === null ||
      watch("ddValue") === null ||
      watch("projectName").trim() === "" ||
      watch("projectName").trim() === null ||
      !sectionTwoValues ||
      sectionTwoValues.domainInput === null ||
      sectionTwoValues.domainInput === undefined ||
      sectionTwoValues.applicationInput === null ||
      sectionTwoValues.applicationInput === undefined
    ) {
      setValue("errorDailogBox", true);
    } else {
      setValue("openDialog", true);
    }
  };

  const handleCloseDialog = () => {
    setValue("openDialog", false);
  };

  const handleConfirmSubmit = async () => {
    setValue("onSubmit", true);
    const response = await createNewProject();
    console.log("Form submitted!", response);
    if (response.id) {
      setValue(
        "message",
        `Your Project "${watch("projectName").trim()}" Created Successfully`
      );
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
  const typeOfDropdown = ["account_name", "buh_name", "dd_name"];

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
      watch("allSelectedValuesTwo"),
      watch("allSelectedValues"),
      watch("allSelectedValuesFour"),
      watch("allSelectedValuesFive"),
      watch("allSelectedValuesSix"),
      checked
    );
    return response;
  };

  const updateCurrentProject = async () => {
    const response = await updateProject(
      row.id,
      pmoUser,
      watch("accountValue"),
      watch("projectName").trim(),
      watch("buhValue"),
      watch("ddValue"),
      watch("updatedValuesTwo"),
      watch("updatedValuesFour"),
      watch("updatedValuesThree"),
      watch("updatedValuesFive"),
      watch("updatedValuesSix"),
      checked
    );
    if (response.project_id) {
      setValue(
        "message",
        `Your Project "${watch("projectName").trim()}" Updated Successfully`
      );
      setValue("open", true);
      setTimeout(() => {
        navigate("/PlatformProject");
      }, 1500);
    }
    setValue("openDialog", false);
    return response;
  };

  const errorMessage =
    `Please fill up these fields as they are mandotory: ${watch("errorDisplay")}`.replace(
      /,/g,
      ", "
    );

  const toggleChecked = (prev) => {
    setChecked(prev.target.checked);
  };

  return (
    <>
      <Snackbar
        open={watch("open")}
        autoHideDuration={8000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "white",
            color: "black",
          }}
          message={
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon sx={{ color: "green", marginRight: "8px" }} />
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
        <DialogTitle
          id="confirmation-dialog-title"
          sx={{ textAlign: "center" }}
        >
          {"Error Form Submission"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="confirmation-dialog-description"
            sx={{ color: "red" }}
          >
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setValue("errorDailogBox", false)}
            sx={{
              marginTop: "10px",
              marginRight: "260px",
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
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
        <DialogTitle sx={{ textAlign: "center", color: "#D94A56" }}>
          Cancel Alert
        </DialogTitle>
        <DialogContent sx={{ alignItems: "center", marginLeft: 8 }}>
          Are you sure you want to cancel adding this project?
        </DialogContent>
        <Box sx={{ alignItems: "center", marginLeft: 20 }}>
          <Button
            variant="outlined"
            sx={{
              color: `${grey[600]}`,
              borderColor: `${grey[400]}`,
              fontWeight: "bold",
              textTransform: "none",
              alignItems: "center",
              marginRight: "15px",
            }}
            onClick={() => setValue("openPlatFormReport", false)}
          >
            No, Continue
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#0E5FD9",
              alignItems: "center",
            }}
            onClick={() => goToPlatformPage()}
          >
            Yes, Cancel
          </Button>
        </Box>
      </DialogBox>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {!onClick ? (
          <Typography ml={1} variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            New Project
          </Typography>
        ) : (
          <Typography ml={1} variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Edit Project
          </Typography>
        )}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ marginRight: 30 }}
        >
          <FormControlLabel
            label={`${checked === true ? 'Active' : 'Inactive'} `}
            control={<Switch size="small" value={row?.status ? row?.status : checked} onChange={toggleChecked} />}
          />
          <Button
            variant="outlined"
            sx={{
              color: `${grey[600]}`,
              borderColor: `${grey[400]}`,
              fontWeight: "bold",
              textTransform: "none",
              alignItems: "center",
              marginRight: "15px",
            }}
            onClick={() => setValue("openPlatFormReport", true)}
          >
            Cancel
          </Button>
          {!onClick ? (
            <Button
              variant="contained"
              sx={{ textTransform: "none", backgroundColor: "#0E5FD9" }}
              onClick={handleOpenDialog}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ textTransform: "none", backgroundColor: "#0E5FD9" }}
              onClick={updateCurrentProject}
            >
              Update
            </Button>
          )}
        </Stack>
      </Stack>
      <Dialog
        open={watch("openDialog")}
        onClose={handleCloseDialog}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle
          id="confirmation-dialog-title"
          sx={{ textAlign: "center" }}
        >
          {"Confirm Submission"}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="confirmation-dialog-description">
            Are you sure you want to submit the project details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              color: `${grey[600]}`,
              borderColor: `${grey[400]}`,
              fontWeight: "bold",
              textTransform: "none",
              alignItems: "center",
              marginRight: "15px",
              marginBottom: "15px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            variant="contained"
            sx={{
              fontWeight: "bold",
              marginRight: "120px",
              textTransform: "none",
              backgroundColor: "#0E5FD9",
              marginBottom: "15px",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Accordion
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionDetails>
          <Section
            buhInput={watch("buhName")}
            accountInput={watch("accountName")}
            ddInput={watch("ddName")}
            setValue={setValue}
            buhValue={watch("buhValue")}
            ddValue={watch("ddValue")}
            accountValue={watch("accountValue")}
            projectName={watch("projectName")}
            viewProject={onClick}
            disableButton={!onClick}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box
            sx={{
              display: "flex",
              borderRadius: "5px",
              border: `1px solid ${grey[400]}`,
              padding: "10px",
              gap: 1,
              width: "100%",
              backgroundColor: `${grey[200]}`,
            }}
          >
            <Avatar sx={{ bgcolor: "grey", width: 30, height: 30 }}>
              <Typography variant="body" color="white">
                1
              </Typography>
            </Avatar>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "bold", color: `${grey[600]}` }}
            >
              Upload SOW
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionOne
            projectValue={projectName}
            accountValue={watch("accountValue")}
            accountName={accountName}
            projectName={watch("projectName")}
            apiUrl={apiUrl}
            viewProject={onClick}
            startDate={watch("sowStartDate")}
            endDate={watch("sowEndDate")}
            setValue={setValue}
            selectedFile={watch("sowSelectedFile")}
            architectureSelectedFile={watch("architectureSelectedFile")}
            onSubmit={watch("onSubmit")}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box
            sx={{
              display: "flex",
              borderRadius: "5px",
              border: `1px solid ${grey[400]}`,
              padding: "10px",
              gap: 1,
              width: "100%",
              backgroundColor: `${grey[200]}`,
            }}
          >
            <Avatar sx={{ bgcolor: "grey", width: 30, height: 30 }}>
              <Typography variant="body" color="white">
                2
              </Typography>
            </Avatar>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "bold", color: `${grey[600]}` }}
            >
              Domains and Application Class
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionTwo
            domainInput={watch("domain")}
            viewProject={onClick}
            applicationInput={watch("app")}
            row={row}
            onSelectedValuesChange={handleSelectedValuesChangeSectionTwo}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionTwo}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box
            sx={{
              display: "flex",
              borderRadius: "5px",
              border: `1px solid ${grey[400]}`,
              padding: "10px",
              gap: 1,
              width: "100%",
              backgroundColor: `${grey[200]}`,
            }}
          >
            <Avatar sx={{ bgcolor: "grey", width: 30, height: 30 }}>
              <Typography variant="body" color="white">
                3
              </Typography>
            </Avatar>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "bold", color: `${grey[600]}` }}
            >
              Environment, Infrastructure, System Related Info
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionThree
            viewProject={onClick}
            row={row}
            // disableButton={!onClick}
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
            systemMonitoringAndPerformance={watch(
              "systemMonitoringPerformanceTools"
            )}
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
            cybersecurityTechnologies={watch("cybersecurityTechnologies")}
            containerizationOrchestration={watch("containerizationOrchestration")}
            serverlessComputing={watch("serverlessComputing")}
            headlessCms={watch("headlessCms")}
            architectureMethodology={watch("architectureMethodology")}
            designPatterns={watch("designPatterns")}
            developmentMaturityAssessment={watch("developmentMaturityAssessment")}
            softwareCompositionAnalysis={watch("softwareCompositionAnalysis")}
            apiTestingTools={watch("apiTestingTools")}
            behavioralTestingTools={watch("behavioralTestingTools")}
            deploymentMethodologies={watch("deploymentMethodologies")}
            cicdTools={watch("cicdTools")}
            alertingTools={watch("alertingTools")}
            dependencyAnalysis={watch("dependencyAnalysis")}
            versionControlSystemVcs={watch("versionControlSystemVcs")}
            tracing={watch("tracing")}
            onSelectedValuesChange={handleSelectedValuesChangeSectionThree}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionThree}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box
            sx={{
              display: "flex",
              borderRadius: "5px",
              border: `1px solid ${grey[400]}`,
              padding: "10px",
              gap: 1,
              width: "100%",
              backgroundColor: `${grey[200]}`,
            }}
          >
            <Avatar sx={{ bgcolor: "grey", width: 30, height: 30 }}>
              <Typography variant="body" color="white">
                4
              </Typography>
            </Avatar>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "bold", color: `${grey[600]}` }}
            >
              QA & DevOps
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionFour
            viewProject={onClick}
            row={row}
            SelectManualTestingMgmt={watch("manualTestingManagementTools")}
            FunctionalandIntegration={watch("functionalIntegrationTesting")}
            PerformanceandLoadTest={watch("performanceLoadTestingTools")}
            ApplicationSecurityTesting={watch(
              "applicationSecurityTestingTools"
            )}
            devopsInfrastructureAsCodeIac={watch(
              "devopsInfrastructureAsCodeIac"
            )}
            onSelectedValuesChange={handleSelectedValuesChangeSectionFour}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionFour}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Box
            sx={{
              display: "flex",
              borderRadius: "5px",
              border: `1px solid ${grey[400]}`,
              padding: "10px",
              gap: 1,
              width: "100%",
              backgroundColor: `${grey[200]}`,
            }}
          >
            <Avatar sx={{ bgcolor: "grey", width: 30, height: 30 }}>
              <Typography variant="body" color="white">
                5
              </Typography>
            </Avatar>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "bold", color: `${grey[600]}` }}
            >
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
            onSelectedValuesChange={handleSelectedValuesChangeSectionFive}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionFive}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Box
            sx={{
              display: "flex",
              borderRadius: "5px",
              border: `1px solid ${grey[400]}`,
              padding: "10px",
              gap: 1,
              width: "100%",
              backgroundColor: `${grey[200]}`,
            }}
          >
            <Avatar sx={{ bgcolor: "grey", width: 30, height: 30 }}>
              <Typography variant="body" color="white">
                6
              </Typography>
            </Avatar>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "bold", color: `${grey[600]}` }}
            >
              GenAI
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionSix
            viewProject={onClick}
            row={row}
            aiAndMachineLearningTechnologies={watch(
              "aiMachineLearningTechnologies"
            )}
            onSelectedValuesChange={handleSelectedValuesChangeSectionSix}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionSix}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default NewProject;