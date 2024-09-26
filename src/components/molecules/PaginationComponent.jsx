import React from 'react';
import { Pagination, Box, Typography, FormControl, Select, MenuItem } from '@mui/material';

const PaginationComponent = ({ page, rowCount, rowsPerPage, handleChangePage, handleRowsPerPageChange }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
      <Box display="flex" alignItems="center">
        <Typography>{rowCount} records found</Typography>
      </Box>

      <Box display="flex" alignItems="center">
        <Typography mr={1}>Show</Typography>
        <FormControl size="small" variant="outlined">
          <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <Typography ml={1}>records per page</Typography>
      </Box>

      <Pagination
        count={Math.ceil(rowCount / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default PaginationComponent;
