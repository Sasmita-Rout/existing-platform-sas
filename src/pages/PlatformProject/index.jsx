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
import { fetchFilterData, fetchColumnData } from "../../modules/FilterApiCall"
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
      buh_name: "",
      dd_name: "",
      project_name: "",
      account_name: "",
    },
    keywords: "",
  });
  const [tableData, setTableData] = useState({
    records: null,
    total_pages: null,
    total_records: null,
    current_page: null,
    page_size: 10
  });
  const [boxData, setBoxData] = useState({});
  const [handleOptions, setHandleOptions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageChangeValues, setPageChangeValues] = useState({ page: 1, pageSize: null })

  useEffect(() => {
    setState({
      filters: {
        buh_name: buhSelected,
        dd_name: ddSelected,
        project_name: projectSelected,
        account_name: accountSelected,
      },
      keywords: handleOptions,
    });
  }, [
    accountSelected,
    projectSelected,
    ddSelected,
    buhSelected,
    handleOptions,
  ]);

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

          return { filterName, response: response !== null ? response : "" };
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
    fetchFilterData(apiUrl, typeOfDropdown, setLoader, setAccountName, setDdName, setProjectName, setBuhName);
  }, []);

  useEffect(() => {
    const fetchAdvanceFilterTechnologies = async () => {
      try {
        const techUrl = `${apiUrl}/platform_data/columns`;
        const result = await fetchRecords(techUrl, false, false, false);
        const technologyData =
          result !== null && result["columns"]
            ? setTechnologyData(result["columns"])
            : "";
        setLoader(false);
        return technologyData;
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    };
    setLoader(true);
    fetchColumnData(apiUrl, setTechnologyData, setLoader);
  }, []);

  const columns = [
    {
      flex: 0.4,
      headerName: "Account Name",
      field: "account_name",
    },
    {
      flex: 0.3,
      headerName: "Project Name",
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

  useEffect(() => {
    async function fetchTableData() {
      try {
        const boxSection = await createUpdateRecord(
          null,
          "platform_data/summary?page=1&page_size=10",
          null,
          "GET"
        );
        setBoxData(boxSection);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTableData();
  }, []);

  // Function to add values to the existing array
  const handleSelectedValues = async (values) => {
    if (values === null) {
      setHandleOptions([]);
      const response = await createUpdateRecord(null, `platform_data/search_advanced?keywords=n&page=1&page_size=10`, null, "GET");
      const updatedData = response.records.map((item, index) => ({
        ...item,
        id: index,
      }));
      setTableData({
        records: updatedData,
        total_pages: response.total_pages,
        total_records: response.total_records,
        current_page: response.current_page,
        page_size: 10
      })
    } else setHandleOptions(() => values);
  };

  useEffect(() => {
    async function fetchUpdateTable() {
      try {
        if (
          state.keywords.length > 0 ||
          Object.values(state.filters).some(Boolean)
        ) {
          const filterValues = [...(state.keywords || [])];
          const keywords = encodeURIComponent(filterValues);
          const queryParams = new URLSearchParams({
            ...(state.filters.account_name && {
              account_name: state.filters.account_name,
            }),
            ...(state.filters.project_name && {
              project_name: state.filters.project_name,
            }),
            ...(state.filters.buh_name && { buh_name: state.filters.buh_name }),
            ...(state.filters.dd_name && { dd_name: state.filters.dd_name }),
            ...(keywords && { keywords }),
            page: pageChangeValues.page > 0 ? pageChangeValues.page : 1,
            page_size: !!pageChangeValues.pageSize ? pageChangeValues.pageSize : 10,
          });
          const response = await createUpdateRecord(
            null,
            `platform_data/search_advanced?${queryParams.toString()}`,
            null,
            "GET"
          );
          if(response.records !== 0) {
            const updatedData = response.records.map((item, index) => ({
              ...item,
              id: index,
            }));
  
            setTableData({
              records: updatedData,
              total_pages: response.total_pages,
              total_records: response.total_records,
              current_page: response.current_page,
              page_size: 10
            })
          } else {
            setTableData({
              records: updatedData,
              total_pages: response.total_pages,
              total_records: response.total_records,
              current_page: response.current_page,
              page_size: 10
            })
          }    
        } else {
          const pages = pageChangeValues.page > 0 ? pageChangeValues.page : 1;
          const page_size = !!pageChangeValues.pageSize ? pageChangeValues.pageSize : 10;
          const response = await createUpdateRecord(null, `platform_data/search_advanced?keywords=n&page=${pages}&page_size=${page_size}`, null, "GET");
          const updatedData = response.records.map((item, index) => ({
            ...item,
            id: index,
          }));

          setTableData({
            records: updatedData,
            total_pages: response.total_pages,
            total_records: response.total_records,
            current_page: response.current_page,
            page_size: 10
          })
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUpdateTable();
  }, [state, pageChangeValues]);


  const onPageChange = async (values) => {
    setPageChangeValues((prev) => {
      if (prev.page !== values.page || prev.pageSize !== values.pageSize) {
        return { page: values.page, pageSize: values.pageSize };
      }
      return prev;
    });
  };

  const boxes = [
    {
      id: 0,
      title: "Total Accounts",
      titleNum: boxData?.account_name_count || 0,
      percent: "",
      color: "#0FAF62",
    },
    {
      id: 1,
      title: "Total Projects",
      titleNum: boxData?.project_name_count || 0,
      percent: "",
      color: "#FF9500",
    },
    {
      id: 2,
      title: "Domains",
      titleNum: boxData?.domains_count || 0,
      percent: "",
      color: "#01A4C9",
    },
    {
      id: 3,
      title: "Applications Class",
      titleNum: boxData?.application_class_count || 0,
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
              <FilterComponent
                technologyInput={technologyData}
                onValuesChange={handleSelectedValues}
              />
            </Box>

            {/* 
            rowsPerPageOptions={[5, 10, 20]}
            totalRowCount={data?.length || 0}
            getRowId={params => params.opp_application_uuid} */}

            <DataGrid
              pageSize={10}
              height="526px"
              rows={tableData.records}
              count={tableData.total_records}
              rowCount={tableData.total_records}
              columns={columns}
              pagination={true}
              autoPageSize
              paginationModelChange={onPageChange}
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
          <Typography ml={1} variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Platform Project Data
          </Typography>
          <PrimaryButton
            startIcon={<Add />}
            onClick={() => goToNewProjectPage()}
          >
            Add New Project
          </PrimaryButton>
        </DialogBox>
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
