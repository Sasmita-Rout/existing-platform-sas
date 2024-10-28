import { Box, Typography, Container, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Boxes, PrimaryButton } from "../../components/atoms";
import FilterComponent from "../../modules/FilterComponent";
import FilterOptions from "../../modules/FilterOptions";
import { DataGrid, DialogBox } from "../../components/molecules";
import { Add, Edit, PieChart } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  createUpdateRecord,
  fetchRecords,
} from "../../components/apiServices/index";
import apiUrlConfig from "../../config/apiUrlConfig";
import useTableHook from "./useTableHook";
import { RequestErrorLoader } from "../../components/organism";

const PlatformProject = () => {
  const navigate = useNavigate();

  const goToNewProjectPage = () => {
    navigate("/PlatformProject/NewProject");
  };
  const { apiUrl } = apiUrlConfig;

  const [openPlatFormReport, setPlatFormReport] = useState(false);
  const [accountName, setAccountName] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [buhName, setBuhName] = useState([]);
  const [ddName, setDdName] = useState([]);
  const [technologyData, setTechnologyData] = useState([]);

  const [buhSelected, setBuhSelected] = useState(null);
  const [accountSelected, setAccountSelected] = useState(null);
  const [ddSelected, setDdSelected] = useState(null);
  const [projectSelected, setProjectSelected] = useState(null);
  const [state, setState] = useState({
    searchText: "",
    filters: {
      buhName: "",
      ddNmae: "",
      projectName: "",
      accountName: "",
    },
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setState({
      filters: {
        buhName: buhSelected,
        ddNmae: ddSelected,
        projectName: projectSelected,
        accountName: accountSelected,
      },
    });
  }, [accountSelected, projectSelected, ddSelected, buhSelected]);

  const typeOfDropdown = [
    "account_name",
    "project_name",
    "buh_name",
    "dd_name",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);

      try {
        const promises = typeOfDropdown.map(async (filterName) => {
          const url = `${apiUrl}/platform_data/dropdown?dropdown_type=${filterName}`;

          const response = await fetchRecords(url, false, false, false);

          return { filterName, response: response !== null ? response : ""};
        });

        const results = await Promise.all(promises);

        // Process each result and set the corresponding state
        results.forEach(({ filterName, response }) => {

          if (filterName === "account_name") {
            setAccountName(response.values);
          } else if (filterName === "project_name") {
            setProjectName(response.values);
          } else if (filterName === "buh_name") {
            setBuhName(response.values);
          } else if (filterName === "dd_name") {
            setDdName(response.values);
          }
        });

        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    };
    setLoader(true);
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAdvanceFilterTechnologies = async () => {
      try {
        const techUrl = `${apiUrl}/platform_data/columns`;
        const result = await fetchRecords(techUrl, false, false, false);
        const technologyData = result !== null && result["columns"] ?
          setTechnologyData(result["columns"])
          : ""
        setLoader(false);
        return technologyData;
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    };
    setLoader(true);
    fetchAdvanceFilterTechnologies();
  }, []);

  const columns = [
    {
      flex: 0.4,
      headerName: "Account Name",
      field: "account_name",
    },
    {
      flex: 0.3,
      headerName: "Program Name",
      field: "project_name",
    },
    {
      flex: 0.15,
      headerName: "BUH Name",
      field: "buh_name",
    },
    {
      flex: 0.15,
      field: "dd_name",
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
          // onClick={() => console.log("Action")}
          >
            <Edit />
          </IconButton>
        );
      },
    },
  ];

  const [tableData, setTableData] = useState({});
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    async function fetchTableData() {
      try {
        const response = await createUpdateRecord(
          null,
          "platform_data/summary?page=1&page_size=10",
          null,
          "GET"
        );
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function getData() {
      const tableData1 = await fetchTableData();
      if (tableData1 && typeof tableData1 === "object") {
        setTableData(tableData1); // Set the fetched data to state
      }
    }

    getData();
  }, []);

  // // Log tableData after it has been updated
  // useEffect(() => {
  //   const mainFilterTable = useTableHook({...state, tableData});
  //   if ((tableData && Array.isArray(tableData.data)) || (mainFilterTable && Array.isArray(mainFilterTable)) ) {
  //     let finalData = mainFilterTable || tableData.data
  //     let filteredTable = finalData.map((item, index) => ({
  //       id: index + 1,
  //       ...item
  //     }));
  //     setTableRows(filteredTable);
  //   } else {
  //     console.error('tableData or tableData.data is undefined or not an array');
  //   }

  // }, [tableData, state]);

  useEffect(() => {
    const { data: tableArray = [] } = tableData || {};
    const mainFilterTable = useTableHook({ ...state, tableData });

    const finalData =
      Array.isArray(mainFilterTable) && mainFilterTable.length >= 0
        ? mainFilterTable
        : tableArray;

    if (Array.isArray(finalData)) {
      const filteredTable = finalData.map((item, index) => ({
        id: index + 1,
        ...item,
      }));
      setTableRows(filteredTable);
    } else {
      console.error("tableData or tableData.data is undefined or not an array");
    }
  }, [tableData, state]);

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
    // <RequestErrorLoader
    //   hideBackground
    //   body={{
    //     data: true,
    //     request: loader,
    //   }}
    // >
    <Box p={2}>
      <Box p={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            ml={1}
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Platform Project Data
          </Typography>
          <PrimaryButton
            startIcon={<Add />}
            onClick={() => goToNewProjectPage()}
          >
            Add New Project
          </PrimaryButton>
        </Stack>
        <Box p={2}>
          <FilterOptions
            buhInput={buhName}
            accountInput={accountName}
            projectInput={projectName}
            ddInput={ddName}
            onBuhChange={setBuhSelected} // callback for BUH change
            onAccountChange={setAccountSelected} // callback for Account change
            onDdChange={setDdSelected} // callback for DD change
            onProjectChange={setProjectSelected} // callback for Project change
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
            <FilterComponent technologyInput={technologyData} />
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
    // </RequestErrorLoader>
  );
};

export default PlatformProject;
