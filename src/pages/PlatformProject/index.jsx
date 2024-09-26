import { Box, Typography } from "@mui/material";
import FilterComponent from "../../modules/FilterComponent"
import FilterOptions from "../../modules/FilterOptions";

const PlatformProject = () => {
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
  return (
    <Box>
      <Typography>Platform project data</Typography>
      <FilterOptions
        buhInput={technologies} accountInput={technologies} projectInput={technologies}
        ddInput={technologies} />
      <FilterComponent technologyInput ={technologies} languageInput={languages} />
    </Box>
  );
};

export default PlatformProject;
