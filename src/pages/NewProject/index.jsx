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
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const NewProject = () => {
  const newProjectForm = useForm();
  const form = useForm();
  const register = form;
  const navigate = useNavigate();

  const goToPlatformPage = () => {
    navigate("/PlatformProject");
  }

  // Define inputs for various sections
  const buhInput = [
    { title: "Tony" },
    { title: "Ruby" },
    { title: "San" },
    { title: "DC" },
  ];
  const accountInput = [
    { title: "American Water" },
    { title: "Awana" },
    { title: "CBC" },
    { title: "Cision" },
  ];
  const ddInput = [
    { title: "AnandShah" },
    { title: "Sen" },
    { title: "CBC" },
    { title: "Cision" },
  ];

  // Same input for all props in SectionThree
  const cloudTechnologies = [
    { title: "AWS" },
    { title: "Azure" },
    { title: "GCP" },
  ];

  return (
    <>
      <div>
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
              onClick={() => goToPlatformPage()}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>

        <AccordionDetails>
          <Section buhInput={buhInput}
            accountInput={accountInput}
            ddInput={ddInput} />
        </AccordionDetails>
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
          />
        </AccordionDetails>
        {/* <Accordion defaultExpanded> */}
        {/* Section Two */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {/* <Typography>Expanded by default</Typography> */}
          <Box sx={{ display: 'flex', borderRadius: '5px', border: `1px solid ${grey[400]}`, padding: '10px', gap: 1, width: "100%", backgroundColor: `${grey[200]}` }}>
            <Avatar sx={{ bgcolor: 'grey', width: 30, height: 30 }}>
              <Typography variant="body" color="white">2</Typography>
            </Avatar>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: `${grey[600]}` }}>
              {/* <EmergencyIcon style={{ fontSize: "small", color: "red" }} /> */}
              Domains and Application Class
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SectionTwo
            domainInput={buhInput}
            applicationInput={accountInput}
          />
        </AccordionDetails>
        {/* </Accordion> */}
        {/* <Accordion defaultExpanded> */}
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
            environmentInput={cloudTechnologies}
            cloudTechnologies={cloudTechnologies}
            enterprisePlatforms={cloudTechnologies}
            etlAndMdmTools={cloudTechnologies}
            devops={cloudTechnologies}
            lowCodeEnv={cloudTechnologies}
            vcs={cloudTechnologies}
            edgeComputing={cloudTechnologies}
            relationalDb={cloudTechnologies}
            nosqlDb={cloudTechnologies}
            inMemoryDbs={cloudTechnologies}
            mobileCloudComputing={cloudTechnologies}
            systemMonitoringAndPerformance={cloudTechnologies}
            directoryServices={cloudTechnologies}
            ides={cloudTechnologies}
            cmsApp={cloudTechnologies}
            iPaas={cloudTechnologies}
            frontendDevelopment={cloudTechnologies}
            serverSide={cloudTechnologies}
            fullStack={cloudTechnologies}
            mobileDevelopment={cloudTechnologies}
            apiDevelopment={cloudTechnologies}
            applicationIntegrationTools={cloudTechnologies}
            unitTestingFrameworks={cloudTechnologies}
            programmingLanguages={cloudTechnologies}
            codeQualityTools={cloudTechnologies}
            testCoverage={cloudTechnologies}
            productivityMeasurement={cloudTechnologies}
            tracing={cloudTechnologies}
          />
        </AccordionDetails>
        {/* </Accordion> */}
        {/* <Accordion defaultExpanded> */}
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
          <SectionFour />
        </AccordionDetails>
        {/* </Accordion> */}
        {/* Section Five */}
        {/* <Accordion defaultExpanded> */}
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
          <SectionFive />
        </AccordionDetails>
        {/* </Accordion> */}
        {/* Section Six */}
        {/* <Accordion defaultExpanded> */}
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
          <SectionSix inMemoryDbs={cloudTechnologies} />
        </AccordionDetails>
        {/* </Accordion> */}
      </div>



    </>
  );
};

export default NewProject;
