import { Box, Typography, Container, IconButton, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Boxes, PrimaryButton } from "../../components/atoms";
import FilterComponent from "../../modules/FilterComponent";
import FilterOptions from "../../modules/FilterOptions";
import { DataGrid, DialogBox } from "../../components/molecules";
import { Add, Edit, PieChart } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { createUpdateRecord, fetchRecords } from "../../components/apiServices/index";
import apiUrlConfig from "../../config/apiUrlConfig";


const PlatformProject = () => {
  const navigate = useNavigate();

  const goToNewProjectPage = () => {
    navigate("/PlatformProject/NewProject");
  }
  const { apiUrl } = apiUrlConfig;

  const [openPlatFormReport, setPlatFormReport] = useState(false);
  const [accountName, setAccountName] = useState([])
  const [projectName, setProjectName] = useState([])
  const [buhName, setBuhName] = useState([])
  const [ddName, setDdName] = useState([])

  const typeOfDropdown = ["account_name", "project_name", "buh_name", "dd_name"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = typeOfDropdown.map(async (filterName) => {
          const url = `${apiUrl}/platform_data/dropdown?dropdown_type=${filterName}`

          const response = await fetchRecords(url, false, false, false);
          return { filterName, response };
        });
        const results = await Promise.all(promises);

        results.forEach(({ filterName, response }) => {
          if (filterName === "account_name") {
            setAccountName(response);
          } else if (filterName === "project_name") {
            setProjectName(response);
          } else if (filterName === "buh_name") {
            setBuhName(response);
          } else if (filterName === "dd_name") {
            setDdName(response);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);


  const technologies = {
    values: [
      "Frontend Technology",
      "Domain",
      "Cloud Technology",
      "Data Engineering",
    ]
  };

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



  const languages = {
    frontendTechnology: ["Express", "NestJS"],
    domain: ["Redux", "Next.js"],
    cloudTechnology: ["RxJS", "NgRx"],
    dataEngineering: ["Grid", "Utilities"]
  };

  // let rows = [
  //   {
  //     id: 1,
  //     accountName: "American Water",
  //     programName: "HOS",
  //     buhName: "Anandh shah",
  //     ddName: "Raghavendra",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 2,
  //     accountName: "CBD",
  //     programName: "C3",
  //     buhName: "Shyam",
  //     ddName: "Nikhil Damwani",
  //     status: "Active",
  //   },
  //   {
  //     id: 3,
  //     accountName: "American Water",
  //     programName: "HOS",
  //     buhName: "Anandh shah",
  //     ddName: "Raghavendra",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 4,
  //     accountName: "CBD",
  //     programName: "C3",
  //     buhName: "Shyam",
  //     ddName: "Nikhil Damwani",
  //     status: "Active",
  //   },
  //   {
  //     id: 5,
  //     accountName: "American Water",
  //     programName: "HOS",
  //     buhName: "Anandh shah",
  //     ddName: "Raghavendra",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 6,
  //     accountName: "CBD",
  //     programName: "C3",
  //     buhName: "Shyam",
  //     ddName: "Nikhil Damwani",
  //     status: "Active",
  //   },
  //   {
  //     id: 7,
  //     accountName: "American Water",
  //     programName: "HOS",
  //     buhName: "Anandh shah",
  //     ddName: "Raghavendra",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 8,
  //     accountName: "CBD",
  //     programName: "C3",
  //     buhName: "Shyam",
  //     ddName: "Nikhil Damwani",
  //     status: "Active",
  //   },
  //   {
  //     id: 9,
  //     accountName: "American Water",
  //     programName: "HOS",
  //     buhName: "Anandh shah",
  //     ddName: "Raghavendra",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 10,
  //     accountName: "CBD",
  //     programName: "C3",
  //     buhName: "Shyam",
  //     ddName: "Nikhil Damwani",
  //     status: "Active",
  //   },
  // ];

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

  const [tableData, setTableData] = useState({});
  const [tableRows, setTableRows] = useState([])

  useEffect(() => {
    async function fetchTableData() {
      try {
        const response = await createUpdateRecord(null, "platform_data/summary?page=1&page_size=10", null, "GET");
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function getData() {
      const tableData1 = await fetchTableData();
      if (tableData1 && typeof tableData1 === 'object') {
        setTableData(tableData1); // Set the fetched data to state
      }
    }

    getData();
  }, []);

  // Log tableData after it has been updated
  useEffect(() => {
    console.log(tableData, 'tableData after setTableData');
    setTableRows()


  }, [tableData]);

  const boxes = [
    {
      id: 0,
      title: "Total Accounts",
      titleNum: tableData.account_name_count,
      percent: "",
      color: "#0FAF62",
    },
    {
      id: 1,
      title: "Total Projects",
      titleNum: tableData.project_name_count,
      percent: "",
      color: "#FF9500",
    },
    {
      id: 2,
      title: "Domains",
      titleNum: tableData.domains_count,
      percent: "",
      color: "#01A4C9",
    },
    {
      id: 3,
      title: "Applications Class",
      titleNum: tableData.application_class_count,
      percent: "",
      color: "#BA3838",
    },
  ];

  return (
    <Box p={2}>
      <Box p={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography ml={1} variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Platform Project Data
          </Typography>
          <PrimaryButton startIcon={<Add />} onClick={() => goToNewProjectPage()} >Add New Project</PrimaryButton>
        </Stack>
        <Box p={2}>
          <FilterOptions
            buhInput={buhName.values}
            accountInput={accountName.values}
            projectInput={projectName.values}
            ddInput={ddName.values}
          />
          <Stack mt={2} direction="row" justifyContent="space-between">
            <Boxes boxes={boxes} />
            <Stack width={200}>
              <PrimaryButton
                startIcon={<PieChart />}
                sx={{ marginBottom: "4px" }}
                onClick={() => setPlatFormReport(true)}
              >
                Platform Related Data Reports
              </PrimaryButton>
              <PrimaryButton
                startIcon={<PieChart />}
                onClick={() => setPlatFormReport(true)}
              >
                Tools and Metrics Data Reports
              </PrimaryButton>
            </Stack>
          </Stack>
          <Box mb={2}>
            <FilterComponent
              technologyInput={technologies.values}
              languageInput={languages}
            />
          </Box>

          <DataGrid
            rows={tableRows}
            columns={columns}
            pagination={false}
            hideFooter={false}
            sx={{ border: "none" }}
            pageSizeOptions={[5, 10, 15, 20]}
          />
        </Box>
      </Box>
      <DialogBox
        size="xl"
        openDialog={openPlatFormReport}
        closeDialog={() => setPlatFormReport(false)}
      >
        <Box height={"60vh"}>
          <iframe
            width="100%"
            height="100%"
            src="https://lookerstudio.google.com/embed/reporting/abd6444f-b303-4398-a204-fcaa62d393f1/page/p_3bucp9nmjd?embedded=true"
            frameborder="0"
            style={{ border: "0" }}
            allowfullscreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
        </Box>
      </DialogBox>
    </Box>
  );
};

export default PlatformProject;
