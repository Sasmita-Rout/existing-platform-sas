import { Box } from "@mui/material";
import { DataGrid as MUIDataGrid } from "@mui/x-data-grid";

const DataGrid = ({
  height,
  rows = [],
  hideFooter,
  columns = [],
  pageSize = 10,
  disableAutosize,
  pagination = true,
  checkboxSelection = false,
}) => {
  return (
    <Box sx={{ height: height, width: "100%" }}>
      <MUIDataGrid
        rows={rows}
        columns={columns}
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
