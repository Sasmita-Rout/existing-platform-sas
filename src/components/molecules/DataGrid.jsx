import { Box } from "@mui/material";
import { DataGrid as MUIDataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const DataGrid = ({
  rows = [],
  hideFooter,
  columns = [],
  pageSize = 10,
  disableAutosize,
  height = "auto",
  pagination = true,
  pageSizeOptions,
  paginationMode = "client",
  checkboxSelection = false,
}) => {
  const [tablePageSize, setPageSize] = useState(pageSize);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Box sx={{ height: height, width: "100%" }}>
      <MUIDataGrid
        rows={rows}
        columns={columns}
        page={currentPage}
        pageSize={tablePageSize}
        pageSizeOptions={pageSizeOptions}
        disableAutosize={disableAutosize}
        pagination={pagination}
        hideFooter={hideFooter}
        onPageSizeChange={(page) => setPageSize(page)}
        onPageChange={(page) => setCurrentPage(page)}
        paginationMode={paginationMode}
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
