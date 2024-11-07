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
  checkboxSelection = false,
  rowCount= 1,
  paginationModelChange
}) => {
  const [tablePageSize, setPageSize] = useState(pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const [paginationModel, setPaginationModel] = useState({
    page: currentPage,
    pageSize: tablePageSize,
  });

  paginationModelChange(paginationModel);
  return (
    <Box sx={{ height: height, width: "100%" }}>
      <MUIDataGrid
        rows={rows}
        columns={columns}
        page={currentPage}
        paginationMode="server"
        rowCount={rowCount}
        pageSize={tablePageSize}
        pageSizeOptions={pageSizeOptions}
        disableAutosize={disableAutosize}
        pagination={pagination}
        hideFooter={hideFooter}
        onPageSizeChange={(page) => setPageSize(page)}
        onPageChange={(page) => setCurrentPage(page)}
        checkboxSelection={checkboxSelection}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
};

export default DataGrid;
