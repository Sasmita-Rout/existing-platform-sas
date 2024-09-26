import { Box, Typography, Container } from "@mui/material";
import FilterBar from "../../components/organisms/FilterBar";
import ProjectTable from "../../components/organisms/ProjectTable";
import useFetch from "../../hooks/useFetch";

const PlatformProject = () => {
  useFetch();
  return (
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
  );
};

export default PlatformProject;
