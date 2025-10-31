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
import SectionSow from "./SectionSow";
import SectionClasses from "./SectionClasses";
import SectionEnv from "./SectionEnv";
import SectionDevelopment from "./SectionDevelopment";
import SectionTools from "./SectionTools";
import SectionQa from "./SectionQa";
import SectionDevops from "./SectionDevops";
import SectionBi from "./SectionBi";
import SectionGenai from "./SectionGenai";
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
import { fetchRecords } from "../../components/apiServices";
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
      updatedValuesThree: {},
      updatedValuesDevelopment: {},
      updatedValuesTools: {},
      updatedValuesQa: {},
      updatedValuesFour: {},
      updatedValuesFive: {},
      updatedValuesSix: {},
      allSelectedValuesTwo: {},
      allSelectedValues: {},
      allSelectedValuesDevelopment: {},
      allSelectedValuesTools: {},
      allSelectedValuesQa: {},
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
      errorDialogBox: false,
      message: "",
      sowStartDate: null,
      sowEndDate: null,
      sowSelectedFile: null,
      architectureSelectedFile: null,
      onSubmit: false,
      sowFilePath: "",
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
    if (onClick && row) {
      console.log('NewProject useEffect - row.domains:', row["domains"]);
      console.log('NewProject useEffect - row.application_class:', row["application_class"]);

      // Helper to convert comma-separated strings to arrays and remove duplicates
      const parseValue = (value) => {
        if (!value || value === '') return [];
        if (Array.isArray(value)) {
          // Remove duplicates from array
          return [...new Set(value)].filter(item => item && item !== '');
        }
        // Split by comma, trim, filter empty, and remove duplicates
        const items = value.split(',').map(item => item.trim()).filter(item => item !== '');
        return [...new Set(items)];
      };

      // Set basic project info
      setValue("accountValue", row["account_name"]);
      setValue("buhValue", row["buh_name"]);
      setValue("ddValue", row["dd_name"]);
      setValue("projectName", row["project_name"]);

      // Set domain and application class for both storage and display
      const domains = parseValue(row["domains"]);
      const appClass = parseValue(row["application_class"]);
      console.log('NewProject useEffect - parsed domains:', domains);
      console.log('NewProject useEffect - parsed appClass:', appClass);

      setValue("domainValue", domains);
      setValue("applicationValue", appClass);
      setValue("domain", domains);  // For dropdown display
      setValue("app", appClass);     // For dropdown display
      setValue("sowFilePath", row["sow_file_path"] || "");
      setChecked(row.status);

      // Populate all technology fields using settersMap
      Object.keys(settersMap).forEach((fieldName) => {
        if (row[fieldName] !== undefined && row[fieldName] !== null) {
          settersMap[fieldName](parseValue(row[fieldName]));
        }
      });
    }
  }, [onClick, row]);

  const handleClose = () => {
    setValue("open", false);
  };
  const handleSelectedValuesChangeSectionClasses = (selectedValues) => {
    setValue("allSelectedValuesTwo", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionClasses = (selectedValues) => {
    setValue("updatedValuesTwo", selectedValues);
  };
  const handleSelectedValuesChangeSectionEnv = (selectedValues) => {
    setValue("allSelectedValues", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionEnv = (selectedValues) => {
    setValue("updatedValuesThree", selectedValues);
  };
  const handleSelectedValuesChangeSectionDevops = (selectedValues) => {
    setValue("allSelectedValuesFour", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionDevops = (selectedValues) => {
    console.log('=== DEVOPS HANDLER CALLED ===');
    console.log('Received selectedValues:', selectedValues);
    setValue("updatedValuesFour", selectedValues);
    console.log('Set updatedValuesFour to:', selectedValues);
  };
  const handleSelectedValuesChangeSectionBi = (selectedValues) => {
    setValue("allSelectedValuesFive", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionBi = (selectedValues) => {
    setValue("updatedValuesFive", selectedValues);
  };
  const handleSelectedValuesChangeSectionDevelopment = (selectedValues) => {
    setValue("allSelectedValuesDevelopment", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionDevelopment = (selectedValues) => {
    setValue("updatedValuesDevelopment", selectedValues);
  };
  const handleSelectedValuesChangeSectionTools = (selectedValues) => {
    setValue("allSelectedValuesTools", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionTools = (selectedValues) => {
    setValue("updatedValuesTools", selectedValues);
  };
  const handleSelectedValuesChangeSectionQa = (selectedValues) => {
    setValue("allSelectedValuesQa", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionQa = (selectedValues) => {
    setValue("updatedValuesQa", selectedValues);
  };
  const handleSelectedValuesChangeSectionGenai = (selectedValues) => {
    setValue("allSelectedValuesSix", selectedValues);
  };
  const handleSelectedViewValuesChangeSectionGenai = (selectedValues) => {
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
      setValue("errorDialogBox", true);
    } else {
      setValue("openDialog", true);
    }
  };

  const handleCloseDialog = () => {
    setValue("openDialog", false);
  };

  const handleConfirmSubmit = async () => {
    // Prevent multiple submissions
    if (watch("onSubmit")) {
      return;
    }

    setValue("onSubmit", true);
    setValue("openDialog", false);

    try {
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
    } catch (error) {
      console.error("Submission failed:", error);
      setValue("onSubmit", false);
    }
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

  // helper function to sanitize form data
  const sanitizeFormData = (data) => {
    const sanitized = {};
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        sanitized[key] = value.length === 0 ? null : value;
        if (Array.isArray(value[0]) && value[0].length === 0) {
          sanitized[key] = null;
        }
      } else {
        sanitized[key] = value;
      }
    });
    return sanitized;
  };

  const createNewProject = async () => {
    const response = await addNewProject(
      pmoUser,
      watch("accountValue"),
      watch("projectName").trim(),
      watch("buhValue"),
      watch("ddValue"),
      watch("allSelectedValuesTwo"),
      watch("allSelectedValues"),
      watch("allSelectedValuesDevelopment"),
      watch("allSelectedValuesTools"),
      watch("allSelectedValuesQa"),
      watch("allSelectedValuesFour"),
      watch("allSelectedValuesFive"),
      watch("allSelectedValuesSix"),
      checked,
      watch("sowFilePath")
    );
    return response;
  };

  const updateCurrentProject = async () => {
    try {
      // Get current values from the form sections
      const sectionTwoValues = watch("updatedValuesTwo");
      const sectionThreeValues = watch("updatedValuesThree");
      const sectionDevelopmentValues = watch("updatedValuesDevelopment");
      const sectionToolsValues = watch("updatedValuesTools");
      const sectionQaValues = watch("updatedValuesQa");
      const sectionFourValues = watch("updatedValuesFour");
      const sectionFiveValues = watch("updatedValuesFive");
      const sectionSixValues = watch("updatedValuesSix");

      // Log all section values for debugging
      console.log('=== UPDATE PROJECT DEBUG ===');
      console.log('Environment Section (sectionThreeValues):', sectionThreeValues);
      console.log('  - environment:', sectionThreeValues?.environment);
      console.log('  - cloud_technologies:', sectionThreeValues?.cloud_technologies);
      console.log('Development Section (sectionDevelopmentValues):', sectionDevelopmentValues);
      console.log('Tools Section (sectionToolsValues):', sectionToolsValues);
      console.log('QA Section (sectionQaValues):', sectionQaValues);
      console.log('DevOps Section (sectionFourValues):', sectionFourValues);
      console.log('BI Section (sectionFiveValues):', sectionFiveValues);
      console.log('GenAI Section (sectionSixValues):', sectionSixValues);

      // Validate required fields
      const requiredFields = {
        accountValue: "Account",
        projectName: "Project Name",
        buhValue: "BUH",
        ddValue: "DD"
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([key]) => !watch(key) || (typeof watch(key) === 'string' && !watch(key).trim()))
        .map(([, label]) => label);

      // Check if domains and application_class are provided
      // For update mode, check both updatedValuesTwo and the initial row values
      const hasDomain = sectionTwoValues?.domainInput || watch("domainValue") || row?.domains;
      const hasApplication = sectionTwoValues?.applicationInput || watch("applicationValue") || row?.application_class;

      if (!hasDomain) {
        missingFields.push("Domain");
      }
      if (!hasApplication) {
        missingFields.push("Application Class");
      }

      if (missingFields.length > 0) {
        setValue("errorDisplay", missingFields);
        setValue("errorDialogBox", true);
        return;
      }

      // Prepare section two values - use updated values if present, otherwise keep original
      const finalSectionTwoValues = {
        domainInput: sectionTwoValues?.domainInput !== undefined ? sectionTwoValues.domainInput : (watch("domainValue") || row?.domains),
        applicationInput: sectionTwoValues?.applicationInput !== undefined ? sectionTwoValues.applicationInput : (watch("applicationValue") || row?.application_class)
      };

      // Call the updateProject API function
      const response = await updateProject(
        row.id,
        pmoUser,
        watch("accountValue"),
        watch("projectName").trim(),
        watch("buhValue"),
        watch("ddValue"),
        finalSectionTwoValues,
        sectionThreeValues,
        sectionDevelopmentValues,
        sectionToolsValues,
        sectionQaValues,
        sectionFourValues,
        sectionFiveValues,
        sectionSixValues,
        checked,
        watch("sowFilePath")
      );

      if (response && response.project_id) {
        setValue("message", `Your Project "${watch("projectName").trim()}" Updated Successfully`);
        setValue("open", true);
        setTimeout(() => {
          navigate("/PlatformProject");
        }, 1500);
      }
    } catch (error) {
      console.error("Update failed:", error);
      setValue("message", error.message || "Failed to update project. Please try again.");
      setValue("open", true);
    }
  };

  const errorMessage =
    `Please fill up these fields as they are mandatory: ${watch("errorDisplay")}`.replace(
      /,/g,
      ", "
    );

  const toggleChecked = (prev) => {
    setChecked(prev.target.checked);
  };

  const ensureArray = (value) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
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
        open={watch("errorDialogBox")}
        onClose={() => setValue("errorDialogBox", false)}
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
            onClick={() => setValue("errorDialogBox", false)}
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
            disabled={watch("onSubmit")}
            sx={{
              fontWeight: "bold",
              marginRight: "120px",
              textTransform: "none",
              backgroundColor: "#0E5FD9",
              marginBottom: "15px",
            }}
          >
            {watch("onSubmit") ? "Submitting..." : "Confirm"}
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
          <SectionSow
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
            sowFilePath={watch("sowFilePath")}
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
          <SectionClasses
            domainInput={watch("domain")}
            viewProject={onClick}
            applicationInput={watch("app")}
            row={row}
            onSelectedValuesChange={handleSelectedValuesChangeSectionClasses}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionClasses}
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
          <SectionEnv
            viewProject={onClick}
            row={row}
            environmentInput={ensureArray(watch("env"))}
            cloudTechnologies={ensureArray(watch("cloudTechnologies"))}
            enterprisePlatforms={ensureArray(watch("enterprisePlatforms"))}
            etlAndMdmTools={ensureArray(watch("dataEngineeringEtlMdmTools"))}
            devops={ensureArray(watch("devopsInfrastructureAsCodeIac"))}
            lowCodeEnv={ensureArray(watch("lowCodeEnvironments"))}
            vcs={ensureArray(watch("versionControlSystemVcs"))}
            edgeComputing={ensureArray(watch("edgeComputing"))}
            relationalDb={ensureArray(watch("relationalDatabasesSql"))}
            nosqlDb={ensureArray(watch("noSqlDatabases"))}
            inMemoryDbs={ensureArray(watch("inMemoryDatabases"))}
            mobileCloudComputing={ensureArray(watch("mobileCloudComputing"))}
            systemMonitoringAndPerformance={ensureArray(watch(
              "systemMonitoringPerformanceTools"
            ))}
            directoryServices={ensureArray(watch("directoryServicesIdentityManagement"))}
            ides={ensureArray(watch("ides"))}
            cmsApp={ensureArray(watch("cmsApplications"))}
            iPaas={ensureArray(watch("ipaasIntegrationPlatformAsAService"))}
            frontendDevelopment={ensureArray(watch("frontendDevelopment"))}
            serverSide={ensureArray(watch("serverSideBackendFrameworks"))}
            fullStack={ensureArray(watch("fullStackDevelopment"))}
            mobileDevelopment={ensureArray(watch("mobileDevelopment"))}
            apiDevelopment={ensureArray(watch("apiDevelopmentDataAccessTechnologies"))}
            applicationIntegrationTools={ensureArray(watch("applicationIntegrationTools"))}
            unitTestingFrameworks={ensureArray(watch("unitTestingFrameworks"))}
            programmingLanguages={ensureArray(watch("programmingLanguages"))}
            codeQualityTools={ensureArray(watch("codeQualityTools"))}
            testCoverage={ensureArray(watch("testCoverage"))}
            productivityMeasurement={ensureArray(watch("productivityMeasurement"))}
            cybersecurityTechnologies={ensureArray(watch("cybersecurityTechnologies"))}
            containerizationOrchestration={ensureArray(watch("containerizationOrchestration"))}
            serverlessComputing={ensureArray(watch("serverlessComputing"))}
            headlessCms={ensureArray(watch("headlessCms"))}
            architectureMethodology={ensureArray(watch("architectureMethodology"))}
            designPatterns={ensureArray(watch("designPatterns"))}
            developmentMaturityAssessment={ensureArray(watch("developmentMaturityAssessment"))}
            softwareCompositionAnalysis={ensureArray(watch("softwareCompositionAnalysis"))}
            apiTestingTools={ensureArray(watch("apiTestingTools"))}
            behavioralTestingTools={ensureArray(watch("behavioralTestingTools"))}
            deploymentMethodologies={ensureArray(watch("deploymentMethodologies"))}
            cicdTools={ensureArray(watch("cicdTools"))}
            alertingTools={ensureArray(watch("alertingTools"))}
            dependencyAnalysis={ensureArray(watch("dependencyAnalysis"))}
            versionControlSystemVcs={ensureArray(watch("versionControlSystemVcs"))}
            tracing={ensureArray(watch("tracing"))}
            onSelectedValuesChange={handleSelectedValuesChangeSectionEnv}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionEnv}
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
          aria-controls="panel4-content"
          id="panel4-header"
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
              Development
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionDevelopment
            viewProject={onClick}
            row={row}
            onSelectedValuesChange={handleSelectedValuesChangeSectionDevelopment}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionDevelopment}
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
          aria-controls="panel5-content"
          id="panel5-header"
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
              Tools
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionTools
            viewProject={onClick}
            row={row}
            onSelectedValuesChange={handleSelectedValuesChangeSectionTools}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionTools}
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
          aria-controls="panel6-content"
          id="panel6-header"
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
              QA Testing
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionQa
            viewProject={onClick}
            row={row}
            onSelectedValuesChange={handleSelectedValuesChangeSectionQa}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionQa}
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
          aria-controls="panel7-content"
          id="panel7-header"
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
                7
              </Typography>
            </Avatar>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "bold", color: `${grey[600]}` }}
            >
              DevOps
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionDevops
            viewProject={onClick}
            row={row}
            onSelectedValuesChange={handleSelectedValuesChangeSectionDevops}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionDevops}
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
          aria-controls="panel7-content"
          id="panel7-header"
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
                8
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
          <SectionBi
            viewProject={onClick}
            row={row}
            AnalyticsReporting={ensureArray(watch("analyticsReporting"))}
            SelectUserFeedbackandAnalytics={ensureArray(watch("userFeedbackAnalyticsTools"))}
            onSelectedValuesChange={handleSelectedValuesChangeSectionBi}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionBi}
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
          aria-controls="panel8-content"
          id="panel8-header"
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
                9
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
          <SectionGenai
            viewProject={onClick}
            row={row}
            aiAndMachineLearningTechnologies={watch(
              "aiMachineLearningTechnologies"
            )}
            onSelectedValuesChange={handleSelectedValuesChangeSectionGenai}
            onSelectedViewValuesChange={handleSelectedViewValuesChangeSectionGenai}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default NewProject;