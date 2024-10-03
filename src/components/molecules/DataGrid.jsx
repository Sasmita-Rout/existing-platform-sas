import { Box } from "@mui/material";
import { DataGrid as MUIDataGrid } from "@mui/x-data-grid";

const DataGrid = ({
  rows = [],
  hideFooter,
  columns = [],
  pageSize = 10,
  disableAutosize,
  height = "auto",
  pagination = true,
  pageSizeOptions,
  checkboxSelection = false,
}) => {
  return (
    <Box sx={{ height: height, width: "100%" }}>
      <MUIDataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
        disableAutosize={disableAutosize}
        pagination={pagination}
        hideFooter={hideFooter}
        checkboxSelection={checkboxSelection}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize,
            },
          },
        }}
      />
    </Box>
  );
};

export default DataGrid;
