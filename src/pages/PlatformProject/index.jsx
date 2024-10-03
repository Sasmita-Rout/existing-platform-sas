import { Box, Typography, Container, IconButton, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Boxes, PrimaryButton, SecondaryBtn } from "../../components/atoms";
import FilterComponent from "../../modules/FilterComponent";
import FilterOptions from "../../modules/FilterOptions";
import { DataGrid } from "../../components/molecules";
import { Add, Edit, PieChart } from "@mui/icons-material";

const PlatformProject = () => {
  const navigate = useNavigate();

  const goToNewProjectPage = () => {
    navigate("/PlatformProject/NewProject");
  }
  const technologies = [
    { title: "Frontend Technology" },
    { title: "Domain" },
    { title: "Cloud Technology" },
    { title: "Data Engineering" },
  ];

  const tabs = [
    {
      label: "Results",
      Component: <div>Hello, I am tab 1</div>,
    },
    {
      label: "Domain & Application Class",
      Component: <div>Hello, I am tab 2</div>,
    },
    {
      label: "Environment, Infrastructure, System Related Info",
      Component: (
        <div>
          <h1>Tab with heading</h1>
          <p>Hello I am a tab with a heading</p>
        </div>
      ),
    },
    {
      label: "Development",
      Component: <div>Hello, I am tab 4</div>,
    },
    {
      label: "QA & DevOps",
      Component: <div>Hello, I am tab 5</div>,
    },
    {
      label: "BI & Marketing",
      Component: <div>Hello, I am tab 6</div>,
    },
  ];

  const boxes = [
    {
      id: 0,
      title: "Total Accounts",
      titleNum: "28",
      percent: "",
      color: "#0FAF62",
    },
    {
      id: 1,
      title: "Total Projects",
      titleNum: "105",
      percent: "",
      color: "#FF9500",
    },
    {
      id: 2,
      title: "Domains",
      titleNum: "23",
      percent: "",
      color: "#01A4C9",
    },
    {
      id: 3,
      title: "Applications Class",
      titleNum: "23",
      percent: "",
      color: "#BA3838",
    },
  ];

  const languages = {
    frontendTechnology: [{ title: "Express" }, { title: "NestJS" }],
    domain: [{ title: "Redux" }, { title: "Next.js" }],
    cloudTechnology: [{ title: "RxJS" }, { title: "NgRx" }],
    dataEngineering: [{ title: "Grid" }, { title: "Utilities" }],
  };

  const rows = [
    {
      id: 1,
      accountName: "American Water",
      programName: "HOS",
      buhName: "Anandh shah",
      ddName: "Raghavendra",
      status: "Inactive",
    },
    {
      id: 2,
      accountName: "CBD",
      programName: "C3",
      buhName: "Shyam",
      ddName: "Nikhil Damwani",
      status: "Active",
    },
    {
      id: 3,
      accountName: "American Water",
      programName: "HOS",
      buhName: "Anandh shah",
      ddName: "Raghavendra",
      status: "Inactive",
    },
    {
      id: 4,
      accountName: "CBD",
      programName: "C3",
      buhName: "Shyam",
      ddName: "Nikhil Damwani",
      status: "Active",
    },
    {
      id: 5,
      accountName: "American Water",
      programName: "HOS",
      buhName: "Anandh shah",
      ddName: "Raghavendra",
      status: "Inactive",
    },
    {
      id: 6,
      accountName: "CBD",
      programName: "C3",
      buhName: "Shyam",
      ddName: "Nikhil Damwani",
      status: "Active",
    },
    {
      id: 7,
      accountName: "American Water",
      programName: "HOS",
      buhName: "Anandh shah",
      ddName: "Raghavendra",
      status: "Inactive",
    },
    {
      id: 8,
      accountName: "CBD",
      programName: "C3",
      buhName: "Shyam",
      ddName: "Nikhil Damwani",
      status: "Active",
    },
    {
      id: 9,
      accountName: "American Water",
      programName: "HOS",
      buhName: "Anandh shah",
      ddName: "Raghavendra",
      status: "Inactive",
    },
    {
      id: 10,
      accountName: "CBD",
      programName: "C3",
      buhName: "Shyam",
      ddName: "Nikhil Damwani",
      status: "Active",
    },
  ];

  const columns = [
    {
      flex: 0.4,
      headerName: "Account Name",
      field: "accountName",
    },
    {
      flex: 0.3,
      headerName: "Program Name",
      field: "programName",
    },
    {
      flex: 0.15,
      headerName: "BUH Name",
      field: "buhName",
    },
    {
      flex: 0.15,
      field: "ddName",
      headerName: "DD Name",
    },
    {
      flex: 0.15,
      field: "status",
      headerName: "Status",
    },
    {
      flex: 0.15,
      field: "action",
      align: "center",
      headerName: "Action",
      headerAlign: "center",
      renderCell: () => {
        return (
          <IconButton
            sx={{ padding: 0 }}
            aria-label="edit"
            onClick={() => console.log("Action")}
          >
            <Edit />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography ml={1} variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Platform Project Data
        </Typography>
        <PrimaryButton label="Add New Project" icon={<Add />} onClick={() => goToNewProjectPage()} />
      </Stack>
      <Box p={2}>
        <FilterOptions
          buhInput={technologies}
          accountInput={technologies}
          projectInput={technologies}
          ddInput={technologies}
        />
        <Stack direction="row" justifyContent="space-between">
          <Boxes boxes={boxes} />
          <Stack width={200}>
            <PrimaryButton
              sx={{ marginBottom: "4px" }}
              icon={<PieChart />}
              label={"Platform Related Data Reports"}
            />
            <PrimaryButton
              label={"Tools and Metrics Data Reports"}
              icon={<PieChart />}
            />
          </Stack>
        </Stack>
        <Box mb={2}>
          <FilterComponent
            technologyInput={technologies}
            languageInput={languages}
          />
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          pagination={false}
          hideFooter={false}
          sx={{ border: "none" }}
        />
      </Box>
    </Box>
  );
};

export default PlatformProject;
