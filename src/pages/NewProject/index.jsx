import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, Button } from "@mui/material";
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
import { useState, useEffect } from "react";
import { DialogBox } from "../../components/molecules";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { fetchFilterData, fetchColumnData, columnValues, addNewProject } from "../../modules/FilterApiCall"
import apiUrlConfig from "../../config/apiUrlConfig";

const NewProject = () => {
  const [openPlatFormReport, setPlatFormReport] = useState(false);
  const [allSelectedValues, setAllSelectedValues] = useState({});
  const [allSelectedValuesFour, setAllSelectedValuesFour] = useState({})
  const [allSelectedValuesFive, setAllSelectedValuesFive] = useState({})
  const [allSelectedValuesSix, setAllSelectedValuesSix] = useState({})
  const [accountName, setAccountName] = useState([]);
  const [buhName, setBuhName] = useState([]);
  const [ddName, setDdName] = useState([]);
  const [loader, setLoader] = useState(false);
  const [technologyData, setTechnologyData] = useState([]);
  const [domain, setDomain] = useState()
  const [domainValue, selectDomainValue] = React.useState(null);
  const [applicationValue, selectApplicationValue] = React.useState(null);
  const [app, setApp] = useState([]);
  const [env, setEnv] = useState([]);
  const [cloudTechnologies, setCloudTechnologies] = useState([]);
  const [dataEngineeringEtlMdmTools, setDataEngineeringEtlMdmTools] = useState([]);
  const [mobileCloudComputing, setMobileCloudComputing] = useState([]);
  const [edgeComputing, setEdgeComputing] = useState([]);
  const [enterprisePlatforms, setEnterprisePlatforms] = useState([]);
  const [cmsApplications, setCmsApplications] = useState([]);
  const [relationalDatabasesSql, setRelationalDatabasesSql] = useState([]);
  const [noSqlDatabases, setNoSqlDatabases] = useState([]);
  const [inMemoryDatabases, setInMemoryDatabases] = useState([]);
  const [systemMonitoringPerformanceTools, setSystemMonitoringPerformanceTools] = useState([]);
  const [ides, setIdes] = useState([]);
  const [versionControlSystemVcs, setVersionControlSystemVcs] = useState([]);
  const [frontendDevelopment, setFrontendDevelopment] = useState([]);
  const [serverSideBackendFrameworks, setServerSideBackendFrameworks] = useState([]);
  const [mobileDevelopment, setMobileDevelopment] = useState([]);
  const [fullStackDevelopment, setFullStackDevelopment] = useState([]);
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [apiDevelopmentDataAccessTechnologies, setApiDevelopmentDataAccessTechnologies] = useState([]);
  const [applicationIntegrationTools, setApplicationIntegrationTools] = useState([]);
  const [analyticsReporting, setAnalyticsReporting] = useState([]);
  const [testCoverage, setTestCoverage] = useState([]);
  const [productivityMeasurement, setProductivityMeasurement] = useState([]);
  const [tracing, setTracing] = useState([]);
  const [unitTestingFrameworks, setUnitTestingFrameworks] = useState([]);
  const [functionalIntegrationTesting, setFunctionalIntegrationTesting] = useState([]);
  const [performanceLoadTestingTools, setPerformanceLoadTestingTools] = useState([]);
  const [manualTestingManagementTools, setManualTestingManagementTools] = useState([]);
  const [applicationSecurityTestingTools, setApplicationSecurityTestingTools] = useState([]);
  const [devopsInfrastructureAsCodeIac, setDevopsInfrastructureAsCodeIac] = useState([]);
  const [directoryServicesIdentityManagement, setDirectoryServicesIdentityManagement] = useState([]);
  const [codeQualityTools, setCodeQualityTools] = useState([]);
  const [ipaasIntegrationPlatformAsAService, setIpaasIntegrationPlatformAsAService] = useState([]);
  const [aiMachineLearningTechnologies, setAiMachineLearningTechnologies] = useState([]);
  const [userFeedbackAnalyticsTools, setUserFeedbackAnalyticsTools] = useState([]);
  const [lowCodeEnvironments, setLowCodeEnvironments] = useState([]);
  const [buhValue, selectBuhValue] = React.useState(null);
  const [accountValue, selectAccountValue] = React.useState(null);
  const [ddValue, selectDdValue] = React.useState(null);
  const [projectName, setProjectName] = React.useState(null);
  
  const form = useForm();
  const navigate = useNavigate();

  const handleSelectedValuesChangeSectionThree = (selectedValues) => {
    setAllSelectedValues(selectedValues);
  };
  const handleSelectedValuesChangeSectionFour = (selectedValues) => {
    setAllSelectedValuesFour(selectedValues);
  };
  const handleSelectedValuesChangeSectionFive = (selectedValues) => {
    setAllSelectedValuesFive(selectedValues);
  };
  const handleSelectedValuesChangeSectionSix = (selectedValues) => {
    setAllSelectedValuesSix(selectedValues);
  };


  const goToPlatformPage = () => {
    navigate("/PlatformProject");
  }
  const { apiUrl } = apiUrlConfig;
  const typeOfDropdown = [
    "account_name",
    "buh_name",
    "dd_name",
  ];

  useEffect(() => {
    const fetchData = async () => {
      await fetchFilterData(apiUrl, typeOfDropdown, setLoader, setAccountName, setDdName, "", setBuhName);
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);

      try {
        const columnData = await fetchColumnData(apiUrl, setTechnologyData, setLoader);

        const settersMap = {
          "domains": setDomain,
          "application_class": setApp,
          "environment": setEnv,
          "cloud_technologies": setCloudTechnologies,
          "data_engineering_etl_mdm_tools": setDataEngineeringEtlMdmTools,
          "mobile_cloud_computing": setMobileCloudComputing,
          "edge_computing": setEdgeComputing,
          "enterprise_platforms": setEnterprisePlatforms,
          "cms_applications": setCmsApplications,
          "relational_databases_sql": setRelationalDatabasesSql,
          "nosql_databases": setNoSqlDatabases,
          "in_memory_databases": setInMemoryDatabases,
          "system_monitoring_performance_tools": setSystemMonitoringPerformanceTools,
          "ides": setIdes,
          "version_control_system_vcs": setVersionControlSystemVcs,
          "frontend_development": setFrontendDevelopment,
          "server_side_backend_frameworks": setServerSideBackendFrameworks,
          "mobile_development": setMobileDevelopment,
          "full_stack_development": setFullStackDevelopment,
          "programming_languages": setProgrammingLanguages,
          "api_development_data_access_technologies": setApiDevelopmentDataAccessTechnologies,
          "application_integration_tools": setApplicationIntegrationTools,
          "analytics_reporting": setAnalyticsReporting,
          "test_coverage": setTestCoverage,
          "productivity_measurement": setProductivityMeasurement,
          "tracing": setTracing,
          "unit_testing_frameworks": setUnitTestingFrameworks,
          "functional_integration_testing": setFunctionalIntegrationTesting,
          "performance_load_testing_tools": setPerformanceLoadTestingTools,
          "manual_testing_management_tools": setManualTestingManagementTools,
          "application_security_testing_tools": setApplicationSecurityTestingTools,
          "devops_infrastructure_as_code_iac": setDevopsInfrastructureAsCodeIac,
          "directory_services_identity_management": setDirectoryServicesIdentityManagement,
          "code_quality_tools": setCodeQualityTools,
          "ipaas_integration_platform_as_a_service": setIpaasIntegrationPlatformAsAService,
          "ai_machine_learning_technologies": setAiMachineLearningTechnologies,
          "user_feedback_analytics_tools": setUserFeedbackAnalyticsTools,
          "low_code_environments": setLowCodeEnvironments,
        };

        const results = await Promise.all(
          technologyData.map(async (data) => {
            const result = await columnValues(apiUrl, data);

            // Check if there's a setter for the current data value
            if (settersMap[data]) {
              settersMap[data](result);
            }

            return result;
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [loader]);

  // Define inputs for various sections
  const buhInput = {
    values: ["Tony", "Ruby", "San", "DC"]
  }
  const accountInput = {
    values: [
      "American Water",
      "Awana",
      "CBC",
      "Cision"
    ]
  }
  const ddInput = {
    values: [
      "AnandShah",
      "Sen",
      "CBC",
      "Cision",
    ]
  };

  // Same input for all props in SectionThree
  // const cloudTechnologies = {
  //   values: [
  //     "AWS",
  //     "Azure",
  //     "GCP",
  //   ]
  // };
  const createNewProject = () => {
    addNewProject(apiUrl, accountValue, projectName, buhValue, ddValue, domainValue, applicationValue, allSelectedValues, allSelectedValuesFour, allSelectedValuesFive, allSelectedValuesSix)
  }
  return (
    <>

      <DialogBox
        size="sm"
        actions={true}
        buttonAlignment="center"
        openDialog={openPlatFormReport}
        closeDialog={() => setPlatFormReport(false)}
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
            onClick={() => setPlatFormReport(false)}

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
        <Typography ml={1} variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          New Project
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginRight: 30 }}>
          <Button
            variant="outlined"
            sx={{
              color: `${grey[600]}`,
              borderColor: `${grey[400]}`,
              fontWeight: "bold",
              textTransform: "none"
            }}
            onClick={() => setPlatFormReport(true)}

          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{ textTransform: "none", backgroundColor: "#0E5FD9" }}
            onClick={createNewProject}
          >
            Submit
          </Button>
        </Stack>
      </Stack>

      <Accordion sx={{
        boxShadow: 'none', // Remove shadow
        '&:before': {
          display: 'none', // Remove divider line between sections
        }
      }}>
        <AccordionDetails>
          <Section buhInput={buhName}
            accountInput={accountName}
            ddInput={ddName}
            selectBuhValue={selectBuhValue} selectAccountValue={selectAccountValue} selectDdValue={selectDdValue} setProjectName={setProjectName}
            buhValue={buhValue} ddValue={ddValue} accountValue={accountValue} projectName={projectName} />
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
          <SectionOne />
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
            domainInput={domain}
            applicationInput={app}
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
            environmentInput={env}
            cloudTechnologies={cloudTechnologies}
            enterprisePlatforms={enterprisePlatforms}
            etlAndMdmTools={dataEngineeringEtlMdmTools}
            devops={devopsInfrastructureAsCodeIac}
            lowCodeEnv={lowCodeEnvironments}
            vcs={versionControlSystemVcs}
            edgeComputing={edgeComputing}
            relationalDb={relationalDatabasesSql}
            nosqlDb={noSqlDatabases}
            inMemoryDbs={inMemoryDatabases}
            mobileCloudComputing={mobileCloudComputing}
            systemMonitoringAndPerformance={systemMonitoringPerformanceTools}
            directoryServices={directoryServicesIdentityManagement}
            ides={ides}
            cmsApp={cmsApplications}
            iPaas={ipaasIntegrationPlatformAsAService}
            frontendDevelopment={frontendDevelopment}
            serverSide={serverSideBackendFrameworks}
            fullStack={fullStackDevelopment}
            mobileDevelopment={mobileDevelopment}
            apiDevelopment={apiDevelopmentDataAccessTechnologies}
            applicationIntegrationTools={applicationIntegrationTools}
            unitTestingFrameworks={unitTestingFrameworks}
            programmingLanguages={programmingLanguages}
            codeQualityTools={codeQualityTools}
            testCoverage={testCoverage}
            productivityMeasurement={productivityMeasurement}
            tracing={tracing}
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

            SelectManualTestingMgmt={manualTestingManagementTools}
            FunctionalandIntegration={functionalIntegrationTesting}
            PerformanceandLoadTest={performanceLoadTestingTools}
            ApplicationSecurityTesting={applicationSecurityTestingTools}
            devopsInfrastructureAsCodeIac={devopsInfrastructureAsCodeIac}
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
            AnalyticsReporting={analyticsReporting}
            SelectUserFeedbackandAnalytics={userFeedbackAnalyticsTools}
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
          <SectionSix aiAndMachineLearningTechnologies={aiMachineLearningTechnologies}
            onSelectedValuesChange={handleSelectedValuesChangeSectionSix}
          />
        </AccordionDetails>
      </Accordion>




    </>
  );
};

export default NewProject;
