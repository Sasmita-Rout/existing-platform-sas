import { Box, Typography, Container } from "@mui/material";
import FilterBar from "../../components/organisms/FilterBar";
import ProjectTable from "../../components/organisms/ProjectTable";
import useFetch from "../../hooks/useFetch";
import { GenericTabs } from '../../components/molecules/GenericTabs';
import { Boxes, PrimaryButton, SecondaryBtn } from "../../components/atoms";
import FilterComponent from "../../modules/FilterComponent"
import FilterOptions from "../../modules/FilterOptions";

const PlatformProject = () => {
  useFetch();
  const technologies = [
    { title: 'Frontend Technology' },
    { title: 'Domain' },
    { title: 'Cloud Technology' },
    { title: 'Data Engineering' },
  ];
  const languages = {
    frontendTechnology: [{ title: 'Express' }, { title: 'NestJS' }],
    domain: [{ title: 'Redux' }, { title: 'Next.js' }],
    cloudTechnology: [{ title: 'RxJS' }, { title: 'NgRx' }],
    dataEngineering: [{ title: 'Grid' }, { title: 'Utilities' }],
};

  const tabs = [
    {
      label: "Results",
      Component: <div>Hello, I am tab 1</div>
    },
    {
      label: "Domain & Application Class",
      Component: <div>Hello, I am tab 2</div>
    },
    {
      label: "Environment, Infrastructure, System Related Info",
      Component: (
        <div>
          <h1>Tab with heading</h1>
          <p>Hello I am a tab with a heading</p>
        </div>
      )
    },
    {
      label: "Development",
      Component: <div>Hello, I am tab 4</div>
    },
    {
      label: "QA & DevOps",
      Component: <div>Hello, I am tab 5</div>
    },
    {
      label: "BI & Marketing",
      Component: <div>Hello, I am tab 6</div>
    },

  ];

  const boxes = [{
    id: 0,
    title: 'Total Accounts',
    titleNum: '28',
    percent: '',
    color: '#0FAF62'
  },
  {
    id: 1,
    title: 'Total Projects',
    titleNum: '105',
    percent: '',
    color: '#FF9500'
  },
  {
    id: 2,
    title: 'Domains',
    titleNum: '23',
    percent: '',
    color: '#01A4C9'
  },
  {
    id: 3,
    title: 'Applications Class',
    titleNum: '23',
    percent: '',
    color: '#BA3838'
  },
  ]

  return (
    <>
      <Box>
        <Boxes boxes={boxes} />
        <GenericTabs tabs={tabs} />
        <PrimaryButton label={'23r32552352'} />
        <SecondaryBtn label={'345453'} />
      </Box>
      <Container maxWidth="lg">
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="h6"
          component="h1"
          gutterBottom
        >
          Platform Project Data
        </Typography>

        <Box mb={2}>
          <FilterBar />
        </Box>

        <ProjectTable />
      </Container>
      <Box>
      <Typography>Platform project data</Typography>
      <FilterOptions
        buhInput={technologies} accountInput={technologies} projectInput={technologies}
        ddInput={technologies} />
      <FilterComponent technologyInput ={technologies} languageInput={languages} />
    </Box>
    </>
    )

};

export default PlatformProject;
