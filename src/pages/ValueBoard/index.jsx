import { Box, Typography } from "@mui/material";
import { GenericTabs } from "../../components/molecules/index";

const ValueBoard = () => {

  const tabs = [ 
    {
      index: 0,
      label: "Project",
      Component: 1
    },
    {
      index: 1,
      label: "People",
      Component: "2"
    },
    {
      index: 2,
      label: "Process",
      Component: "e"
    },
    {
      index: 3,
      label: "Product",
      Component: "4"
    },
    {
      index: 4,
      label: "Platform",
      Component: "4"
    },
    {
      index: 5,
      label: "VB Review Comments",
      Component: "1"
    }
  ]
  return (
    <Box sx={{ width: "100%" }}>
      <GenericTabs tabs={tabs} />
      </Box>
  );
};

export default ValueBoard;
