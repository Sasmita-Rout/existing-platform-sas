import React from 'react';
import { Box, IconButton } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import ShareIcon from '@mui/icons-material/Share';

const TableActions = () => {
  return (
    <Box  ml={2}>
      <IconButton>
        <GetAppIcon />
      </IconButton>
      <IconButton>
        <ShareIcon />
      </IconButton>
    </Box>
  );
};

export default TableActions;
